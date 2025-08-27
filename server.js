// server.js
import dotenv from 'dotenv'
dotenv.config() // muat .env paling awal

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import sequelize from './config/database.js'   // satu sumber kebenaran untuk Sequelize
import routes from './routes/index.js'         // gabungan semua route (publik + admin)

const app = express()

// ====== ENV & PATH ======
const PORT = process.env.PORT || 3700
const NODE_ENV = process.env.NODE_ENV || 'development'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ====== STATIC UPLOADS ======
// Pastikan folder uploads ada & dapat diakses publik di /uploads/*
const uploadDir = path.join(__dirname, 'uploads')
fs.mkdirSync(uploadDir, { recursive: true })
app.use('/uploads', express.static(uploadDir))

// ====== DB INIT ======
;(async () => {
  try {
    await sequelize.authenticate()
    console.log('🗄️  Database connected')
    await sequelize.sync({ alter: true })
    console.log('📦 Models synchronized')
  } catch (err) {
    console.error('❌ Database init failed:', err)
    // Kalau mau fail-fast: uncomment
    // process.exit(1)
  }
})()

// ====== MIDDLEWARE ======
app.use(helmet({
  crossOriginResourcePolicy: false, // biar gambar/static bisa di-embed
}))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

if (NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// CORS allowlist (dev + prod via .env FRONTEND_ORIGIN)
const allowlist = [
  'http://localhost:5173',          // Vite dev
  process.env.FRONTEND_ORIGIN || '',// contoh: https://dinsos.example.go.id
].filter(Boolean)

app.use(cors({
  origin(origin, cb) {
    // izinkan non-browser (Postman/SSR) & origin yang terdaftar
    if (!origin || allowlist.includes(origin)) return cb(null, true)
    return cb(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

// ====== HEALTHCHECK ======
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: NODE_ENV, time: new Date().toISOString() })
})

// ====== API ROUTES (prefix /api) ======
app.use('/api', routes)
// contoh routes/index.js:
//   import { Router } from 'express'
//   import pengaduan from './pengaduan.js'
//   const r = Router()
//   r.use('/pengaduan', pengaduan)
//   export default r

// ====== 404 KHUSUS /api ======
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ====== ERROR HANDLER GLOBAL ======
app.use((err, _req, res, _next) => {
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS blocked' })
  }
  console.error('💥 Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// ====== START ======
app.listen(PORT, () => {
  console.log(`✅ API ready at http://localhost:${PORT} (${NODE_ENV})`)
})

// ====== GRACEFUL SHUTDOWN (opsional) ======
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...')
  sequelize.close().finally(() => process.exit(0))
})

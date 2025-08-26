// server.js
import dotenv from 'dotenv'
dotenv.config() // load .env seawal mungkin

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import sequelize from './config/database.js'     // << gunakan SATU sumber sequelize
import routes from './routes/index.js'           // << index.js berisi penggabung semua route (pengaduan, berita, dll)

// ====== INIT ======
const app = express()
const PORT = process.env.PORT || 3700
const NODE_ENV = process.env.NODE_ENV || 'development'

// ====== DB SYNC ======
try {
  await sequelize.authenticate()
  console.log('🗄️  Database connected')
  await sequelize.sync({ alter: true })
  console.log('📦 Models synchronized')
} catch (err) {
  console.error('❌ Database init failed:', err)
  // kalau mau fail fast:
  // process.exit(1)
}

// ====== MIDDLEWARE ======
app.use(helmet({
  crossOriginResourcePolicy: false, // biar image/static bisa di-embed kalau perlu
}))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

if (NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// CORS allowlist (dev + prod dari .env)
const allowlist = [
  'http://localhost:5173',            // Vite dev
  process.env.FRONTEND_ORIGIN || '',  // contoh: https://dinsos.example.go.id
].filter(Boolean)

app.use(cors({
  origin(origin, cb) {
    // allow Non-browser (Postman/SSR) dan origin yang ada di allowlist
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
// contoh di routes/index.js:
//   import { Router } from 'express'
//   import pengaduan from './pengaduan.js'
//   const r = Router()
//   r.use('/pengaduan', pengaduan)
//   export default r

// ====== 404 (khusus /api) ======
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ====== ERROR HANDLER GLOBAL ======
app.use((err, _req, res, _next) => {
  // Error CORS dari middleware di atas
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS blocked' })
  }
  console.error('💥 Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

// ====== START ======
app.listen(PORT, () => {
  console.log(`✅ API ready at http://localhost:${PORT}  (${NODE_ENV})`)
})

// ====== GRACEFUL SHUTDOWN (opsional tapi bagus) ======
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...')
  sequelize.close().finally(() => process.exit(0))
})

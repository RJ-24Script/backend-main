// server.js
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import routes from './routes/index.js'

import sequelize from './db.config.js'
import Pengaduan from './models/Pengaduan.js'

// Sync DB
sequelize.sync({ alter: true }).then(() => {
  console.log('📦 Database sinkron dengan model')
}).catch(err => {
  console.error('Gagal sync database:', err)
})

dotenv.config()
const app = express()

// ===== MIDDLEWARE =====
app.use(express.json())
app.use(morgan('dev'))

// CORS: izinkan frontend dev & prod
const allowlist = [
  'http://localhost:5173',          // Vite dev
  process.env.FRONTEND_ORIGIN       // isi di .env saat production
].filter(Boolean)

app.use(cors({
  origin(origin, cb) {
    if (!origin || allowlist.includes(origin)) return cb(null, true)
    return cb(new Error('Not allowed by CORS'))
  }
}))

// ===== HEALTHCHECK =====
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

// ===== API ROUTES =====
app.use('/api', routes)

// ===== 404 handler =====
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ===== ERROR handler =====
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

const PORT = process.env.PORT || 3700
app.listen(PORT, () => {
  console.log(`✅ API jalan di http://localhost:${PORT}`)
})

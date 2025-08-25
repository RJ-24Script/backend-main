// routes/berita.js
import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()

function readBerita() {
  try {
    const p = path.join(__dirname, '..', 'data', 'berita.json')
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf-8'))
    }
  } catch (e) {
    console.error('Gagal baca berita.json:', e.message)
  }
  return [
    { id: 1, title: 'Berita pertama', date: '2025-08-25', summary: 'Contoh ringkasan.' },
    { id: 2, title: 'Berita kedua', date: '2025-08-24', summary: 'Contoh ringkasan 2.' }
  ]
}

router.get('/', (req, res) => {
  res.json(readBerita())
})

export default router

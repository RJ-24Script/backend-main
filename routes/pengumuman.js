// ESM
import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = Router()

function readPengumuman() {
  try {
    const p = path.join(__dirname, '..', 'data', 'pengumuman.json')
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf-8'))
  } catch (e) { console.error('Gagal baca pengumuman.json:', e.message) }
  return [] // fallback kosong
}

router.get('/', (_req, res) => {
  res.json(readPengumuman())
})

export default router

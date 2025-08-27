import { Router } from 'express'
import adminAuth from '../middleware/adminAuth.js'
import Berita from '../models/Berita.js'
import multer from 'multer'
import path from 'path'

const r = Router()
r.use(adminAuth)

// === setup multer ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext)
  }
})
const upload = multer({ storage })

// Upload endpoint khusus gambar
r.post('/berita/upload', upload.single('file'), (req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`
  res.json({ url: fileUrl })
})

// CRUD berita
r.get('/berita', async (_req, res) => {
  const list = await Berita.findAll({ order: [['createdAt','DESC']] })
  res.json(list)
})

r.post('/berita', async (req, res) => {
  const { judul, isi, penulis, thumbnail, isPublished = true } = req.body
  const item = await Berita.create({ judul, isi, penulis, thumbnail, isPublished })
  res.json(item)
})

r.put('/berita/:id', async (req, res) => {
  const it = await Berita.findByPk(req.params.id)
  if (!it) return res.status(404).json({ error: 'Not found' })
  const { judul, isi, penulis, thumbnail, isPublished } = req.body
  Object.assign(it, { judul, isi, penulis, thumbnail, isPublished })
  await it.save()
  res.json(it)
})

r.delete('/berita/:id', async (req, res) => {
  const it = await Berita.findByPk(req.params.id)
  if (!it) return res.status(404).json({ error: 'Not found' })
  await it.destroy()
  res.json({ ok: true })
})

export default r

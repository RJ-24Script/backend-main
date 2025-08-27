import { Router } from 'express'
import adminAuth from '../middleware/adminAuth.js'
import Dokumen from '../models/Dokumen.js'

const r = Router()
r.use(adminAuth)

r.get('/dokumen', async (_req, res) => {
  const list = await Dokumen.findAll({ order: [['createdAt','DESC']] })
  res.json(list)
})

r.post('/dokumen', async (req, res) => {
  const { judul, deskripsi, fileUrl, kategori, isPublished=true } = req.body
  const item = await Dokumen.create({ judul, deskripsi, fileUrl, kategori, isPublished })
  res.json(item)
})

r.put('/dokumen/:id', async (req, res) => {
  const item = await Dokumen.findByPk(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  const { judul, deskripsi, fileUrl, kategori, isPublished } = req.body
  Object.assign(item, { judul, deskripsi, fileUrl, kategori, isPublished })
  await item.save()
  res.json(item)
})

r.delete('/dokumen/:id', async (req, res) => {
  const item = await Dokumen.findByPk(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  await item.destroy()
  res.json({ ok: true })
})

export default r

import { Router } from 'express'
import Pengaduan from '../models/Pengaduan.js'
import adminAuth from '../middleware/adminAuth.js'

const r = Router()
r.use(adminAuth)

// GET semua pengaduan
r.get('/pengaduan', async (req, res) => {
  const list = await Pengaduan.findAll({ order: [['createdAt', 'DESC']] })
  res.json(list)
})

// Ubah status
r.put('/pengaduan/:id/status', async (req, res) => {
  const { id } = req.params
  const { status } = req.body // 'Pending' | 'Diproses' | 'Selesai'
  const item = await Pengaduan.findByPk(id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  item.status = status
  await item.save()
  res.json(item)
})

// Hapus
r.delete('/pengaduan/:id', async (req, res) => {
  const { id } = req.params
  const item = await Pengaduan.findByPk(id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  await item.destroy()
  res.json({ ok: true })
})

export default r

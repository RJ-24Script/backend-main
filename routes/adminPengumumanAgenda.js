import { Router } from 'express'
import adminAuth from '../middleware/adminAuth.js'
import Pengumuman from '../models/Pengumuman.js'
import Agenda from '../models/Agenda.js'

const r = Router()
r.use(adminAuth)

/* Pengumuman */
r.get('/pengumuman', async (_req, res) => {
  const list = await Pengumuman.findAll({ order: [['createdAt','DESC']] })
  res.json(list)
})
r.post('/pengumuman', async (req, res) => {
  const { judul, isi, isActive=true, startsAt=null, endsAt=null } = req.body
  const item = await Pengumuman.create({ judul, isi, isActive, startsAt, endsAt })
  res.json(item)
})
r.put('/pengumuman/:id', async (req, res) => {
  const item = await Pengumuman.findByPk(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  const { judul, isi, isActive, startsAt, endsAt } = req.body
  Object.assign(item, { judul, isi, isActive, startsAt, endsAt })
  await item.save()
  res.json(item)
})
r.delete('/pengumuman/:id', async (req, res) => {
  const item = await Pengumuman.findByPk(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  await item.destroy()
  res.json({ ok: true })
})

/* Agenda */
r.get('/agenda', async (_req, res) => {
  const list = await Agenda.findAll({ order: [['mulai','DESC']] })
  res.json(list)
})
r.post('/agenda', async (req, res) => {
  const { judul, lokasi, deskripsi, mulai, selesai=null, isPublished=true } = req.body
  const item = await Agenda.create({ judul, lokasi, deskripsi, mulai, selesai, isPublished })
  res.json(item)
})
r.put('/agenda/:id', async (req, res) => {
  const item = await Agenda.findByPk(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  const { judul, lokasi, deskripsi, mulai, selesai, isPublished } = req.body
  Object.assign(item, { judul, lokasi, deskripsi, mulai, selesai, isPublished })
  await item.save()
  res.json(item)
})
r.delete('/agenda/:id', async (req, res) => {
  const item = await Agenda.findByPk(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  await item.destroy()
  res.json({ ok: true })
})

export default r

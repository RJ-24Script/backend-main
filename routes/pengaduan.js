// routes/pengaduan.js
import { Router } from 'express'
import Pengaduan from '../models/Pengaduan.js'

const router = Router()

// GET semua pengaduan
router.get('/', async (req, res) => {
  try {
    const list = await Pengaduan.findAll({ order: [['createdAt', 'DESC']] })
    res.json(list)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// POST pengaduan baru
router.post('/', async (req, res) => {
  try {
    const { nama, nik, hp, pesan } = req.body
    if (!nama || !nik || !hp || !pesan) {
      return res.status(400).json({ error: 'Field wajib: nama, nik, hp, pesan' })
    }
    const data = await Pengaduan.create({ nama, nik, hp, pesan })
    res.status(201).json({ message: 'Pengaduan tersimpan', data })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router

// backend-main/routes/pengaduan.js
import express from 'express'
import Pengaduan from '../models/Pengaduan.js'

const router = express.Router()

// GET semua pengaduan
router.get('/', async (req, res) => {
  try {
    const list = await Pengaduan.findAll({
      order: [['createdAt', 'DESC']]
    })
    res.json(list)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal mengambil data pengaduan' })
  }
})

// POST tambah pengaduan
router.post('/', async (req, res) => {
  try {
    const { nama, email, pesan } = req.body
    const newItem = await Pengaduan.create({ nama, email, pesan })
    res.json(newItem)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal menyimpan pengaduan' })
  }
})

// (Opsional) PUT update status pengaduan
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const pengaduan = await Pengaduan.findByPk(id)
    if (!pengaduan) return res.status(404).json({ error: 'Tidak ditemukan' })

    pengaduan.status = status
    await pengaduan.save()
    res.json(pengaduan)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal update status' })
  }
})

export default router

// routes/pengumumanPublik.js
import { Router } from 'express'
import { Op } from 'sequelize'
import Pengumuman from '../models/Pengumuman.js'

const r = Router()

// GET /api/pengumuman  -> daftar aktif (dalam window waktu jika di-set)
r.get('/', async (req, res) => {
  const now = new Date()
  const list = await Pengumuman.findAll({
    where: {
      isActive: true,
      [Op.and]: [
        { [Op.or]: [{ startsAt: null }, { startsAt: { [Op.lte]: now } }] },
        { [Op.or]: [{ endsAt: null }, { endsAt: { [Op.gte]: now } }] },
      ],
    },
    order: [['createdAt','DESC']]
  })
  res.json(list)
})

// GET /api/pengumuman/latest -> satu paling baru & aktif
r.get('/latest', async (_req, res) => {
  const now = new Date()
  const item = await Pengumuman.findOne({
    where: {
      isActive: true,
      [Op.and]: [
        { [Op.or]: [{ startsAt: null }, { startsAt: { [Op.lte]: now } }] },
        { [Op.or]: [{ endsAt: null }, { endsAt: { [Op.gte]: now } }] },
      ],
    },
    order: [['createdAt','DESC']]
  })
  res.json(item || null)
})

export default r

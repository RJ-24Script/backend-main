import { Router } from 'express'
import { Op } from 'sequelize'
import Pengumuman from '../models/Pengumuman.js'

const r = Router()

r.get('/', async (req, res) => {
  const { all } = req.query
  const now = new Date()

  const where = (all === '1') ? {} : {
    isActive: true,
    [Op.and]: [
      { [Op.or]: [{ startsAt: null }, { startsAt: { [Op.lte]: now } }] },
      { [Op.or]: [{ endsAt: null }, { endsAt: { [Op.gte]: now } }] },
    ],
  }

  const list = await Pengumuman.findAll({ where, order: [['createdAt','DESC']] })
  res.json(list)
})

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

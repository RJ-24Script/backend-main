// routes/agendaPublik.js
import { Router } from 'express'
import { Op } from 'sequelize'
import Agenda from '../models/Agenda.js'

const r = Router()

// GET /api/agenda/upcoming -> agenda yang akan datang / hari ini
r.get('/upcoming', async (_req, res) => {
  const now = new Date()
  const list = await Agenda.findAll({
    where: {
      isPublished: true,
      [Op.or]: [
        { mulai: { [Op.gte]: now } }, // akan datang
        {
          // sedang berlangsung (mulai <= now <= selesai/null)
          [Op.and]: [
            { mulai: { [Op.lte]: now } },
            { [Op.or]: [{ selesai: null }, { selesai: { [Op.gte]: now } }] }
          ]
        }
      ]
    },
    order: [['mulai','ASC']]
  })
  res.json(list)
})

// GET /api/agenda -> semua published (opsional)
r.get('/', async (_req, res) => {
  const list = await Agenda.findAll({
    where: { isPublished: true },
    order: [['mulai','DESC']]
  })
  res.json(list)
})

export default r

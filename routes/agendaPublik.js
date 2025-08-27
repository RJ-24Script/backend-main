import { Router } from 'express'
import { Op } from 'sequelize'
import Agenda from '../models/Agenda.js'

const r = Router()

r.get('/upcoming', async (_req, res) => {
  const now = new Date()
  const list = await Agenda.findAll({
    where: {
      isPublished: true,
      [Op.or]: [
        { mulai: { [Op.gte]: now } },
        {
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

r.get('/', async (_req, res) => {
  const list = await Agenda.findAll({
    where: { isPublished: true },
    order: [['mulai','DESC']]
  })
  res.json(list)
})

export default r

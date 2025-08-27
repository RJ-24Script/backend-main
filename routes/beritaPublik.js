import { Router } from 'express'
import Berita from '../models/Berita.js'

const r = Router()

r.get('/', async (_req, res) => {
  const list = await Berita.findAll({
    where: { isPublished: true },
    order: [['createdAt', 'DESC']],
  })
  res.json(list)
})

r.get('/:id', async (req, res) => {
  const item = await Berita.findByPk(req.params.id)
  if (!item || !item.isPublished) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

export default r

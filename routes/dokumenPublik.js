// routes/dokumenPublik.js
import { Router } from 'express'
import Dokumen from '../models/Dokumen.js'

const r = Router()

// GET /api/dokumen -> daftar dokumen published
r.get('/', async (_req, res) => {
  const list = await Dokumen.findAll({
    where: { isPublished: true },
    order: [['createdAt', 'DESC']],
  })
  res.json(list)
})

export default r

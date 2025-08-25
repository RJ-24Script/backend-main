import { Router } from 'express'
import beritaRoute from './berita.js'
import pengaduanRoute from './pengaduan.js'
import pengumumanRoute from './pengumuman.js'

const router = Router()
router.use('/berita', beritaRoute)
router.use('/pengaduan', pengaduanRoute)
router.use('/pengumuman', pengumumanRoute)
export default router

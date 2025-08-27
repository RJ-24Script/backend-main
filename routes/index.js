import { Router } from 'express'
import pengaduanRoute from './pengaduan.js'
import pengumumanPublik from './pengumumanPublik.js'
import agendaPublik from './agendaPublik.js'
import adminPengaduan from './admin.js'
import adminPA from './adminPengumumanAgenda.js'

const router = Router()

// Publik
router.use('/pengaduan', pengaduanRoute)
router.use('/pengumuman', pengumumanPublik)
router.use('/agenda', agendaPublik)

// Admin
router.use('/admin', adminPengaduan)
router.use('/admin', adminPA)

export default router

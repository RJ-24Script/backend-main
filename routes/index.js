import { Router } from 'express'
import beritaRoute from './berita.js'
import pengaduanRoute from './pengaduan.js'
import pengumumanRoute from './pengumuman.js'
import adminRoute from './admin.js'
import pengumumanPublik from './pengumumanPublik.js'
import agendaPublik from './agendaPublik.js'
import adminPA from './adminPengumumanAgenda.js' 



const router = Router()
router.use('/berita', beritaRoute)
router.use('/pengaduan', pengaduanRoute)
router.use('/pengumuman', pengumumanRoute)
router.use('/pengumuman', pengumumanPublik)
router.use('/agenda', agendaPublik)


router.use('/admin', adminRoute)
router.use('/admin', adminPA)
export default router

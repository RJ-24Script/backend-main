import { Router } from 'express'
import pengaduanRoute from './pengaduan.js'
import pengumumanPublik from './pengumumanPublik.js'
import agendaPublik from './agendaPublik.js'
import adminPengaduan from './admin.js'
import adminPA from './adminPengumumanAgenda.js'
import dokumenPublik from './dokumenPublik.js'
import adminDokumen from './adminDokumen.js'
import beritaPublik from './beritaPublik.js'
import adminBerita from './adminBerita.js'


const router = Router()

// Publik
router.use('/pengaduan', pengaduanRoute)
router.use('/pengumuman', pengumumanPublik)
router.use('/agenda', agendaPublik)
router.use('/dokumen', dokumenPublik)
router.use('/berita', beritaPublik)

// Admin
router.use('/admin', adminPengaduan)
router.use('/admin', adminPA)
router.use('/admin', adminDokumen)
router.use('/admin', adminBerita) 

export default router

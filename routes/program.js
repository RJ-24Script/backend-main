import { Router } from 'express';
import Program from '../models/Program.js';


const router = Router();


router.get('/', async (req, res) => {
const list = await Program.findAll({ order: [['nama', 'ASC']] });
res.render('program_index', { title: 'Program & Layanan', list });
});


router.get('/:slug', async (req, res) => {
const item = await Program.findOne({ where: { slug: req.params.slug } });
if (!item) return res.status(404).send('Program tidak ditemukan');
res.render('program_detail', { title: item.nama, item });
});


export default router;
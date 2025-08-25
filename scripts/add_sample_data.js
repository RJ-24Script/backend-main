import Berita from '../models/Berita.js';
import Program from '../models/Program.js';

const addSampleData = async () => {
  try {
    // Sample Berita data
    const beritaData = [
      {
        judul: 'Berita Pertama',
        ringkas: 'Ini adalah ringkasan berita pertama.',
        konten: 'Konten lengkap berita pertama.',
        kategori: 'Umum',
        publishedAt: new Date(),
        slug: 'berita-pertama',
      },
      {
        judul: 'Berita Kedua',
        ringkas: 'Ini adalah ringkasan berita kedua.',
        konten: 'Konten lengkap berita kedua.',
        kategori: 'Umum',
        publishedAt: new Date(),
        slug: 'berita-kedua',
      },
    ];

    // Sample Program data
    const programData = [
      {
        nama: 'Program Pertama',
        deskripsi: 'Deskripsi program pertama.',
        slug: 'program-pertama',
      },
      {
        nama: 'Program Kedua',
        deskripsi: 'Deskripsi program kedua.',
        slug: 'program-kedua',
      },
    ];

    // Insert Berita data
    await Berita.bulkCreate(beritaData);
    console.log('Sample Berita data added.');

    // Insert Program data
    await Program.bulkCreate(programData);
    console.log('Sample Program data added.');

  } catch (error) {
    console.error('Error adding sample data:', error);
  }
};

addSampleData();

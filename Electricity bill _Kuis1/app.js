/**
 * Kuis 1: RESTful API Arsitektur Modular (Express.js)
 * Sesuai panduan: https://rachmat-nur.gitbook.io/express
 * 
 * Nama    : Ewaldo Suhendra Kohar
 * NIM     : 2428240090
 * Kelas   : SI5C
 * Topik   : Utilitas Tagihan Listrik
 * Resource: /electricity-bills
 * Filter  : golongan
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import Middlewares
const logger = require('./middlewares/logger');
const { notFoundHandler, globalErrorHandler } = require('./middlewares/errorHandler');

// Import Routes
const electricityBillRoutes = require('./routes/electricityBillRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middlewares
app.use(cors());
app.use(express.json()); // Parsing application/json
app.use(logger); // Logger kustom setiap request

// Rute Index / Dokumentasi API Ringkas
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'RESTful API Utilitas Tagihan Listrik berjalan dengan baik',
    author: {
      nama: 'Ewaldo Suhendra Kohar',
      nim: '2428240090',
      kelas: 'SI5C',
      mataKuliah: 'Pengembangan Aplikasi Web 2 (PAW 2)'
    },
    topik: 'Utilitas Tagihan Listrik',
    resource: '/electricity-bills',
    filterQuery: '?golongan={nama_golongan}',
    endpoints: {
      'GET /electricity-bills': 'Mendapatkan seluruh data tagihan (bisa difilter query ?golongan=...)',
      'GET /electricity-bills/:id': 'Mendapatkan satu data tagihan berdasarkan ID',
      'POST /electricity-bills': 'Menambahkan data tagihan baru (Header: x-api-key wajib)',
      'PUT /electricity-bills/:id': 'Memperbarui data tagihan (Header: x-api-key wajib)',
      'DELETE /electricity-bills/:id': 'Menghapus data tagihan (Header: x-api-key wajib)'
    }
  });
});

// Mounting Resource Route
app.use('/electricity-bills', electricityBillRoutes);

// Catch 404 Route Not Found
app.use(notFoundHandler);

// Centralized Global Error Handler (Termasuk malformed JSON)
app.use(globalErrorHandler);

// Menjalankan Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`⚡ Server aktif dan berjalan di http://localhost:${PORT}`);
    console.log(`⚡ Topik: Utilitas Tagihan Listrik (/electricity-bills)`);
    console.log(`⚡ Pembuat: Ewaldo Suhendra Kohar - 2428240090 (SI5C)`);
    console.log(`====================================================`);
  });
}

module.exports = app;

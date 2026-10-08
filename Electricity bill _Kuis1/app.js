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
    resource: '/electricity-bills',
    filter: 'golongan',
    routes: {
      getAll: 'GET /electricity-bills',
      getById: 'GET /electricity-bills/:id',
      create: 'POST /electricity-bills',
      update: 'PUT /electricity-bills/:id',
      delete: 'DELETE /electricity-bills/:id'
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
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;

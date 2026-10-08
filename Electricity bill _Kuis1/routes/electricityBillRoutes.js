/**
 * ROUTE: Electricity Bill Routes
 * Tugas: Memetakan endpoint URL ke fungsi Controller menggunakan express.Router()
 * Serta menerapkan middleware cekApiKey pada rute POST, PUT, dan DELETE.
 */

const express = require('express');
const router = express.Router();
const ElectricityBillController = require('../controllers/electricityBillController');
const cekApiKey = require('../middlewares/cekApiKey');

// Rute Publik (Bisa diakses tanpa API Key)
// GET /electricity-bills -> Mengambil semua data atau filter ?golongan=...
router.get('/', ElectricityBillController.getAllBills);

// GET /electricity-bills/:id -> Mengambil satu data berdasarkan ID
router.get('/:id', ElectricityBillController.getBillById);

// Rute Terproteksi (Wajib menyertakan API Key di header 'x-api-key')
// POST /electricity-bills -> Menambah data baru
router.post('/', cekApiKey, ElectricityBillController.createBill);

// PUT /electricity-bills/:id -> Memperbarui data secara penuh
router.put('/:id', cekApiKey, ElectricityBillController.updateBill);

// DELETE /electricity-bills/:id -> Menghapus data berdasarkan ID
router.delete('/:id', cekApiKey, ElectricityBillController.deleteBill);

module.exports = router;

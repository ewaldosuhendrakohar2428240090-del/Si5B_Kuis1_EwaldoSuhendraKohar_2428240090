/**
 * CONTROLLER: Electricity Bill Controller
 * Tugas: Menangani HTTP Request, validasi input pengguna, memanggil Model, dan mengirim HTTP Response.
 */

const ElectricityBillModel = require('../models/electricityBillModel');

const ElectricityBillController = {
  /**
   * Mengambil semua data tagihan listrik atau filter berdasarkan query 'golongan'
   * GET /electricity-bills
   * GET /electricity-bills?golongan=R1
   */
  getAllBills: (req, res) => {
    const { golongan } = req.query;
    const bills = ElectricityBillModel.findAll(golongan);

    res.status(200).json({
      status: 'success',
      message: golongan
        ? `Berhasil mengambil data tagihan listrik untuk golongan '${golongan}'`
        : 'Berhasil mengambil semua data tagihan listrik',
      totalData: bills.length,
      data: bills
    });
  },

  /**
   * Mengambil data satu tagihan listrik berdasarkan ID
   * GET /electricity-bills/:id
   */
  getBillById: (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Parameter ID harus berupa angka',
        data: null
      });
    }

    const bill = ElectricityBillModel.findById(id);

    if (!bill) {
      return res.status(404).json({
        status: 'fail',
        message: `Data tagihan listrik dengan ID ${id} tidak ditemukan`,
        data: null
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Berhasil mengambil data tagihan listrik dengan ID ${id}`,
      data: bill
    });
  },

  /**
   * Menambahkan data tagihan listrik baru
   * POST /electricity-bills
   * Dilindungi oleh middleware cekApiKey
   */
  createBill: (req, res) => {
    const {
      idPelanggan,
      namaPelanggan,
      golongan,
      bulanTagihan,
      pemakaianKwh,
      tarifPerKwh,
      totalTagihan,
      statusBayar
    } = req.body;

    // Validasi kelengkapan data
    if (
      !idPelanggan ||
      !namaPelanggan ||
      !golongan ||
      !bulanTagihan ||
      pemakaianKwh === undefined ||
      pemakaianKwh === null ||
      pemakaianKwh === '' ||
      tarifPerKwh === undefined ||
      tarifPerKwh === null ||
      tarifPerKwh === '' ||
      totalTagihan === undefined ||
      totalTagihan === null ||
      totalTagihan === '' ||
      !statusBayar
    ) {
      return res.status(400).json({
        status: 'fail',
        message: 'Data tidak lengkap! Semua field wajib diisi: idPelanggan, namaPelanggan, golongan, bulanTagihan, pemakaianKwh, tarifPerKwh, totalTagihan, statusBayar',
        data: null
      });
    }

    // Validasi tipe data numerik
    if (isNaN(Number(pemakaianKwh)) || isNaN(Number(tarifPerKwh)) || isNaN(Number(totalTagihan))) {
      return res.status(400).json({
        status: 'fail',
        message: 'Field pemakaianKwh, tarifPerKwh, dan totalTagihan harus berupa angka!',
        data: null
      });
    }

    const newBill = ElectricityBillModel.create({
      idPelanggan,
      namaPelanggan,
      golongan,
      bulanTagihan,
      pemakaianKwh,
      tarifPerKwh,
      totalTagihan,
      statusBayar
    });

    res.status(201).json({
      status: 'success',
      message: 'Data tagihan listrik berhasil ditambahkan',
      data: newBill
    });
  },

  /**
   * Memperbarui seluruh data tagihan listrik berdasarkan ID
   * PUT /electricity-bills/:id
   * Dilindungi oleh middleware cekApiKey
   */
  updateBill: (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Parameter ID harus berupa angka',
        data: null
      });
    }

    // Cek apakah data ada
    const existingBill = ElectricityBillModel.findById(id);
    if (!existingBill) {
      return res.status(404).json({
        status: 'fail',
        message: `Gagal memperbarui: Data tagihan listrik dengan ID ${id} tidak ditemukan`,
        data: null
      });
    }

    const {
      idPelanggan,
      namaPelanggan,
      golongan,
      bulanTagihan,
      pemakaianKwh,
      tarifPerKwh,
      totalTagihan,
      statusBayar
    } = req.body;

    // Validasi data lengkap untuk penggantian penuh
    if (
      !idPelanggan ||
      !namaPelanggan ||
      !golongan ||
      !bulanTagihan ||
      pemakaianKwh === undefined ||
      pemakaianKwh === null ||
      pemakaianKwh === '' ||
      tarifPerKwh === undefined ||
      tarifPerKwh === null ||
      tarifPerKwh === '' ||
      totalTagihan === undefined ||
      totalTagihan === null ||
      totalTagihan === '' ||
      !statusBayar
    ) {
      return res.status(400).json({
        status: 'fail',
        message: 'Semua field wajib diisi untuk operasi PUT (penggantian penuh): idPelanggan, namaPelanggan, golongan, bulanTagihan, pemakaianKwh, tarifPerKwh, totalTagihan, statusBayar',
        data: null
      });
    }

    // Validasi tipe data numerik
    if (isNaN(Number(pemakaianKwh)) || isNaN(Number(tarifPerKwh)) || isNaN(Number(totalTagihan))) {
      return res.status(400).json({
        status: 'fail',
        message: 'Field pemakaianKwh, tarifPerKwh, dan totalTagihan harus berupa angka!',
        data: null
      });
    }

    const updatedBill = ElectricityBillModel.update(id, {
      idPelanggan,
      namaPelanggan,
      golongan,
      bulanTagihan,
      pemakaianKwh,
      tarifPerKwh,
      totalTagihan,
      statusBayar
    });

    res.status(200).json({
      status: 'success',
      message: `Data tagihan listrik dengan ID ${id} berhasil diperbarui`,
      data: updatedBill
    });
  },

  /**
   * Menghapus data tagihan listrik berdasarkan ID
   * DELETE /electricity-bills/:id
   * Dilindungi oleh middleware cekApiKey
   */
  deleteBill: (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Parameter ID harus berupa angka',
        data: null
      });
    }

    const isDeleted = ElectricityBillModel.delete(id);

    if (!isDeleted) {
      return res.status(404).json({
        status: 'fail',
        message: `Gagal menghapus: Data tagihan listrik dengan ID ${id} tidak ditemukan`,
        data: null
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Data tagihan listrik dengan ID ${id} berhasil dihapus`,
      data: null
    });
  }
};

module.exports = ElectricityBillController;

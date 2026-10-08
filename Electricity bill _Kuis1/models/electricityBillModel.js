/**
 * MODEL: Electricity Bill (Tagihan Listrik)
 * Tugas: Menyimpan data dan logika pengolahan data (CRUD & Filter).
 * Catatan Penting: Tidak memakai req dan res.
 */

// Data in-memory tagihan listrik khusus nama & ID mahasiswa
let electricityBills = [
  {
    id: 2428240090,
    idPelanggan: '2428240090',
    namaPelanggan: 'Ewaldo Suhendra Kohar',
    golongan: 'R1-900VA',
    bulanTagihan: 'Oktober 2024',
    pemakaianKwh: 150,
    tarifPerKwh: 1352,
    totalTagihan: 202800,
    statusBayar: 'Lunas'
  }
];

let nextId = 2428240091;

const ElectricityBillModel = {
  /**
   * Mengambil semua data tagihan listrik, opsional filter berdasarkan golongan
   * @param {string} [golongan]
   * @returns {Array}
   */
  findAll: (golongan) => {
    if (golongan) {
      return electricityBills.filter((bill) =>
        bill.golongan.toLowerCase().includes(golongan.toLowerCase())
      );
    }
    return electricityBills;
  },

  /**
   * Mengambil satu data tagihan berdasarkan ID
   * @param {number} id
   * @returns {object|null}
   */
  findById: (id) => {
    return electricityBills.find((bill) => bill.id === id) || null;
  },

  /**
   * Menambahkan data tagihan baru
   * @param {object} billData
   * @returns {object}
   */
  create: (billData) => {
    const newBill = {
      id: nextId++,
      idPelanggan: String(billData.idPelanggan),
      namaPelanggan: String(billData.namaPelanggan),
      golongan: String(billData.golongan),
      bulanTagihan: String(billData.bulanTagihan),
      pemakaianKwh: Number(billData.pemakaianKwh),
      tarifPerKwh: Number(billData.tarifPerKwh),
      totalTagihan: Number(billData.totalTagihan),
      statusBayar: String(billData.statusBayar)
    };
    electricityBills.push(newBill);
    return newBill;
  },

  /**
   * Mengubah / mengganti data tagihan berdasarkan ID
   * @param {number} id
   * @param {object} billData
   * @returns {object|null}
   */
  update: (id, billData) => {
    const index = electricityBills.findIndex((bill) => bill.id === id);
    if (index === -1) return null;

    const updatedBill = {
      id: id,
      idPelanggan: String(billData.idPelanggan),
      namaPelanggan: String(billData.namaPelanggan),
      golongan: String(billData.golongan),
      bulanTagihan: String(billData.bulanTagihan),
      pemakaianKwh: Number(billData.pemakaianKwh),
      tarifPerKwh: Number(billData.tarifPerKwh),
      totalTagihan: Number(billData.totalTagihan),
      statusBayar: String(billData.statusBayar)
    };

    electricityBills[index] = updatedBill;
    return updatedBill;
  },

  /**
   * Menghapus data tagihan berdasarkan ID
   * @param {number} id
   * @returns {boolean}
   */
  delete: (id) => {
    const index = electricityBills.findIndex((bill) => bill.id === id);
    if (index === -1) return false;

    electricityBills.splice(index, 1);
    return true;
  }
};

module.exports = ElectricityBillModel;

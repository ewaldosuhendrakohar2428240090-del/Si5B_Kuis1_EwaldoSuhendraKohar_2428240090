/**
 * MIDDLEWARE: Cek API Key (cekApiKey)
 * Tugas: Melindungi rute POST, PUT, dan DELETE.
 * Memeriksa header 'x-api-key' atau query parameter 'apiKey'.
 */
const cekApiKey = (req, res, next) => {
  const apiKeyClient = req.headers['x-api-key'] || req.query.apiKey;
  const validApiKey = process.env.API_KEY || 'kuis1_secret_2428240090';

  if (!apiKeyClient) {
    return res.status(401).json({
      status: 'fail',
      message: 'Akses ditolak: API Key tidak ditemukan. Sertakan header "x-api-key"',
      data: null
    });
  }

  if (apiKeyClient !== validApiKey) {
    return res.status(403).json({
      status: 'fail',
      message: 'Akses ditolak: API Key yang diberikan tidak valid / salah',
      data: null
    });
  }

  next();
};

module.exports = cekApiKey;

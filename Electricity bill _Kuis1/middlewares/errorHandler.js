/**
 * MIDDLEWARE: Error Handler Terpusat
 * Tugas: Menangani error parsing JSON rusak, route 404, serta error server lainnya.
 */

// Middleware untuk route yang tidak terdaftar (404 Not Found)
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Endpoint '${req.method} ${req.originalUrl}' tidak ditemukan pada server`,
    data: null
  });
};

// Middleware penanganan error terpusat (termasuk JSON rusak)
const globalErrorHandler = (err, req, res, next) => {
  // Menangani error parsing JSON yang tidak valid (Malformed JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'fail',
      message: 'Format JSON yang dikirimkan rusak / malformed syntax. Periksa tanda koma, kurung kurawal, atau tanda petik.',
      error: err.message
    });
  }

  console.error('Unhandled Error:', err);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Terjadi kesalahan internal pada server',
    data: null
  });
};

module.exports = {
  notFoundHandler,
  globalErrorHandler
};

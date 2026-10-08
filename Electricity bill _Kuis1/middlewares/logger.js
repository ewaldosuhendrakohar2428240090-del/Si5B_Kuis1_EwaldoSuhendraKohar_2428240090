/**
 * MIDDLEWARE: Logger
 * Tugas: Mencatat setiap request yang masuk ke server (Metode HTTP, URL, Waktu).
 */
const logger = (req, res, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;

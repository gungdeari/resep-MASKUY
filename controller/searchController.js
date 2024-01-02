const db = require("../db/db");
function convertToHoursMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes} menit`;
  } else {
    return `${hours} jam ${remainingMinutes} menit`;
  }
}

class SearchController {
  static async index(req, res) {
    try {
      const { namaResep } = req.query;

      // Melakukan pencarian resep berdasarkan nama resep
      const hasilPencarianResep = await db("resep").where('nama', 'like', `%${namaResep}%`);

      // Melakukan pencarian artikel berdasarkan judul artikel
      const hasilPencarianArtikel = await db("artikel").where('judul', 'like', `%${namaResep}%`);

      hasilPencarianResep.forEach(resep => {
        resep.waktuFormatted = convertToHoursMinutes(resep.waktu);
      });

      // Kirim hasil pencarian resep dan artikel ke halaman search.ejs
      res.render("search", { 
        hasilPencarianResep, 
        hasilPencarianArtikel, 
        kataKunci: namaResep,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = SearchController;

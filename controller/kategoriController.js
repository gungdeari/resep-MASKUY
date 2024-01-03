const db = require("../db/db");

//function convert minute to hour
function convertToHoursMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes} menit`;
  } else {
    return `${hours} jam ${remainingMinutes} menit`;
  }
}

class KategoriController {
    static async index(req, res) {
      try {
        const { namaKategori } = req.params;
  
        // Misalnya, melakukan query ke database untuk mendapatkan data resep berdasarkan kategori
        const dataKategori = await db("resep").where({ kategori: namaKategori });
        const dataArtikel = await db("artikel")

        dataKategori.forEach(resep => {
          resep.waktuFormatted = convertToHoursMinutes(resep.waktu);
        });
  
        // Kirim data kategori ke halaman kategori
        res.render("kategori", { 
          resepKategori: dataKategori, namaKategori,
          artikelAll: dataArtikel 
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
}
 

module.exports = KategoriController;
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

class HomeController {
  static async index(req, res) {
    try {
      // Dapatkan semua data resep
      const data = await db("resep");
      const dataArtikel = await db("artikel")
      
      data.forEach(resep => {
        resep.waktuFormatted = convertToHoursMinutes(resep.waktu);
      });

      // Ambil semua nilai kategori dari data resep
      const allCategories = data.map(resep => resep.kategori);

      // Menggabungkan semua nilai kategori menjadi satu array
      const mergedCategories = [].concat.apply([], allCategories);

      // Menghapus duplikasi nilai kategori dengan Set (jika tipe data diubah menjadi string)
      const uniqueCategories = [...new Set(mergedCategories)];

      res.render("home", {
        resep: data,
        artikel: dataArtikel,
        kategori: uniqueCategories // Mengirimkan nilai kategori yang unik ke template
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}


module.exports = HomeController;
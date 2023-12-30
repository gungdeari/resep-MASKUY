const db = require("../db/db");
function convertToHoursMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} jam ${remainingMinutes} menit`;
}

class HomeController {
    static async index(req, res) {
      const data = await db("resep");
      const dataArtikel = await db("artikel");

      data.forEach(resep => {
        resep.waktuFormatted = convertToHoursMinutes(resep.waktu);
      });
  
      res.render("home", {
        resep: data,
        artikel: dataArtikel
      });
  }
}

module.exports = HomeController;
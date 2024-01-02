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

class DetailController {
  static async index(req, res) {
      try {
        const { id } = req.params;
        const data = await db("resep").where({ id }).first();
        const dataArtikel = await db("artikel");
        
        if (!data) {
          return res.status(404).send('Resep not found');
        }

        data.waktuFormatted = convertToHoursMinutes(data.waktu);
  
        res.render("detail", {
          resep: data,
          artikelAll: dataArtikel
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  }
}

module.exports = DetailController;
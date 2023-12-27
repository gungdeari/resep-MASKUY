const db = require("../db/db");
const path = require("path");
const fs = require("fs").promises;

class ResepController {
  static async index(req, res) {
    const data = await db("resep");

    res.render("admin/resep/list", {
      resep: data,
    });
  }

  static async create(req, res) {
    const data = await db("resep");

    res.render("admin/resep/create", {
      oldValues: req.body,
      resep: data,
    });
  }

  static async edit(req, res) {
    const { id } = req.params;

    try {
      let result = await db("resep").where("id", id).first();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async store(req, res) {
    const { nama_resep, deskripsi_resep, waktu_resep, level_resep, porsi_resep, bahan_resep, cara_resep } = req.body;

    try {
      let foto_resep  = ''; 
      
      if (req.file && req.file.filename) {
        foto_resep = req.file.filename; 
      }

      const result = await db("resep").insert({
        nama: nama_resep,
        gambar: foto_resep,
        deskripsi: deskripsi_resep,
        waktu: waktu_resep,
        level: level_resep,
        porsi: porsi_resep,
        bahan: bahan_resep,
        cara: cara_resep
      });

      if (result) {
        req.flash("success", "Success Menambah Data Resep");
        res.redirect("/admin/resep/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async update(req, res) {
    const { nama_resep, deskripsi_resep, waktu_resep, level_resep, porsi_resep, bahan_resep, cara_resep } =
      req.body;
    const { id } = req.params;

    try {
      let data = await db("resep").where("id", id).first();

      if (req.file) {
        // Delete the if found
        const filePath = path.join("public/uploads", data.gambar);
        await fs.unlink(filePath);
      }

      let result = await db("resep")
        .where("id", id)
        .update({
            nama: nama_resep,
            gambar: req.file ? req.file.filename : undefined,
            deskripsi: deskripsi_resep,
            waktu: waktu_resep,
            level: level_resep,
            porsi: porsi_resep,
            bahan: bahan_resep,
            cara: cara_resep  
        });

      if (result) {
        req.flash("success", "Success update Data Resep");
        res.redirect("/admin/resep/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    const { id } = req.body;
    console.log();
    try {
      // Fetch the event data to get the filename
      const resep = await db("resep").where("id", id).first();

      // Delete the associated file
      const filePath = path.join("public/uploads", resep.foto_resep);
      await fs.unlink(filePath);

      // Delete the event record from the database
      await db("resep").where({ id: id }).del();
      res.redirect("/admin/resep/list"); // No content (successful deletion)
    } catch (error) {
      console.error("Error deleting resep:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = ResepController;
const db = require("../db/db");
const path = require("path");
const fs = require("fs").promises;


class ArtikelController {

    static async show(req, res) {
        try {
          const { id } = req.params;
          const data = await db("artikel").where({ id }).first();
          const dataArtikel = await db("artikel");
          
          if (!data) {
            return res.status(404).send('Artikel not found');
          }
    
          res.render("artikel", {
            artikel: data,
            artikelAll: dataArtikel
          });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
    }
    
    static async index(req, res) {
        const data = await db("artikel");

        res.render("admin/artikel/list", {
            artikel: data,
        });
    }

    static async detail(req, res) {
        const { id } = req.params;
        const data = await db("artikel").where({ id }).first();
    
        res.render("admin/artikel/detail", {
          artikel: data,
        });
    }


    static async create(req, res) {
        const data = await db("artikel");

        res.render("admin/artikel/create", {
        oldValues: req.body,
        artikel: data,
        });
    }

    static async edit(req, res) {
        const { id } = req.params;

        try {
        let data = await db("artikel").where("id", id).first();
        res.render("admin/artikel/edit", {
            artikel: data,
        });
        } catch (error) {
        console.log(error);
        }
    }

    static async store(req, res) {
        const { judul_artikel, content_artikel } = req.body;

        try {
        let foto_artikel  = ''; 
        
        if (req.file && req.file.filename) {
            foto_artikel = req.file.filename; 
        }

        const result = await db("artikel").insert({
            judul: judul_artikel,
            gambar: foto_artikel,
            content: content_artikel,
        });

        if (result) {
            req.flash("success", "Success Menambah Data Artikel");
            res.redirect("/admin/artikel/list");
        }
        } catch (error) {
        console.log(error);
        }
    }

    static async update(req, res) {
        const { judul_artikel, content_artikel } =
        req.body;
        const { id } = req.params;

        try {
        let data = await db("artikel").where("id", id).first();

        if (req.file) {
            // Delete the if found
            const filePath = path.join("public/uploads", data.gambar);
            await fs.unlink(filePath);
        }

        let result = await db("artikel")
            .where("id", id)
            .update({
                judul: judul_artikel,
                gambar: req.file ? req.file.filename : undefined,
                content: content_artikel,
            });

        if (result) {
            req.flash("success", "Success update Data Artikel");
            res.redirect("/admin/artikel/list");
        }
        } catch (error) {
        console.log(error);
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
        const deletedCount = await db('artikel').where({ id }).del();

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Resep not found' });
        }

        return res.redirect('/admin/artikel/list');
        } catch (error) {
        console.error("Error deleting recipe:", error);
        return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

module.exports = ArtikelController;
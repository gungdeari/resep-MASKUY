const { Router } = require('express')
const router = Router();
const upload = require("../middlewares/upload");

const ResepController = require("../controller/resepController");
const ArtikelController = require('../controller/artikelController');

// router.get('/login', (req, res) => {
//     res.render('login')
// })

// router.post('/login', checkLogin, (req, res) => {
//     res.redirect('/admin/dashboard');
// });

router.get("/admin/dashboard", (req, res) => {
    res.render("admin/dashboard");
});

router.get('/admin/carrousel', (req, res) => {
    res.render('admin/carrousel/carrousel');
})

//Resep
router.get("/admin/resep/list", ResepController.index);
router.get("/admin/resep/create", ResepController.create);
router.post("/admin/resep/store", upload.single("gambar"), ResepController.store);
router.get("/admin/resep/edit/:id", ResepController.edit);
router.get("/admin/resep/detail/:id", ResepController.detail);
router.post( "/admin/resep/update/:id", upload.single("gambar"), ResepController.update);
router.post("/admin/resep/delete/:id", ResepController.delete);

//Admin-Artikel
router.get("/admin/artikel/list", ArtikelController.index);
router.get("/admin/artikel/create", ArtikelController.create);
router.post("/admin/artikel/store", upload.single("gambar"), ArtikelController.store);
router.get("/admin/artikel/edit/:id", ArtikelController.edit);
router.get("/admin/artikel/detail/:id", ArtikelController.detail);
router.post( "/admin/artikel/update/:id", upload.single("gambar"), ArtikelController.update);
router.post("/admin/artikel/delete/:id", ArtikelController.delete);

module.exports = router;
const { Router } = require('express')
const router = Router();
const upload = require("../middlewares/upload");

const ResepController = require("../controller/resepController");

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
router.post(
  "/admin/resep/store",
  upload.single("img"),
  ResepController.store
);
router.get("/resep/:id", ResepController.edit);
router.post(
  "/admin/resep/update/:id",
  upload.single("img"),
  ResepController.update
);
router.post("/admin/resep/delete", ResepController.delete);

module.exports = router;
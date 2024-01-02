const { Router } = require("express");

const router = Router();

const adminRouter = require("./admin.router");
const homeRouter = require("./home.router");
const detailRouter = require("./detail.router");
const artikelRouter = require("./artikel.router");
const kategoriRouter = require("./kategori.router");
const searchRouter = require("./search.router");

router.use(adminRouter);
router.use(homeRouter);
router.use(detailRouter);
router.use(artikelRouter);
router.use(kategoriRouter);
router.use(searchRouter);

module.exports = router;
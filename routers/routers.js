const { Router } = require("express");

const router = Router();

const adminRouter = require("./admin.router");
const homeRouter = require("./home.router");
const detailRouter = require("./detail.router");

router.use(adminRouter);
router.use(homeRouter);
router.use(detailRouter);

module.exports = router;
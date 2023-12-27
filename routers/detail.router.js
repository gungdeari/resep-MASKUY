const { Router } = require('express')
const router = Router();

router.get('/detail', (req, res) => {
    res.render('detail')
})

module.exports = router;
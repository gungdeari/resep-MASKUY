let express = require('express')
let app = express()
let PORT = process.env.PORT || 4000

app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/detail', (req, res) => {
    res.render('detail')
})

app.listen(PORT, (error) => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express')
// const cons = require('consolidate');
// const path = require('path');

app = express()
const port = 3000

// app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'pug');

app.use(express.static('public'))
app.use('/assets', express.static('public/assets'))

//const homeRouter = require('./routes/index');
//app.use('/', homeRouter);

app.use((req, res) => {
    res.status(404).sendFile('public/404.html', {root: '.'})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
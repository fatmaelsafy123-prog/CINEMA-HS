const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ملف قاعدة البيانات
const DB_FILE = path.join(__dirname, 'movies.json');

// التأكد من وجود ملف البيانات
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// جلب الأفلام للرئيسية
app.get('/api/movies', (req, res) => {
    const data = fs.readFileSync(DB_FILE);
    res.json(JSON.parse(data));
});

// إضافة فيلم جديد من الأدمن
app.post('/api/movies', (req, res) => {
    const movies = JSON.parse(fs.readFileSync(DB_FILE));
    const newMovie = {
        id: Date.now(),
        title: req.body.title,
        poster: req.body.poster,
        link: req.body.link
    };
    movies.push(newMovie);
    fs.writeFileSync(DB_FILE, JSON.stringify(movies, null, 2));
    res.redirect('/admin.html?status=success');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

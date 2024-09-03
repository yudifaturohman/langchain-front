import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fs from "fs";
import path from "path";
const app = express();
const PORT = 3000; // Port untuk menjalankan server Express


// Konfigurasi Express untuk menggunakan body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi untuk menyajikan file statis dari direktori 'public'
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.status(200).contentType("text/html").send(fs.readFileSync("./index.html"));
});

// Endpoint untuk menangani permintaan dari form
app.post('/ask', async (req, res) => {
  const queryText = req.body.query_text;

  try {
    // Kirim permintaan ke API Flask
    const response = await axios.post('http://localhost:5000/ask', {
      query_text: queryText
    });

    // Ambil respons dari API Flask
    const responseData = response.data;

    // Kembalikan respons dalam format JSON
    res.json(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ response: 'Terjadi kesalahan saat memproses permintaan.', sources: [] });
  }
});

// Jalankan server Express
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
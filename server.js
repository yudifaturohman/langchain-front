import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import fs from "fs";
const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.status(200).contentType("text/html").send(fs.readFileSync("./index.html"));
});

app.post('/ask', async (req, res) => {
  const queryText = req.body.query_text;

  try {
    const response = await axios.post('http://localhost:5000/ask', {
      query_text: queryText
    });

    const responseData = response.data;

    res.json(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ response: 'Terjadi kesalahan saat memproses permintaan.', sources: [] });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
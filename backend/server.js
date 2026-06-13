const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// --- API Endpoints ---

// Get Ads Banner
app.get('/api/ads-banner', (req, res) => {
  db.get("SELECT value FROM settings WHERE key = 'ads_banner'", (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json(JSON.parse(row.value));
    } else {
      res.status(404).json({ message: "Ads banner not found" });
    }
  });
});

// Update Ads Banner
app.put('/api/ads-banner', (req, res) => {
  const data = JSON.stringify(req.body);
  db.run("UPDATE settings SET value = ? WHERE key = 'ads_banner'", [data], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Ads banner updated successfully", changes: this.changes });
  });
});

// Get all Camps
app.get('/api/camps', (req, res) => {
  db.all("SELECT id, data FROM camps", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const camps = rows.map(row => JSON.parse(row.data));
    res.json(camps);
  });
});

// Update a Camp
app.put('/api/camps/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.stringify(req.body);
  
  db.run("UPDATE camps SET data = ? WHERE id = ?", [data, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Camp not found" });
    }
    res.json({ message: "Camp updated successfully" });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

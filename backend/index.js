const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// ✅ Load .env only in local/dev, not in production
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

connectToMongo();
const app = express();
const port = process.env.PORT || 10000; // ⚡ Render recommends dynamic port

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ iNotebook backend listening on port ${port}`);
});





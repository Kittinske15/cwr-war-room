const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());

app.use(cors(corsOptions))
app.get('/', (req, res) => {
  res.send('Welcome to CORS server 😁')
})
app.get('/cors', (req, res) => {
  res.send('This has CORS enabled 🎈')
})
app.listen(8080, () => {
  console.log('listening on port 8080')
})
const express = require('express');
const app = express();

app.use(express.json());

app.post('/submit', (req, res) => {
  console.log('Received environment variables:', req.body);
  res.send({ status: 'Success', received: req.body });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

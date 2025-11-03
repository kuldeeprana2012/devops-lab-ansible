const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🚀 Updated version! Hello from DevOps Pipeline v2');
});

app.listen(3000, () => console.log('App running on port 3000'));

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from DevOps Lab! Node.js app deployed via Jenkins + Ansible + Docker.');
});

app.listen(port, () => console.log(`App listening on port ${port}`));

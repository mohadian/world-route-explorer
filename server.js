const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public'), {
  etag: true,
  maxAge: 0
}));

// For local dev
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🌍 World Route Explorer running at http://localhost:${PORT}`);
  });
}

// For Vercel
module.exports = app;

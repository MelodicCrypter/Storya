// Library Modules
const path = require('path');
const express = require('express');

// Local Modules

// Instance of Express
const app = express();
// Port
const port = process.env.PORT || 3000;
// Public Path
const publicPath = path.join(__dirname, '../public');
// Static directory
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server up on port: ${port}`);
});

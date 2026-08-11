const fs = require('fs');
let code = fs.readFileSync('src/sections/ComponentGallery.jsx', 'utf8');
code = code.replace(/<span style={{ display: "inline-flex", alignItems: "center" }}>(.*?)<\/span>/g, "$1");
fs.writeFileSync('src/sections/ComponentGallery.jsx', code);

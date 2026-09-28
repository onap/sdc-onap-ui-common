const fs = require('fs');
const path = require('path');

fs.rmSync(path.resolve(__dirname, '../lib'), { recursive: true, force: true });

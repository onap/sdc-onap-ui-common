// SPDX-License-Identifier: Apache-2.0
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const lib = path.join(root, 'lib');

function copy(from, to) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
}

['mixins.scss', '_typography.scss', 'variables.scss'].forEach((file) => {
    copy(path.join(root, 'styles/common', file), path.join(lib, 'scss', file));
});

function copyHtml(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
        const from = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            copyHtml(from);
        } else if (entry.name.endsWith('.html')) {
            copy(from, path.join(lib, 'html', path.relative(root, from)));
        }
    });
}

copyHtml(path.join(root, 'components'));

fs.readdirSync(path.join(root, 'assets/icons'), { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .forEach((entry) => {
        copy(path.join(root, 'assets/icons', entry.name), path.join(lib, 'icons', entry.name));
    });

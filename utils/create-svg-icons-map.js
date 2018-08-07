const fs = require('fs');
const path = require('path');
const svgFolder = path.resolve(__dirname + '/../assets/sdc-icons');
const iconMapFile = path.resolve(__dirname + '/../lib/icons-map.json');
const iconMapTSFile = path.resolve(__dirname + '/../lib/icons-map.js');
const disallowedSvgAttributes = ['fill', 'id', 'width', 'height'];
const disallowedSvgStyle = ['fill'];
const disallowedSvgInlineAttributes = ['fill', 'id'];
const disallowedSvgInlineStyle = ['fill'];

function _escapeStrRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function _makeSvgAttributesRegex(attrs) {
    return new RegExp(`\s*(${attrs.map(_escapeStrRegex).join('|')})\s*=\s*("|')[^"']*\\2`, 'g');
}
function _makeSvgStyleRegex(attrs) {
    return new RegExp(`\s*${attrs.map(_escapeStrRegex).join('|')}\s*:[^'";]*;?`, 'g');
}

// prepare
const disallowedSvgAttributesRegex = _makeSvgAttributesRegex(disallowedSvgAttributes);
const disallowedSvgStyleRegex = _makeSvgStyleRegex(disallowedSvgStyle);
const disallowedSvgInlineAttributesRegex = _makeSvgAttributesRegex(disallowedSvgInlineAttributes);
const disallowedSvgInlineStyleRegex = _makeSvgStyleRegex(disallowedSvgInlineStyle);

function addIcon(iconsObject, category, iconName, iconPath) {
    let iconContent = fs.readFileSync(iconPath).toString();
    if (!iconContent) {
        return;
    }

    let iconInfoMsg = '';

    // clean the first <svg> tag
    iconContent = iconContent.replace(/<svg\b[^>]*>/, (svgTag) => {
        let cleanedNum = 0;
        const disallowedSvgAttributesMatch = svgTag.match(disallowedSvgAttributesRegex);
        if (disallowedSvgAttributesMatch) {
            svgTag = svgTag.replace(disallowedSvgAttributesRegex, '');
            cleanedNum += disallowedSvgAttributesMatch.length;
        }
        const disallowedSvgStyleMatch = svgTag.match(disallowedSvgStyleRegex);
        if (disallowedSvgStyleMatch) {
            svgTag = svgTag.replace(disallowedSvgStyleRegex, '');
            cleanedNum += disallowedSvgStyleMatch.length;
        }
        iconInfoMsg += 'ADDED';
        if (cleanedNum > 0) {
            iconInfoMsg += `\n\t(cleaned ${cleanedNum} attributes and styles)`;
        }
        return svgTag;
    });

    const disallowedSvgInlineAttributesMatch = iconContent.match(disallowedSvgInlineAttributesRegex);
    if (disallowedSvgInlineAttributesMatch) {
        iconInfoMsg += `\n\t* CHECK for ${disallowedSvgInlineAttributesMatch.length} inline attributes [${disallowedSvgInlineAttributes.join(', ')}]`;
    }
    const disallowedSvgInlineStyleMatch = iconContent.match(disallowedSvgInlineStyleRegex);
    if (disallowedSvgInlineStyleMatch) {
        iconInfoMsg += `\n\t* CHECK for ${disallowedSvgInlineStyleMatch.length} inline styles [${disallowedSvgInlineStyle.join(', ')}]`;
    }

    console.log(`# ${iconName}: ${iconInfoMsg}`);

    if (!iconsObject.hasOwnProperty(category)){
        iconsObject[category] = {};
    }

    iconsObject[category][iconName] = iconContent;
}

function main() {
    const iconMapDir = path.dirname(iconMapFile);
    if (!fs.existsSync(iconMapDir)) {
        fs.mkdirSync(iconMapDir);
    }

    let iconsObject = {};
    const directories = getDirectories(svgFolder);
    directories.map((directory) => {
        const _path = path.resolve(__dirname + '/../assets/sdc-icons/' + directory);
        readSvg(iconsObject, directory, _path);
    });
    const dataToWrite = JSON.stringify(iconsObject);

    fs.writeFileSync(iconMapFile, dataToWrite);
    fs.writeFileSync(iconMapTSFile, `export default ${dataToWrite};`);

    console.log(`Icons Map JSON created! [${iconMapFile}]`);
}

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path+'/'+file).isDirectory();
    });
}

function readSvg(iconsObject, category, path) {
    console.log("path: " + path);
    fs.readdirSync(path).forEach((file) => {
        console.log(file);
        const fileName = file.split('.', 2)[0];
        const fileExtension = file.split('.', 2)[1];
        if (fileExtension === 'svg') {
            const filePath = path + '/' + file;
            if (fs.existsSync(filePath)) {
                addIcon(iconsObject, category, fileName, filePath);
            }
        }
    });
}

main();

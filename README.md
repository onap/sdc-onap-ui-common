# ONAP-UI-COMMON

This project aims to create a unified UI styled components for multiple development teams who work on the same web-based applications. 
This repository contains the components HTML files and SCSS files. 
The project is used by ONAP-UI-ANGULAR and ONAP-UI-REACT that implements components according to the HTML in this project. 

	
### Installation
```js
npm install onap-ui-common
```

### Usage

You can use the scss files (for styling) and icons-map.js file (for using icons).
To use the icons just import the iconsMap
```js
import { iconsMap } from 'onap-ui-common';
```

To use the SCSS files you need to reference them from your local SCSS file and compile them.
```scss
@import '../../../node_modules/onap-ui-common/styles/style.scss'; 
```

### See also
[ONAP-UI-ANGULAR](https://github.com/onap-sdc/onap-ui-angular)

[ONAP-UI-REACT](https://github.com/onap-sdc/onap-ui-react)
 
### Having some trouble? Have an issue?
For bugs and issues, please use the [issues](https://github.com/onap-sdc/onap-ui-common/issues) page

### How to Contribute
**Contribution can be made only by following these guide lines**
* Every change in the basic HTML files structure, must be followed by changes on the frameworks projects (ONAP-UI-ANGULAR and ONAP-UI-REACT).
* There will be no any 3rd party UI framework imported (i.e. `Bootstrap`, `Material`, `Foundation`... etc.).
* Contribution are done only by the [contribution guide](https://github.com/onap-sdc/onap-ui-common/wiki/Contribution-guide). Contributions submitted not in this format and guidelines will not be considered.

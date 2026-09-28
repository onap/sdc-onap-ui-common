# ONAP-UI-COMMON

This project aims to create unified UI styled components for multiple development teams who work on the same web-based applications. 
This repository contains the components HTML files and SCSS files. 
The project is used by ONAP-UI-ANGULAR and ONAP-UI-REACT that implement components according to the HTML in this project. 

	
### Installation
```js
npm install onap-ui-common
```

### Usage

The package publishes only its `lib/` folder:

| Path | Content |
|---|---|
| `onap-ui-common/lib/style.css` | the compiled stylesheet for all components |
| `onap-ui-common/lib/scss/variables.scss`, `mixins.scss`, `_typography.scss` | the shared SCSS variables, mixins and typography, to build your own styles on |
| `onap-ui-common/lib/icons/*.svg` | the plain SVG icons |
| `onap-ui-common/lib/html/components/**/*.html` | the reference HTML of each component |

To use the icons map just import it:
```js
import { iconsMap } from 'onap-ui-common';
```

To use the styles, import the compiled CSS, or the variables and mixins into your own SCSS:
```scss
@import 'node_modules/onap-ui-common/lib/style.css';
@import 'node_modules/onap-ui-common/lib/scss/variables.scss';
@import 'node_modules/onap-ui-common/lib/scss/mixins.scss';
```

### See also
[ONAP-UI-ANGULAR](https://gerrit.onap.org/r/admin/repos/sdc/onap-ui-angular)

[ONAP-UI-REACT](https://gerrit.onap.org/r/admin/repos/sdc/onap-ui-react)
 
### Having some trouble? Have an issue?
For bugs and issues, please use the [SDC project in the ONAP Jira](https://lf-onap.atlassian.net/jira/software/c/projects/SDC/issues).

### How to Contribute
**Contribution can be made only by following these guidelines**
* Changes are submitted for review on [Gerrit](https://gerrit.onap.org/r/admin/repos/sdc/onap-ui-common). Pull requests opened on the GitHub mirror are forwarded to Gerrit.
* Every change in the basic HTML files structure must be followed by changes on the framework projects (ONAP-UI-ANGULAR and ONAP-UI-REACT).
* There will not be any 3rd party UI framework imported (i.e. `Bootstrap`, `Material`, `Foundation`... etc.).

/**
 * direct JavaScript Toolbox
 * All-in-one toolbox to provide more reusable JavaScript features
 *
 * (C) direct Netware Group - All rights reserved
 * https://www.direct-netware.de/redirect?djt;html;floating_details
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.
 *
 * https://www.direct-netware.de/redirect?licenses;mpl2
 *
 * @license Mozilla Public License, v. 2.0
 */

const AutoPrefixer = require('autoprefixer');
const CssNano = require('cssnano');
const path = require('path');
const PostcssNodeSass = require('postcss-node-sass');

module.exports = {
    syntax: 'postcss-scss',
    plugins: [
        PostcssNodeSass({ includePaths: [ path.resolve('./node_modules/') ] }),
        AutoPrefixer(),
        CssNano()
    ]
};

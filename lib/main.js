/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const { Cu } = require('chrome');
const { ScratchpadManager } = Cu.import('resource:///modules/devtools/scratchpad-manager.jsm', {});
const { ActionButton } = require('sdk/ui/button/action');
const { Item, SelectionContext } = require('sdk/context-menu');
const { data } = require('sdk/self');
const _ = require('sdk/l10n').get;

exports.main = function () {
    ActionButton({
        id: 'gebrascratchpad-button',
        label: _('addon_name'),
        icon: {
            '18': './images/icon18.png', // toolbar icon non HiDPI
            '32': './images/icon32.png', // menu panel icon non HiDPI
            '36': './images/icon36.png', // toolbar icon HiDPI
            '64': './images/icon64.png'  // menu panel icon HiDPI
        },
        onClick: function () {
            // Optional initial state of the scratchpad, an object
            // with properties filename, text, and executionContext.
            ScratchpadManager.openScratchpad({
                text: ''
            });
        }
    });

    Item({
        label: _('menu_label'),
        accesskey: _('menu_accesskey'),
        image: data.url('images/icon18.png'),
        context: SelectionContext(),
        contentScriptFile: './scratchpad.js',
        onMessage: function (aSelection) {
            ScratchpadManager.openScratchpad({
                text: aSelection
            });
        }
    });
};

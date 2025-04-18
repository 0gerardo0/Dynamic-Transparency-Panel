import St from 'gi://St';
import Gio from 'gi://Gio';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class transparencyExtension extends Extension {

    enable() {
        this._applyStyles();
    }

    disable() {
        this._removeCustomStyles();
    }

    _applyStyles() {
        Main.panel.add_style_class_name('CSSstylePanel');
            const addStyleClass = Main.panel.statusArea.quickSettings;
            if (addStyleClass) {
                addStyleClass.menu.actor.add_style_class_name('CSSstylePanel-qs');
            }
        }

    _removeCustomStyles() {
        Main.panel.remove_style_class_name('CSSstylePanel');
        const addStyleClass = Main.panel.statusArea.quickSettings;
        if (addStyleClass) {
            addStyleClass.menu.actor.remove_style_class_name('CSSstylePanel-qs');
        }
    }
}
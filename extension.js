import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as QuickSettings from 'resource:///org/gnome/shell/ui/quickSettings.js';

export default class blurquicksettingsExtension extends Extension {
    enable() {
        this._addCustomStyles();
    }

    disable() {
        this._removeCustomStyles();
    }

    _addCustomStyles() {
        // Agrega la clase personalizada a los elementos deseados
        Main.panel.add_style_class_name('translucent-panel');

        const quickSettings = Main.panel.statusArea.quickSettings;
        if (quickSettings) {
            quickSettings.menu.actor.add_style_class_name('translucent-qs');
        }
    }
    _removeCustomStyles() {
        Main.panel.remove_style_class_name('translucent-panel');

        const quickSettings = Main.panel.statusArea.quickSettings;
        if (quickSettings) {
            quickSettings.menu.actor.remove_style_class_name('translucent-qs');
        }
    }
}


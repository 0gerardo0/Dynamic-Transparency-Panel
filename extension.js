import St from 'gi://St';
import Gio from 'gi://Gio';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class transparencyExtension extends Extension {
    
    constructor(metadata) {
        super(metadata);
        this._settings     = null;
        this._styleTag     = null;
        this._settingsId   = null;
    }
    enable() {
        this._settings = this.getSettings('org.gnome.shell.extensions.transparency-panel');
        this._settingsId = this._settings.connect('changed', () => this._applyStyles());
        this._applyStyles();
    }

    disable() {
        if (this._settingsId) {
            this._settings.disconnect(this._settingsId);
            this._settingsId = null;
        this._removeCustomStyles();
        this._settings = null;
        }
    }

    _applyStyles() {
        const useCustomStyle = this._settings.get_boolean('use-custom-style');

        if(useCustomStyle) {
            const opacity = this._settings.get_int('panel-opacity') / 100;

            const css = `
                #panel {
                    background-color: rgba(50, 50, 50, ${opacity}; 
                }
            
            `;
            if (this._styleTag) {
                this._styleTag.set_content(css);
            } else {
                this._styleTag = St.ThemeContext.get_for_stage(global.stage)
                    .get_theme()
                    .append_stylesheet_from_string(css);
            }
        } else {
            Main.panel.add_style_class_name('CSSstylePanel');
            const addStyleClass = Main.panel.statusArea.quickSettings;
                if (addStyleClass) {
                    addStyleClass.menu.actor.add_style_class_name('CSSstylePanel-qs');
                }
        }
    }
    _removeCustomStyles() {
        const useCustomStyle = this._settings.get_boolean('use-custom-style');

        if (useCustomStyle && this._styleTag){
                St.ThemeContext.get_for_stage(global.stage)
                    .get_theme()
                    .remove_stylesheet(styleTag);
                styleTag = null;
        } else {
            Main.panel.remove_style_class_name('CSSstylePanel');
            const addStyleClass = Main.panel.statusArea.quickSettings;
            if (addStyleClass) {
                addStyleClass.menu.actor.remove_style_class_name('CSSstylePanel-qs');
            }
        }
    }
    
}

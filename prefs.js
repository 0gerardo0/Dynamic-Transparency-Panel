import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';

import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class PanelSettingsPrefs extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings('org.gnome.shell.extensions.transparency-panel');

        const page = new Adw.PreferencesPage({
            title: _('Appearance'),
        });
        
        const group = new Adw.PreferencesGroup({
            title: _('Top Bar Style'),
            description: _('Configure the appearance of the top bar')
        });

        // Panel Opacity slider
        const panelOpacity = new Gtk.Scale({
            orientation: Gtk.Orientation.HORIZONTAL,
            adjustment: new Gtk.Adjustment({
                lower: 0,
                upper: 100,
                step_increment: 1,
            }),
            digits: 0,
            draw_value: true,
            value_pos: Gtk.PositionType.RIGHT,
            hexpand: true,
        });
        
        panelOpacity.set_value(settings.get_int('panel-opacity'));
        panelOpacity.connect('value-changed', () => {
            settings.set_int('panel-opacity', panelOpacity.get_value());
        });
        
        group.add(buildRow(_('Panel Opacity'), panelOpacity));

        // Añadir más configuraciones aquí en el futuro
        // Por ejemplo, para un selector de color:
        /*
        const colorButton = new Gtk.ColorButton();
        
        // Convertir string de color a objeto GdkRGBA
        const colorString = settings.get_string('panel-color');
        const rgba = new Gdk.RGBA();
        rgba.parse(colorString);
        colorButton.set_rgba(rgba);
        
        colorButton.connect('color-set', () => {
            const color = colorButton.get_rgba().to_string();
            settings.set_string('panel-color', color);
        });
        
        group.add(buildRow(_('Panel Color'), colorButton));
        */

        page.add(group);
        window.add(page);
    }
}

function buildRow(title, widget) {
    const row = new Adw.ActionRow({ title });
    row.add_suffix(widget);
    widget.set_hexpand(true);
    return row;
}

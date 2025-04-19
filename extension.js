import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import St from 'gi://St';

export default class TransparencyExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._settings = null;
        this._settingsChangedId = null;
        this._styleChangedTimeoutId = null;
        this._overviewShowingId = null;
        this._overviewHidingId = null;
        this._panelStyleOriginal = null;
    }

    enable() {
        this._settings = this.getSettings('org.gnome.shell.extensions.transparency-panel');
        
        // Conectar la señal de cambio de configuraciones
        this._settingsChangedId = this._settings.connect('changed', this._onSettingsChanged.bind(this));
        
        // Conectar señales para detectar cambios en el Overview
        this._overviewShowingId = Main.overview.connect('showing', this._onOverviewShowing.bind(this));
        this._overviewHidingId = Main.overview.connect('hiding', this._onOverviewHiding.bind(this));
        
        // Aplicar estilos iniciales
        this._applyStyles();
    }

    disable() {
        // Desconectar la señal de cambio de configuraciones
        if (this._settingsChangedId) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsChangedId = null;
        }
        
        // Desconectar señales del Overview
        if (this._overviewShowingId) {
            Main.overview.disconnect(this._overviewShowingId);
            this._overviewShowingId = null;
        }
        
        if (this._overviewHidingId) {
            Main.overview.disconnect(this._overviewHidingId);
            this._overviewHidingId = null;
        }
        
        // Eliminar cualquier timeout pendiente
        if (this._styleChangedTimeoutId) {
            GLib.source_remove(this._styleChangedTimeoutId);
            this._styleChangedTimeoutId = null;
        }
        
        // Eliminar estilos personalizados
        this._removeCustomStyles();
        
        this._settings = null;
    }

    _onSettingsChanged(settings, key) {
        // Evitar múltiples actualizaciones rápidas estableciendo un pequeño timeout
        if (this._styleChangedTimeoutId) {
            GLib.source_remove(this._styleChangedTimeoutId);
        }
        
        this._styleChangedTimeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => {
            this._applyStyles();
            this._styleChangedTimeoutId = null;
            return GLib.SOURCE_REMOVE;
        });
    }

    _onOverviewShowing() {
        // Guardar el estilo actual para restaurarlo después
        this._panelStyleOriginal = Main.panel.style;
    }

    _onOverviewHiding() {
        // Reaplica los estilos cuando se sale del Overview
        GLib.timeout_add(GLib.PRIORITY_DEFAULT, 100, () => {
            this._applyStyles();
            return GLib.SOURCE_REMOVE;
        });
    }

    _applyStyles() {
        // Aplicar clase CSS para estilos estáticos
        Main.panel.add_style_class_name('CSSstylePanel');
        
        const addStyleClass = Main.panel.statusArea.quickSettings;
        if (addStyleClass) {
            addStyleClass.menu.actor.add_style_class_name('CSSstylePanel-qs');
        }
        
        // No aplicar opacidad personalizada si estamos en el Overview
        if (Main.overview.visible) {
            return;
        }
        
        // Obtener valor de opacidad del panel de configuración (0-100)
        const panelOpacity = this._settings.get_int('panel-opacity');
        
        // Convertir a formato CSS (0-1)
        const opacityValue = panelOpacity / 100;
        
        // Crear un estilo CSS dinámico para el panel
        const panelStyle = `background-color: rgba(50, 50, 50, ${opacityValue});`;
        
        // Aplicar el estilo directamente
        Main.panel.style = panelStyle;
        
        // Configurar un timeout para asegurar que el estilo se mantiene
        // Esto ayuda a evitar que GNOME Shell sobreescriba nuestro estilo
        GLib.timeout_add(GLib.PRIORITY_DEFAULT, 200, () => {
            if (!Main.overview.visible && Main.panel.style !== panelStyle) {
                Main.panel.style = panelStyle;
            }
            return GLib.SOURCE_REMOVE;
        });
    }

    _removeCustomStyles() {
        Main.panel.remove_style_class_name('CSSstylePanel');
        
        const addStyleClass = Main.panel.statusArea.quickSettings;
        if (addStyleClass) {
            addStyleClass.menu.actor.remove_style_class_name('CSSstylePanel-qs');
        }
        
        // Eliminar estilos dinámicos
        Main.panel.style = null;
    }
}
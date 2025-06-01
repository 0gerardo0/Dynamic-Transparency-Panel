# Dynamic Transparency Panel

[![GNOME Shell Versions](https://img.shields.io/badge/GNOME%20Shell-45%2C46%2C47%2C48-brightgreen)](#)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**Dynamic Transparency Panel** es una extensión para GNOME Shell que permite ajustar dinámicamente la transparencia (opacidad) del panel superior (top bar) y del modo Overview, gracias a GSettings y una interfaz de preferencias simple.  

---

## 📌 Descripción

Esta extensión:
- Aplica estilos CSS personalizados al **panel superior** (top bar) y al menú de Quick Settings.
- Permite al usuario modificar “en tiempo real” la **opacidad** del panel normal y la **opacidad** del panel en **Overview**, mediante sliders en la ventana de preferencias.
---

## 🎯 Características

1. **Transparencia Dinámica (Panel Normal)**  
   - Un slider en las Preferencias que controla la opacidad del panel superior cuando estás en cualquier aplicación (modo “normal”).  
   - Rango de opacidad: 0% (completamente transparente) a 100% (completamente opaco).

2. **Transparencia Dinámica (Overview)**  
   - Un slider independiente que controla la opacidad del panel cuando entras al modo Overview.  

3. **Estilos CSS Adicionales**  
   - Sombras y colores de botones (panel buttons, reloj, Quick Settings, menús popup) personalizados para que encajen con el tema de transparencia.
   - Dos clases CSS principales:
     - `.CSSstylePanel` para el panel normal.
     - `.CSSstylePanel-overview` para el modo Overview.

---

## 🚀 Instalación

1. **Clonar el repositorio** 
   ```bash
   git clone https://github.com/0gerardo0/dynamic-transparency-panel.git ~/.local/share/gnome-shell/extensions/

---
## Roadmap / Funcionalidades Futuras

Selector de color (Panel Color)
    - Permitir al usuario escoger un color de fondo distinto a rgba(50,50,50,…).
    - Agregar en el schema la clave panel-color (s) y un Gtk.ColorButton en prefs.js.

Control de sombra (Box Shadow)
    - Exponer claves panel-shadow-color (s) y panel-shadow-opacity (d) para ajustar la sombra del panel.
    - Inyectar dinámicamente el CSS correspondiente.
Soporte para más componentes
    - Transparencia en las ventanas de notificación, quicksettings-popup, popup-menus, etc., con sliders adicionales.
    - Posibilidad de habilitar “blur” (difuminado) si se integra con módulos como KWin blur (en Wayland).

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un bug o tienes una sugerencia, por favor:

    Abre un “Issue” describiendo tu propuesta o problema.

    Crea un “Pull Request” señalando claramente qué cambios introduces.

    Sigue el estilo de código (GJS / JavaScript) y respeta los nombres de clase y convenciones actuales.

Antes de proponer una nueva funcionalidad, abre primero un Issue para discutir su factibilidad.

## Licencia

Este proyecto está licenciado bajo GNU GPL v3 License. Consulta el archivo [`LICENSE`](https://github.com/0gerardo0/master/LICENSE) para más detalles.

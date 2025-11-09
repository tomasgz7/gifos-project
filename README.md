# GIFOS  

![HTML](https://img.shields.io/badge/HTML5-E34F26.svg?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6.svg?logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-Giphy-purple?logo=giphy)
![LocalStorage](https://img.shields.io/badge/LocalStorage-Enabled-blue)
![RecordRTC](https://img.shields.io/badge/RecordRTC-Implemented-orange)
![MediaDevices](https://img.shields.io/badge/MediaDevices-getUserMedia-success)
![Estado](https://img.shields.io/badge/Estado-Finalizado-green)
![Versión](https://img.shields.io/badge/Versión-1.0-lightgrey)
![Código](https://img.shields.io/badge/100%25%20código%20real-No%20frameworks-success)

---

## 🧾 Proyecto

Desarrollo web correspondiente al **Segundo Parcial de Seminario de Actualización en Tecnología Web (IFTS Nº21)**.  
El trabajo consiste en una aplicación web capaz de **buscar, grabar, subir y almacenar GIFs** utilizando la **API pública de Giphy**, aplicando conceptos de **JavaScript nativo**, manipulación del **DOM**, y uso de **APIs multimedia** del navegador.

---

## ✅ Checklist — Requisitos cumplidos

1. **Barra de navegación funcional** con acceso a secciones y cambio de tema.  
2. **Temas visuales implementados** (modo Día y modo Noche).  
3. **HTML semántico**, estructura ordenada y separación de responsabilidades (HTML / CSS / JS).  
4. **Manipulación dinámica del DOM** en todas las vistas.  
5. **Búsqueda funcional** con peticiones `GET` a la API de Giphy.  
6. **Sugerencias automáticas** y hashtags dinámicos al escribir.  
7. **Tendencias actualizadas** desde el endpoint `trending`.  
8. **Captura de cámara** mediante `navigator.mediaDevices.getUserMedia()`.  
9. **Grabación de GIFs** usando la librería `RecordRTC.js`.  
10. **Subida de archivos** a la API mediante método `POST`.  
11. **Almacenamiento local** de los GIFs creados con `LocalStorage`.  
12. **Galería dinámica “Mis GIFOS”** renderizada desde almacenamiento local.  
13. **Diseño fiel al modelo original**, con estilos y estructura responsive.  
14. **Timer y barra de progreso** implementados durante la subida (opcional).  

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Uso principal |
|-------------|----------------|
| **HTML5** | Estructura semántica y etiquetas accesibles |
| **CSS3** | Estilos, responsive design y temas visuales |
| **JavaScript (ES6+)** | Lógica de interacción y manejo del DOM |
| **Fetch API** | Consumo de endpoints de Giphy |
| **Async / Await** | Flujo asincrónico de peticiones |
| **MediaDevices API** | Acceso a cámara y captura de video |
| **RecordRTC.js** | Conversión de video a GIF |
| **LocalStorage API** | Persistencia de datos local |
| **Web APIs** | Manipulación de medios y almacenamiento |

---

## 🧩 Funcionalidades implementadas

| Nº | Funcionalidad | Descripción |
|----|----------------|-------------|
| 1️⃣ | **Cambio de tema** | Alterna entre modo Día y Noche y guarda la preferencia en LocalStorage |
| 2️⃣ | **Búsqueda de GIFs** | Consulta la API de Giphy en tiempo real según el texto ingresado |
| 3️⃣ | **Sugerencias dinámicas** | Autocompleta términos y hashtags populares |
| 4️⃣ | **Tendencias** | Muestra GIFs más buscados mediante el endpoint `trending` |
| 5️⃣ | **Grabación de cámara** | Captura video desde el dispositivo del usuario |
| 6️⃣ | **Creación de GIF** | Convierte la grabación en formato GIF usando RecordRTC |
| 7️⃣ | **Subida a Giphy** | Envía el GIF mediante método `POST` y muestra barra de progreso |
| 8️⃣ | **Mis GIFOS** | Galería local que guarda los GIFs creados con LocalStorage |
| 9️⃣ | **Responsive design** | Adaptación a pantallas pequeñas mediante media queries |

---


---

## 📌 Información técnica

- **API usada:** [Giphy Developers](https://developers.giphy.com/)  
- **Endpoint principal:** `https://api.giphy.com/v1/gifs`  
- **Librería externa:** `RecordRTC.js`  
- **Almacenamiento:** `LocalStorage`  
- **Compatibilidad:** Chrome / Edge / Firefox  
- **Resolución recomendada:** ≥ 1280x720  

---

## 📄 Estado del proyecto

**Estado actual:** Finalizado  
**Versión:** 1.0  
**Entrega:** Segundo Parcial — IFTS Nº21  


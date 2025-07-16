# 📧 Formulario de Envío de Emails

Este es un **proyecto** realizado durante un curso de JavaScript moderno.  
Consiste en un formulario web para el envío de correos electrónicos, implementado con **JavaScript funcional**, sin uso de clases.

El proyecto se enfoca en la **validación de formularios**, el manejo del **DOM en tiempo real** y la mejora de la experiencia del usuario mediante **feedback visual**.

---

## ✨ Funcionalidades principales

- Validación en tiempo real de los campos obligatorios:
  - **Email**
  - **Asunto**
  - **Mensaje**
- Verificación del formato de email válido (con expresiones regulares).
- Despliegue de **alertas personalizadas** si los campos están incompletos o el email no es válido.
- El botón "Enviar" se **activa solo cuando el formulario está completo y válido**.
- Al enviar:
  - Se muestra un **spinner** de carga.
  - Luego, aparece un **mensaje de envío exitoso**.
  - El formulario se **limpia automáticamente**.
  - El botón vuelve a quedar deshabilitado.

---

## 💡 Mejora personal implementada (reto del curso)

Se añadió un campo **CC (con copia)**:

- El campo es opcional.
- Si está vacío, el formulario puede enviarse normalmente.
- Si se completa, se valida que sea un email válido.
- Si el email del campo CC no es válido, se muestra una alerta y no se permite el envío.

---

## 🛠️ Tecnologías utilizadas

- **HTML5**: estructura base del formulario.
- **CSS3**: estilos visuales.
- **JavaScript (ES6)**: validaciones, manejo del DOM, lógica de control.
- **Sin uso de clases**: toda la lógica fue desarrollada usando funciones y control directo del DOM.

---

## 🚀 Cómo probar el proyecto

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/LucreciaVeron/Proyecto-EnviarEmail.git

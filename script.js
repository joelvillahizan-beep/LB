document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar todos los radio buttons que actúan como interruptores (Sí/No)
    const areaToggles = document.querySelectorAll('.area-toggle');

    areaToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            // Obtener el ID del contenedor de detalles asociado a este radio button
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            // Si el usuario selecciona "sí", mostrar el contenedor quitando la clase 'hidden'
            // Si selecciona "no", ocultar el contenedor añadiendo la clase 'hidden'
            if (this.value === 'si') {
                targetElement.classList.remove('hidden');
                // Añadir atributo 'required' al textarea correspondiente si se desea obligatoriedad
                targetElement.querySelector('textarea').setAttribute('required', 'true');
            } else {
                targetElement.classList.add('hidden');
                // Quitar atributo 'required' y limpiar el valor si el usuario se arrepiente
                const textarea = targetElement.querySelector('textarea');
                textarea.removeAttribute('required');
                textarea.value = '';
            }
        });
    });
});
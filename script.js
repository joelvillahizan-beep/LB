// 1. GESTIÓN DE VISIBILIDAD DE ÁREAS
function toggleArea(areaId) {
    const fields = document.getElementById(`fields-${areaId}`);
    const card = document.getElementById(`card-${areaId}`);
    const checkbox = document.getElementById(`check-${areaId}`);

    if (checkbox.checked) {
        fields.classList.remove('hidden');
        card.classList.add('active');
    } else {
        fields.classList.add('hidden');
        card.classList.remove('active');
        // Opcional: limpiar los inputs al cerrar
        const inputs = fields.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    }
}

// 2. ENVÍO DE FORMULARIO A FORMSPREE SIN RECARGAR
const form = document.getElementById("questForm");
const status = document.getElementById("form-status");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que la página salte a Formspree
    
    const data = new FormData(event.target);
    
    // Feedback visual inmediato
    submitBtn.innerText = "Enviando datos...";
    submitBtn.disabled = true;

    // Petición AJAX
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // ÉXITO
            status.innerHTML = "✅ ¡Los datos se han guardado con éxito!";
            status.style.color = "#16a34a";
            form.reset(); // Vacía el formulario
            
            // Cerramos las áreas abiertas visualmente
            document.querySelectorAll('.area-fields').forEach(f => f.classList.add('hidden'));
            document.querySelectorAll('.area-card').forEach(c => c.classList.remove('active'));
            
        } else {
            // ERROR
            status.innerHTML = "❌ Error al enviar. Asegúrate de haber confirmado tu email en Formspree.";
            status.style.color = "#dc2626";
        }
    }).catch(error => {
        // ERROR DE CONEXIÓN
        status.innerHTML = "❌ Problema de conexión. Inténtalo más tarde.";
        status.style.color = "#dc2626";
    }).finally(() => {
        // Restaurar botón
        submitBtn.innerText = "Enviar Datos al Informe";
        submitBtn.disabled = false;
    });
});
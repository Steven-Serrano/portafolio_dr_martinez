/* =========================================================
   CITAS.JS - Lógica del Agendamiento
   ========================================================= */

let currentStep = 1;

// Navegación entre pasos
function nextStep(step) {
    // Validaciones simples antes de avanzar
    if (currentStep === 1) {
        const selected = document.querySelector('input[name="especialidad"]:checked');
        if (!selected) {
            alert('Por favor selecciona un tipo de consulta.');
            return;
        }
    }
    
    if (currentStep === 2) {
        const fecha = document.getElementById('citaFecha').value;
        const hora = document.querySelector('.time-slot.selected');
        if (!fecha || !hora) {
            alert('Por favor selecciona fecha y hora.');
            return;
        }
    }

    if (currentStep === 3) {
        const nombre = document.getElementById('pacienteNombre').value;
        const tel = document.getElementById('pacienteTel').value;
        const email = document.getElementById('pacienteEmail').value;
        if (!nombre || !tel || !email) {
            alert('Por favor completa los datos obligatorios.');
            return;
        }
    }

    goToStep(step);
}

function prevStep(step) {
    goToStep(step);
}

function goToStep(step) {
    // Ocultar todos los contenidos
    document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
    
    // Mostrar el nuevo
    document.getElementById(`step-${step}`).classList.add('active');
    
    // Actualizar indicador
    document.querySelectorAll('.step-item').forEach((item, index) => {
        const stepNum = index + 1;
        item.classList.remove('active', 'completed');
        if (stepNum === step) {
            item.classList.add('active');
        } else if (stepNum < step) {
            item.classList.add('completed');
        }
    });

    currentStep = step;
}

// Selección de hora
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function() {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Configurar fecha mínima (hoy)
document.addEventListener('DOMContentLoaded', () => {
    const fechaInput = document.getElementById('citaFecha');
    if (fechaInput) {
        const today = new Date().toISOString().split('T')[0];
        fechaInput.setAttribute('min', today);
    }
});

// Simular envío
function enviarCita() {
    const nombre = document.getElementById('pacienteNombre').value;
    const tel = document.getElementById('pacienteTel').value;
    
    // Ocultar paso 3 y mostrar éxito
    document.getElementById('step-3').classList.remove('active');
    document.getElementById('step-success').style.display = 'block';
    document.getElementById('confirmTel').textContent = tel;
    
    // Marcar todos los pasos como completados
    document.querySelectorAll('.step-item').forEach(item => {
        item.classList.add('completed');
        item.classList.remove('active');
    });
}
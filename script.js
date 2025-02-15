document.addEventListener('DOMContentLoaded', () => {
    const inputTarea = document.getElementById('tarea');
    const botonAgregarTarea = document.getElementById('botonAgregarTarea');
    const listaTareas = document.getElementById('listaTareas');

    function cargarTareas() {
        const tareasGuardadas = localStorage.getItem('tareas');
        if (tareasGuardadas) {
            tareasGuardadas.split(',').forEach(tarea => {
                const [tareaTexto, marcada] = tarea.split('|');
                crearTarea(tareaTexto, marcada === 'true');
            });
        }
    }

    function agregarTarea() {
        const nuevaTarea = inputTarea.value.trim();
        if (nuevaTarea) {
            crearTarea(nuevaTarea);
            guardarTarea(nuevaTarea);
            inputTarea.value = '';
            inputTarea.placeholder = 'Ingrese producto';
        } else {
            alert('Por favor, ingresa un producto válido.');
        }
    }

    function crearTarea(tareaTexto, marcada = false) {
        const tareaCreada = document.createElement('li');
        tareaCreada.textContent = tareaTexto;
        tareaCreada.classList.add('tareaCreada');

        const botonMarcar = document.createElement('button');
        botonMarcar.textContent = '✓';
        botonMarcar.classList.add(marcada ? 'botonMarcado' : 'botonDesmarcado');
        botonMarcar.addEventListener('click', () => {
            botonMarcar.classList.toggle('botonMarcado');
            botonMarcar.classList.toggle('botonDesmarcado');
            actualizarTareaEnLocalStorage(tareaTexto, botonMarcar.classList.contains('botonMarcado'));
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.classList.add('botonEliminar');
        botonEliminar.addEventListener('click', () => {
            tareaCreada.remove();
            eliminarTareaDeLocalStorage(tareaTexto);
        });

        const divBotones = document.createElement('div');
        divBotones.append(botonMarcar, botonEliminar);
        
        tareaCreada.appendChild(divBotones);
        listaTareas.appendChild(tareaCreada);
    }

    function guardarTarea(tareaTexto) {
        const tareasGuardadas = localStorage.getItem('tareas');
        const listaTareas = tareasGuardadas ? tareasGuardadas.split(',') : [];
        listaTareas.push(`${tareaTexto}|false`);
        localStorage.setItem('tareas', listaTareas.join(','));
    }

    function actualizarTareaEnLocalStorage(tareaTexto, marcada) {
        const tareasGuardadas = localStorage.getItem('tareas');
        if (tareasGuardadas) {
            const listaTareas = tareasGuardadas.split(',').map(tarea => {
                const [texto, estado] = tarea.split('|');
                return texto === tareaTexto ? `${texto}|${marcada}` : tarea;
            });
            localStorage.setItem('tareas', listaTareas.join(','));
        }
    }

    function eliminarTareaDeLocalStorage(tareaTexto) {
        const tareasGuardadas = localStorage.getItem('tareas');
        if (tareasGuardadas) {
            const listaTareas = tareasGuardadas.split(',').filter(tarea => {
                const [texto] = tarea.split('|');
                return texto !== tareaTexto;
            });
            localStorage.setItem('tareas', listaTareas.join(','));
        }
    }

    cargarTareas();
    inputTarea.focus();
    botonAgregarTarea.addEventListener('click', agregarTarea);
    inputTarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            agregarTarea();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const inputProducto = document.getElementById('producto');
    const botonAgregarProducto = document.getElementById('botonAgregarProducto');
    const listaProductos = document.getElementById('listaProductos');

    function cargarProducto() {
        const productosGuardados = localStorage.getItem('productos_listadecompras'); // Cambiado
        if (productosGuardados) {
            productosGuardados.split(',').forEach(producto => {
                const [productoTexto, marcado] = producto.split('|');
                crearProducto(productoTexto, marcado === 'true');
            });
        }
    }

    function agregarProducto() {
        const nuevoProducto = inputProducto.value.trim();
        if (nuevoProducto) {
            crearProducto(nuevoProducto);
            guardarProducto(nuevoProducto);
            inputProducto.value = '';
            inputProducto.placeholder = 'Otro producto';
        } else {
            alert('Por favor, ingresa un producto válido.');
        }
        inputProducto.focus();
    }

    function crearProducto(productoTexto, marcado = false) {
        const productoCreado = document.createElement('li');
        productoCreado.textContent = productoTexto;
        productoCreado.classList.add('productoCreado');

        const botonMarcar = document.createElement('button');
        botonMarcar.textContent = '✓';
        botonMarcar.classList.add(marcado ? 'botonMarcado' : 'botonDesmarcado');
        botonMarcar.addEventListener('click', () => {
            botonMarcar.classList.toggle('botonMarcado');
            botonMarcar.classList.toggle('botonDesmarcado');
            actualizarProductoEnLocalStorage(productoTexto, botonMarcar.classList.contains('botonMarcado'));
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.classList.add('botonEliminar');
        botonEliminar.addEventListener('click', () => {
            productoCreado.remove();
            eliminarProductoDeLocalStorage(productoTexto);
        });

        const divBotones = document.createElement('div');
        divBotones.append(botonMarcar, botonEliminar);
        
        productoCreado.appendChild(divBotones);
        listaProductos.appendChild(productoCreado);
    }

    function guardarProducto(productoTexto) {
        const productosGuardados = localStorage.getItem('productos_listadecompras'); // Cambiado
        const listaProductos = productosGuardados ? productosGuardados.split(',') : [];
        listaProductos.push(`${productoTexto}|false`);
        localStorage.setItem('productos_listadecompras', listaProductos.join(',')); // Cambiado
    }

    function actualizarProductoEnLocalStorage(productoTexto, marcado) {
        const productosGuardados = localStorage.getItem('productos_listadecompras'); // Cambiado
        if (productosGuardados) {
            const listaProductos = productosGuardados.split(',').map(producto => {
                const [texto, estado] = producto.split('|');
                return texto === productoTexto ? `${texto}|${marcado}` : producto;
            });
            localStorage.setItem('productos_listadecompras', listaProductos.join(',')); // Cambiado
        };
    };

    function eliminarProductoDeLocalStorage(productoTexto) {
        const productosGuardados = localStorage.getItem('productos_listadecompras'); // Cambiado
        if (productosGuardados) {
            const listaProductos = productosGuardados.split(',').filter(producto => {
                const [texto] = producto.split('|');
                return texto !== productoTexto;
            });
            localStorage.setItem('productos_listadecompras', listaProductos.join(',')); // Cambiado
        };
    };

    cargarProducto();
    inputProducto.focus();
    botonAgregarProducto.addEventListener('click', agregarProducto);
    inputProducto.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            agregarProducto();
        }
    });
});

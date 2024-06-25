document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: 1, nombre: "Baúl Central Rigido Aluminio", categoria: "Baules", precio: 150000, imagen: "../media/baul1.jpg", destacado: true },
        { id: 2, nombre: "Mochila Tanque", categoria: "Baules", precio: 21000, imagen: "../media/baul2.png", destacado: false },
        { id: 3, nombre: "Baúles Laterales Rigidos Aluminio", categoria: "Baules", precio: 200000, imagen: "../media/baul3.avif", destacado: false },
        { id: 4, nombre: "Baules Laterales lona", categoria: "Baules", precio: 75000, imagen: "../media/baul4.png", destacado: true },
        { id: 5, nombre: "Alforjas de Cuero Dobles", categoria: "Baules", precio: 95000, imagen: "../media/baul5.png", destacado: false },
        { id: 6, nombre: "Baules Laterales de PVC", categoria: "Baules", precio: 65000, imagen: "../media/baul6.png", destacado: true },
        { id: 7, nombre: "CarPlay Auto/Moto", categoria: "pantallas", precio: 210000, imagen: "../media/carplay1.png", destacado: true },
        { id: 8, nombre: "CarPlay Haaiah", categoria: "pantallas", precio: 175000, imagen: "../media/carplay2.png", destacado: false },
        { id: 9, nombre: "Carplay Multiplataforma", categoria: "pantallas", precio: 150000, imagen: "../media/carplay3.png", destacado: false },
        { id: 10, nombre: "CarPlay con visor de sol", categoria: "pantallas", precio: 141000, imagen: "../media/carplay4.png", destacado: true },
        { id: 11, nombre: "CarPlay Haaiah v2", categoria: "pantallas", precio: 247000, imagen: "../media/carplay5.png", destacado: false },
        { id: 12, nombre: "Haaiah 7,2 inch", categoria: "pantallas", precio: 305000, imagen: "../media/carplay6.png", destacado: true },
        { id: 13, nombre: "Intercomunicador inalambrico bluetooth", categoria: "intercomunicadores", precio: 70000, imagen: "../media/intercom1.png", destacado: true },
        { id: 14, nombre: "Intercomunicador Q7 Pro bluetooth", categoria: "intercomunicadores", precio: 75000, imagen: "../media/intercom2.png", destacado: false },
        { id: 15, nombre: "Intercomunicador Ejeas Q2 Pro", categoria: "intercomunicadores", precio: 80000, imagen: "../media/intercom3.png", destacado: false },
        { id: 16, nombre: "Intercomunicador Ejeas V4 Plus", categoria: "intercomunicadores", precio: 85000, imagen: "../media/intercom4.png", destacado: true },
        { id: 17, nombre: "Intercomunicador Kit x 2 Gadnic G600", categoria: "intercomunicadores", precio: 90000, imagen: "../media/intercom5.png", destacado: false },
        { id: 18, nombre: "Intercomunicador Gadnic G600", categoria: "intercomunicadores", precio: 95000, imagen: "../media/intercom6.png", destacado: true },
        { id: 19, nombre: "Armadura exterior", categoria: "camperas", precio: 100000, imagen: "../media/campera1.png", destacado: true },
        { id: 20, nombre: "Campera multiproposito", categoria: "camperas", precio: 105000, imagen: "../media/campera2.png", destacado: false },
        { id: 21, nombre: "Leñador con protecciones", categoria: "camperas", precio: 110000, imagen: "../media/campera3.png", destacado: false },
        { id: 22, nombre: "Mono de competición", categoria: "camperas", precio: 115000, imagen: "../media/campera4.png", destacado: true },
        { id: 23, nombre: "Campera Pro V5", categoria: "camperas", precio: 120000, imagen: "../media/campera5.png", destacado: false },
        { id: 24, nombre: "Campera cuero ", categoria: "camperas", precio: 125000, imagen: "../media/campera6.png", destacado: true }
    ];

    const contenedorCarrusel = document.querySelector('.carousel');
    const grillaProductos = document.getElementById('productGrid');
    const filtroCategoria = document.getElementById('categoryFilter');
    const filtroPrecio = document.getElementById('priceFilter');

    function crearTarjetaProducto(producto) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'product-card';
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h5>${producto.nombre}</h5> 
            <p class="price">$${producto.precio}</p>
            <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        return tarjeta;
    }

    function cargarProductosDestacados() {
        const productosDestacados = productos.filter(producto => producto.destacado);
        productosDestacados.forEach(producto => {
            const tarjeta = crearTarjetaProducto(producto);
            contenedorCarrusel.appendChild(tarjeta);
        });
    }

    function cargarTodosLosProductos(productosFiltrados = productos) {
        grillaProductos.innerHTML = '';
        productosFiltrados.forEach(producto => {
            const tarjeta = crearTarjetaProducto(producto);
            grillaProductos.appendChild(tarjeta);
        });
    }

    function filtrarProductos() {
        const categoria = filtroCategoria.value;
        const ordenPrecio = filtroPrecio.value;

        let productosFiltrados = productos;

        if (categoria !== 'all') {
            productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoria);
        }

        if (ordenPrecio === 'asc') {
            productosFiltrados.sort((a, b) => a.precio - b.precio);
        } else if (ordenPrecio === 'desc') {
            productosFiltrados.sort((a, b) => b.precio - a.precio);
        }

        cargarTodosLosProductos(productosFiltrados);
    }

    function inicializarCarrusel() {
        const btnIzquierda = document.querySelector('.left-btn');
        const btnDerecha = document.querySelector('.right-btn');
        let posicionScroll = 0;

        btnIzquierda.addEventListener('click', () => {
            posicionScroll -= 300; 
            if (posicionScroll < 0) {
                posicionScroll = 0;
            }
            contenedorCarrusel.scrollTo({ left: posicionScroll, behavior: 'smooth' });
        });

        btnDerecha.addEventListener('click', () => {
            posicionScroll += 300; 
            if (posicionScroll > contenedorCarrusel.scrollWidth - contenedorCarrusel.clientWidth) {
                posicionScroll = contenedorCarrusel.scrollWidth - contenedorCarrusel.clientWidth;
            }
            contenedorCarrusel.scrollTo({ left: posicionScroll, behavior: 'smooth' });
        });
    }

    window.agregarAlCarrito = function(productId) {
        const producto = productos.find(p => p.id === productId);
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const indiceExistente = carrito.findIndex(p => p.id === productId);
        if (indiceExistente > -1) {
            carrito[indiceExistente].cantidad += 1;
        } else {
            producto.cantidad = 1;
            carrito.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));

        Swal.fire({
            title: 'Producto agregado',
            text: `El producto ${producto.nombre} ha sido agregado al carrito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    };

    document.getElementById('categoryFilter').addEventListener('change', filtrarProductos);
    document.getElementById('priceFilter').addEventListener('change', filtrarProductos);

    cargarProductosDestacados();
    cargarTodosLosProductos();
    inicializarCarrusel();
});

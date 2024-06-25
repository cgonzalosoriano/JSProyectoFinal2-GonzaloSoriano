function calcularTotal() {
    const precioBase = parseFloat(document.getElementById('precioBase').textContent);
    const costoEnvio = parseFloat(document.getElementById('envio').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);
    const tasaInteresAnual = 0.60;
    
    if (isNaN(cuotas) || cuotas <= 0) {
        alert("Por favor, introduce un número válido de cuotas.");
        return;
    }

    const costoTotal = precioBase + costoEnvio;
    const tasaInteresMensual = tasaInteresAnual / 12;
    const montoCuota = (costoTotal * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -cuotas));
    
    let resultados = document.getElementById('resultados');
    resultados.innerHTML = `<h3>Detalle de Pago</h3>`;
    let saldo = costoTotal;
    
    for (let i = 1; i <= cuotas; i++) {
        let interes = saldo * tasaInteresMensual;
        let principal = montoCuota - interes;
        saldo -= principal;
        resultados.innerHTML += `Cuota ${i}: $${montoCuota.toFixed(2)} (Principal: $${principal.toFixed(2)}, Interés: $${interes.toFixed(2)})<br>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function() {
            const producto = {
                nombre: this.getAttribute('data-nombre'),
                precio: parseFloat(this.getAttribute('data-precio')),
                imagen: this.getAttribute('data-imagen'),
                cantidad: 1
            };
            agregarAlCarrito(producto);
        });
    });
});

function agregarAlCarrito(productoNuevo) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const indiceExistente = carrito.findIndex(prod => prod.nombre === productoNuevo.nombre);

    if (indiceExistente > -1) {
        carrito[indiceExistente].cantidad++;
    } else {
        carrito.push(productoNuevo);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));

 
    Swal.fire({
        title: 'Producto agregado',
        text: `El producto ${productoNuevo.nombre} ha sido agregado al carrito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

// Datos del localStorage:
const registroComprasGuardado = localStorage.getItem('registroCompras');

let registroCompraLocalStorage = [];

if (registroComprasGuardado) {
    // Convertir la cadena JSON de registroCompras a un arreglo
    registroCompraLocalStorage = JSON.parse(registroComprasGuardado);
}

const compraPlanta = {
    plantaSeleccionada: '',
    cantidad: 0,
    precioUnitario: 0,
    total: 0
};

if (registroComprasGuardado) {
   // Convertir la cadena JSON de registroCompras a un arreglo
   registroCompras = JSON.parse(registroComprasGuardado);
}

function mostrarMensajeEnDiv(mensaje) {
    const mensajeDiv = document.getElementById('mensajeDiv');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.display = 'block'; // Mostrar el div
}

function obtenerNivelCuidadoYRecomendacion() {
    const nivelCuidadoSelect = document.getElementById('nivelCuidadoSelect');
    const recomendacion = document.getElementById('recomendacion');

    const nivelCuidado = nivelCuidadoSelect.value;
    const recomendacionTexto = obtenerRecomendacion(nivelCuidado);

    recomendacion.textContent = recomendacionTexto;
    console.log(`Nivel de cuidado consultado: ${nivelCuidado}`);
    console.log(`Recomendación: ${recomendacionTexto}`);
}


function obtenerRecomendacion(nivelCuidado) {
    const recomendacion = nivelesCuidadoCliente.find(nivel => nivel.nivel.toLowerCase() === nivelCuidado.toLowerCase());

    if (recomendacion) {
        return recomendacion.recomendacion;
    } else {
        return 'Nivel de cuidado no válido. Por favor, elija entre Bajo, Medio o Alto.';
    }
}

function obtenerPlantaSeleccionada() {
    const plantaSelect = document.getElementById('plantaSelect');
    const plantaValue = plantaSelect.value;

    if (plantaValue === "venus" || plantaValue === "drosera" || plantaValue === "nepenthes") {
        return plantaValue; 
    } else {
        mostrarMensajeEnDiv('Dato inválido. Por favor, seleccione una planta válida.');
        return obtenerPlantaSeleccionada(); 
    }
}

function obtenerCantidad() {
    const cantidadInput = document.getElementById('cantidadInput');
    const cantidad = parseInt(cantidadInput.value);

    if (!isNaN(cantidad) && cantidad > 0) {
        return cantidad;
    } else {
        mostrarMensaje('Dato inválido. Por favor, ingrese una cantidad válida.');
        return obtenerCantidad(); 
    }
}

// Niveles de cuidado y recomendaciones:
const nivelesCuidadoCliente = [
    { 
        nivel: 'bajo', 
        recomendacion: 'Recomendamos la planta Drosera para un nivel de cuidado bajo. Es importante mantenerla en luz solar directa y el sustrato húmedo pero no encharcado. \nLa Drosera tiene hojas cubiertas de pelos pegajosos que atraen a los insectos. Cuando un insecto se posa en las hojas, queda atrapado en el líquido pegajoso y es digerido por la planta para obtener nutrientes.' 
    },
    { 
        nivel: 'medio', 
        recomendacion: 'Recomendamos la planta Venus para un nivel de cuidado medio. Debe colocarse en luz solar directa y mantener el sustrato húmedo.\nLa Venus es conocida por sus hojas en forma de trampa que atraen y capturan insectos. Estas trampas se cierran cuando un insecto entra en ellas. La planta obtiene nutrientes de los insectos atrapados.' 
    },
    { 
        nivel: 'alto', 
        recomendacion: 'Recomendamos la planta Nepenthes para un nivel de cuidado alto. Debe ubicarse en luz indirecta brillante y mantener el sustrato húmedo.\nLa Nepenthes es una planta con jarros o ascidios en forma de copa que contienen un líquido digestivo. Atrae a los insectos a caer en los jarros y los digiere para obtener nutrientes.' 
    }
];

const mensajesConocimiento = [];

const carrito = [];

// Evento para consultar el nivel de cuidado al hacer click en el botón
const consultarNivelCuidadoButton = document.getElementById('consultarNivelCuidadoButton');
consultarNivelCuidadoButton.addEventListener('click', obtenerNivelCuidadoYRecomendacion);

// Evento para realizar la compra al hacer click en el botón
const realizarCompraButton = document.getElementById('realizarCompraButton');
realizarCompraButton.addEventListener('click', comprarPlantas);

// Plantas y sus precios:
const plantas = [
    { 
        nombre: 'venus', 
        precio: 100.50
    },
    { 
        nombre: 'drosera', 
        precio: 150.75
    },
    { 
        nombre: 'nepenthes', 
        precio: 120.25
    }
];

function comprarPlantas() {
// Obtener el nivel de cuidado seleccionado
const nivelCuidadoSelect = document.getElementById('nivelCuidadoSelect');
const nivelCuidado = nivelCuidadoSelect.value;

// Obtener la planta seleccionada
const plantaSelect = document.getElementById('plantaSelect');
const plantaValue = plantaSelect.value;

// Obtener la cantidad ingresada
const cantidadInput = document.getElementById('cantidadInput');
const cantidad = parseInt(cantidadInput.value);

if (isNaN(cantidad) || cantidad <= 0) {
        mostrarMensajeEnDiv('Dato inválido. Por favor, ingrese una cantidad válida.');
        return;
    }

    // Obtener la planta seleccionada
    const plantaSeleccionada = plantas.find(planta => planta.nombre === plantaValue);

// Calcular el total a pagar
const total = plantaSeleccionada.precio * cantidad;
console.log(`El cliente ha seleccionado ${cantidad} ${plantaSeleccionada.nombre}. Precio unitario: $${plantaSeleccionada.precio}. Total a pagar: $${total.toFixed(2)}`);
if (total > 1000) {
        const descuento = total * 0.1;
        total -= descuento;
        console.log(`Se aplicó un descuento del 10% a la compra del cliente.`);
    }
}
// Función para realizar la compra de una planta específica
function realizarCompra(plantaIndex) {
    const plantaSeleccionada = plantas[plantaIndex];
    const cantidad = parseInt(prompt(`Ingrese la cantidad de ${plantaSeleccionada.nombre} que desea comprar:`));

    if (!isNaN(cantidad) && cantidad > 0) {
        const total = plantaSeleccionada.precio * cantidad;
        mostrarMensaje(`Ha seleccionado ${cantidad} ${plantaSeleccionada.nombre}. Precio unitario: $${plantaSeleccionada.precio}. Total a pagar: $${total.toFixed(2)}`);
        console.log(`El cliente ha seleccionado ${cantidad} ${plantaSeleccionada.nombre}. Precio unitario: $${plantaSeleccionada.precio}. Total a pagar: $${total.toFixed(2)}`);

        if (total > 1000) {
            const descuento = total * 0.1;
            total -= descuento;
            mostrarMensaje(`Se aplicó un descuento del 10% a su compra.`);
            console.log(`Se aplicó un descuento del 10% a la compra del cliente.`);
        }

        // Mostrar el resultado de la compra
        document.getElementById('compraResultado').textContent = `Total a pagar: $${total.toFixed(2)}`;
        console.log(`Total a pagar después de la compra: $${total.toFixed(2)}`);
    } else {
        mostrarMensaje('Dato inválido. Por favor, ingrese una cantidad válida.');
        console.log('El cliente ingresó una cantidad inválida o negativa.');
    }
}

const registroCompra = [];

// Función principal, comprar plantas:
function comprarPlantas() {

    const nivelCuidadoSelect = document.getElementById('nivelCuidadoSelect');
    const nivelCuidado = nivelCuidadoSelect.value;

    const plantaSelect = document.getElementById('plantaSelect');
    const plantaValue = plantaSelect.value;

    const cantidadInput = document.getElementById('cantidadInput');
    const cantidad = parseInt(cantidadInput.value);
    

    if (isNaN(cantidad) || cantidad <= 0) {
        mostrarMensajeEnDiv('Dato inválido. Por favor, ingrese una cantidad válida.');
        return;
    }
const plantaSeleccionada = plantas.find(planta => planta.nombre === plantaValue);

const total = plantaSeleccionada.precio * cantidad;

const compraActual = {
    planta: plantaSeleccionada.nombre,
    cantidad: cantidad,
    precioUnitario: plantaSeleccionada.precio,
    total: total.toFixed(2)
    };

// Agregar la compra actual al registro de compra
    registroCompra.push(compraActual);
// Guardar el registroCompra en el localStorage
    localStorage.setItem('registroCompras', JSON.stringify(registroCompra));

    const compraResultado = document.getElementById('compraResultado');
    compraResultado.textContent = `Ha seleccionado ${cantidad} plantas.`;

    mostrarMensajeEnDiv(`Total a pagar: $${total.toFixed(2)}`);
}

// Función para actualizar el registro de compra en la página
function actualizarRegistroCompra() {
    const registroCompraDiv = document.getElementById('registroCompra');
    
// Limpiar el contenido anterior
    registroCompraDiv.innerHTML = '';

// Mostrar cada compra con un botón de eliminación
    registroCompra.forEach((compra, index) => {
        const compraElemento = document.createElement('div');
        compraElemento.innerHTML = `Compra: ${compra.cantidad} plantas. - Total: $${compra.total}`;
        
// Botón de eliminación
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarCompra(index));
        
        compraElemento.appendChild(botonEliminar);
        
        registroCompraDiv.appendChild(compraElemento);

        console.log(`Compra registrada: ${compra.cantidad} plantas. - Total: $${compra.total}`);
    });
}
// Función para eliminar una compra del registro
function eliminarCompra(index) {

    const totalEliminado = parseFloat(registroCompra[index].total);

    // Eliminar la compra del registro utilizando el índice
    registroCompra.splice(index, 1);

    console.log('Se eliminó una planta del carrito.');

    actualizarRegistroCompra();

    const compraResultado = document.getElementById('compraResultado');
}

// Evento para el botón "Confirmar su Compra"
const confirmarCompraButton = document.getElementById('confirmarCompraButton');
const mensajeAgradecimiento = document.getElementById('mensajeAgradecimiento');

confirmarCompraButton.addEventListener('click', function () {
const totalGastado = registroCompra.reduce((total, compra) => total + parseFloat(compra.total), 0);
console.log(`Total gastado por el cliente: $${totalGastado.toFixed(2)}`);

// Mostrar el mensaje de agradecimiento con el precio total a pagar
    if (totalGastado > 0) {
        mensajeAgradecimiento.style.display = 'block';
        let mensaje = '¡Gracias por su compra!<br><br>';

        if (totalGastado > 1000) {
            // Calculo del descuento
            const descuento = totalGastado * 0.10;
            mensaje += `Usted tiene un descuento del 10% ($${descuento.toFixed(2)}) por comprar más de $1000.<br><br>`;
            console.log(`El cliente recibió un descuento del 10%: $${descuento.toFixed(2)}`);
        }
        mensaje += `<span style="color: #007BFF;">El precio total a pagar es: $${totalGastado.toFixed(2)}.</span>`;
        mensajeAgradecimiento.innerHTML = mensaje;
        registroCompra.length = 0;
        actualizarRegistroCompra();
        console.log(`El cliente realizó una compra con un precio total de: $${totalGastado.toFixed(2)}`);
    }
});

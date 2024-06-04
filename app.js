let historialModelos = [];

// Cargar historial desde localStorage
document.addEventListener('DOMContentLoaded', () => {
    const historialGuardado = localStorage.getItem('historialModelos');
    if (historialGuardado) {
        historialModelos = JSON.parse(historialGuardado);
        mostrarHistorial();
    }
});

// Función para agregar un modelo al historial
const agregarModelo = () => {
    const modeloInput = document.getElementById('modeloInput').value.trim();
    const cantidadInput = parseInt(document.getElementById('cantidadInput').value.trim());

    if (modeloInput === '') {
        alert('Ingrese un modelo válido.');
        return;
    }

    if (isNaN(cantidadInput) || cantidadInput <= 0) {
        alert('Ingrese una cantidad válida.');
        return;
    }

    const modelo = {
        modelo: modeloInput,
        cantidad: cantidadInput,
        fecha: new Date().toLocaleString()
    };

    historialModelos.push(modelo);
    localStorage.setItem('historialModelos', JSON.stringify(historialModelos));
    mostrarHistorial();

    document.getElementById('modeloInput').value = '';
    document.getElementById('cantidadInput').value = '';
}

// Función para mostrar el historial en el HTML
const mostrarHistorial = () => {
    const historialDiv = document.getElementById('historialModelos');
    historialDiv.innerHTML = '<h2>Historial de Modelos</h2><ul>';
    historialModelos.forEach(item => {
        historialDiv.innerHTML += `<li>Modelo: ${item.modelo}, Cantidad: ${item.cantidad} - Fecha: ${item.fecha}</li>`;
    });
    historialDiv.innerHTML += '</ul>';
}

// Función para borrar el historial
const borrarHistorial = () => {
    if (confirm('¿Está seguro de que desea borrar el historial?')) {
        historialModelos = [];
        localStorage.removeItem('historialModelos');
        mostrarHistorial();
    }
}

// Función para exportar el historial a un archivo Excel
const exportarExcel = () => {
    if (historialModelos.length === 0) {
        alert('No hay datos para exportar.');
        return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(historialModelos);
    XLSX.utils.book_append_sheet(wb, ws, 'Historial de Modelos');
    XLSX.writeFile(wb, 'HistorialModelos.xlsx');
}
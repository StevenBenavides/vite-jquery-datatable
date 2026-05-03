import './style.css';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

const API_URL = "https://gist.githubusercontent.com/AnndresRodriguez/a4216e3f82f45fc4514dc954f967fe9a/raw/models.json";

async function cargarDatos() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error('Error al consumir la API');
    }

    const json = await respuesta.json();
    
    const datos = json.marcas;

    new DataTable('#tabla-posts', {
      data: datos,
      columns: [
        { data: 'id', title: 'ID Marca' },
        { data: 'nombre', title: 'Marca' },
        { 
          data: 'modelos', 
          title: 'Modelos disponibles',
          render: function (data) {
            return data.join(', ');
          }
        },
      ],
      pageLength: 5,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          previous: 'Anterior',
          next: 'Siguiente'
        }
      }
    });
  } catch (error) {
    console.error(error);
    document.querySelector('#app').innerHTML += `
      <p class="error">No se pudieron cargar los datos.</p>
    `;
  }
}

cargarDatos();
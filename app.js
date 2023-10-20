const datos = JSON.parse(localStorage.getItem("productos")) || [
  // {
  //   id:"1",
  //   producto: "harina",
  //   vendedor: "abigail",
  //   cantidad: "10",
  //   precio: "300",
  // },
  // {
  //   id:"2",
  //   producto: "caramelos",
  //   vendedor: "belastegui",
  //   cantidad: "4",
  //   precio: "10",
  // },
  // {
  //   id:"3",
  //   producto: "gomitas",
  //   vendedor: "alexander",
  //   cantidad: "1",
  //   precio: "5",
  // },
  // {
  //     id:"4",
  //     producto: "galletitas",
  //     vendedor: "abigail",
  //     cantidad: "4",
  //     precio: "500",
  //   },
  //   {
    //   id:"5",
  //     producto: "chupetin",
  //     vendedor: "gustavo",
  //     cantidad: "1",
  //     precio: "100",
  //   },
  //   {
  //     id:"6",
  //     producto: "alfajor",
  //     vendedor: "maxi",
  //     cantidad: "4",
  //     precio: "500",
  //   },{
    //   id:"7",
  //     producto: "chicle",
  //     vendedor: "rodrigo",
  //     cantidad: "1",
  //     precio: "100",
  //   },{
    //   id:"8",
  //     producto: "pastilla",
  //     vendedor: "antonela",
  //     cantidad: "1",
  //     precio: "100",
  //   },{
    //   id:"9",
  //     producto: "palitos",
  //     vendedor: "milagros",
  //     cantidad: "1",
  //     precio: "100",
  //   },{
    //   id:"10",
  //     producto: "encendedor",
  //     vendedor: "julieta",
  //     cantidad: "1",
  //     precio: "100",
  //   },{
    //   id:"11",
  //     producto: "chupetin",
  //     vendedor: "luciana",
  //     cantidad: "1",
  //     precio: "100",
  //   },{
    //   id:"12",
  //     producto: "sanguche",
  //     vendedor: "rodrigo",
  //     cantidad: "1",
  //     precio: "100",
  //   },{
    //   id:"13",
  //     producto: "yerba",
  //     vendedor: "fabricio",
  //     cantidad: "1",
  //     precio: "100",
  //   },
];
const objNuevaVenta = {
          id:'',
          producto: '',
          vendedor: '',
          cantidad: '',
          precio:'',
        }

const list_datos=document.getElementById("list_datos")
//seleccionamos el TBody de la tabla
const formulario = document.getElementById("formulario");
const filter=document.getElementById('filter')
const producto = document.getElementById("producto")
const vendedor = document.getElementById("vendedor")
const cantidad = document.getElementById("cantidad")
const precio = document.getElementById("precioUnidad")
const botonVendedor = document.getElementById("botonVendedor");
const botonProducto = document.getElementById("botonProducto");
const botonTotal = document.getElementById("total");

botonTotal.addEventListener('click', mostrarTotalVentas);
botonProducto.addEventListener('click', mostrarProductoMasVendido);
botonVendedor.addEventListener('click', mostrarVendedorMasVentas);

const modalContainer = document.getElementById("modal-container");


//seleccionamos el input de fitrado
formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
  e.preventDefault();

  if(producto.value === '' || vendedor.value === '' || cantidad.value === '' || precio.value ==='') {
      alert('Todos los campos se deben llenar');
      return;
  } else {
  //     objEmpleado.id = Date.now();
    objNuevaVenta.id = Date.now();
    objNuevaVenta.producto = producto.value;
    objNuevaVenta.vendedor = vendedor.value;
    objNuevaVenta.cantidad = cantidad.value;
    objNuevaVenta.precio = precio.value;

    datos.push({...objNuevaVenta});
    localStorage.setItem('productos', JSON.stringify(datos))

    formulario.reset();
    limpiarObjeto();
    mostardatos();
 }
}

function limpiarObjeto() {
    objNuevaVenta.id = '';
    objNuevaVenta.producto = '';
    objNuevaVenta.vendedor = ''
    objNuevaVenta.cantidad = '';
    objNuevaVenta.precio = '';
}

const llenardatos=(index)=>{

   list_datos.innerHTML+=`
    <tr>
      <td>${index.vendedor}</td>
      <td>${index.producto}</td>
      <td>${index.precio}</td>
      <td>${index.cantidad}</td>
      <td>${index.cantidad * index.precio}$ </td>
      <td>
         <div class="accionesbtn">
         <p class="btnMostrar" data-id=${index.id}>🔎</p>
          <p class="btnEliminar" data-id=${index.id}>✖️</p>
         </div>
          </td>
    </tr>
    `
   localStorage.setItem('productos', JSON.stringify(datos))

  }
  
  document.addEventListener("click", (e) => { 
    eliminarVenta(e);
    mostrarVenta(e);
  });

  const eliminarVenta = (e) =>{
    if (e.target.classList.contains('btnEliminar')) {
      if (confirm("¿Estas seguro de eliminar esta venta?")){
      // Obtiene el id del objeto a eliminar del atributo data-id.
      const idAEliminar = e.target.getAttribute('data-id');
    
      // Encuentra el índice del objeto en el arreglo 'datos' usando el id.
      const indiceAEliminar = datos.findIndex(item => item.id === idAEliminar);
      
      datos.splice(indiceAEliminar, 1);
  
      // Actualiza el almacenamiento local.
      localStorage.setItem('productos', JSON.stringify(datos));
  
      // Vuelve a mostrar los datos en la tabla después de la eliminación.
      mostardatos();
    }else{
      return;
    }
  }
  }
///////////////////////////////////////////////////////////////////////////////////

  function obtenerLocalStorage() {
    datos = JSON.parse(localStorage.getItem('productos'))
    llenardatos();
  }

  
 filter.addEventListener('keyup',(e)=>{
    let value=e.target.value
    list_datos.innerHTML=''
    for(let index of datos)
    {
      if(index.producto.includes(value)){
        llenardatos(index)
      
      }
   
    }

  })
  // creamos una funcion que recorra todo el array de datos
  // osea cada uno de los objetos que tenga adentro

  const mostardatos=()=>{
    limpiarHTML();
     for(let index of datos){
         llenardatos(index)
   }
  }

function limpiarHTML() {
  // const lista_datos = document.querySelector('.list_datos');
  while(list_datos.firstChild) {
      list_datos.removeChild(list_datos.firstChild);
  }
}

/////////////////////////////////////////////////////////////////////
function mostrarVendedorMasVentas() {
  // Objeto para realizar un seguimiento de las ventas por vendedor.
  const ventasPorVendedor = {};

  // Itera a través de los datos y registra las ventas por vendedor.
  datos.forEach(dato => {
    const vendedor = dato.vendedor;
    if (ventasPorVendedor[vendedor]) {
      ventasPorVendedor[vendedor] += parseInt(dato.cantidad, 10);
    } else {
      ventasPorVendedor[vendedor] = parseInt(dato.cantidad, 10);
    }
  });

  // Encuentra el vendedor con más ventas.
  let vendedorMasVentas = '';
  let maxVentas = 0;
  for (const vendedor in ventasPorVendedor) {
    if (ventasPorVendedor[vendedor] > maxVentas) {
      maxVentas = ventasPorVendedor[vendedor];
      vendedorMasVentas = vendedor;
    }
  }
  // Muestra un mensaje con el vendedor que realizó más ventas.
  if (vendedorMasVentas !== '') {
    alert(`El vendedor que realizó más ventas es: ${vendedorMasVentas} con un total de ${maxVentas} ventas.`);
  } else {
    alert('No hay datos de ventas.');
  }
}
/////////////////////////////////////////////////////////////

function mostrarProductoMasVendido() {
  // Objeto para realizar un seguimiento de las ventas por producto.
  const ventasPorProducto = {};

  // Itera a través de los datos y registra las ventas por producto.
  datos.forEach(dato => {
    const producto = dato.producto;
    if (ventasPorProducto[producto]) {
      ventasPorProducto[producto] += parseInt(dato.cantidad, 10);
    } else {
      ventasPorProducto[producto] = parseInt(dato.cantidad, 10);
    }
  }
  )
  // Encuentra el producto más vendido.
  let productoMasVendido = '';
  let maxVentas = 0;
  for (const producto in ventasPorProducto) {
    if (ventasPorProducto[producto] > maxVentas) {
      maxVentas = ventasPorProducto[producto];
      productoMasVendido = producto;
    }
  }

  // Muestra un mensaje con el producto más vendido.
  if (productoMasVendido !== '') {
    alert(`El producto más vendido es: ${productoMasVendido} con un total de ${maxVentas} unidades vendidas.`);
  } else {
    alert('No hay datos de ventas.');
  }
}
//////////////////////////////////////////////////////////////////////

function mostrarTotalVentas() {
  // Inicializa una variable para el total de ventas.
  let totalVentas = 0;

  // Itera a través de los datos y suma el producto de cantidad y precio de cada venta.
  datos.forEach(dato => {
    const cantidad = parseInt(dato.cantidad, 10);
    const precio = parseFloat(dato.precio);
    totalVentas += cantidad * precio;
  });

  // Muestra un mensaje con el total de ventas.
  if (totalVentas > 0) {
    alert(`El total de todas las ventas realizadas es: $${totalVentas.toFixed(2)}`);
  } else {
    alert('No hay datos de ventas.');
  }
}
//////////////////////////////////////////////////////////
mostardatos();
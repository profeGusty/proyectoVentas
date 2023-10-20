const mostrarVenta = (e) => {
    if (e.target.classList.contains('btnMostrar')) {
      modalContainer.innerHTML = "";
      modalContainer.style.display = "flex";
      const modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";
        modalHeader.innerHTML = `
        <h2 class="modal-header-title">Venta Descripcion</h2>
        `;
        modalContainer.append(modalHeader);
      
        const modalbutton = document.createElement("h2");
        modalbutton.innerText = "x";
        modalbutton.className = "modal-header-button";
        
        modalbutton.addEventListener("click", () => {
          modalContainer.style.display = "none";
        });
        
        modalHeader.append(modalbutton);
      const idventa = e.target.getAttribute('data-id');
      const nuevaVenta = datos.filter(task => task.id === Number(idventa))

      let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <p>Vendedor: ${nuevaVenta[0].vendedor}</p>
        <p>Producto: ${nuevaVenta[0].producto}</p>
        <p>Cantidad: ${nuevaVenta[0].cantidad}</p>
        <p>Precio U: ${nuevaVenta[0].precio}</p>
        <p>Total Venta: ${nuevaVenta[0].precio * nuevaVenta[0].cantidad}</p>
        `        
     modalContainer.append(carritoContent);
    ;
    }

  };
  
 
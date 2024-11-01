//Capturas de elementos del DOM

const productSection = document.querySelector('.escaparate');


const addToCart = (event) => {
    const carro = document.querySelector('.items');
    let id = event.target.dataset.id;
    const articulo = productList.find(product => product.id === Number(id))
    let añadido = document.querySelector(`.items li[data-id="${articulo.id}"]`);
    const icono = document.querySelector('#cart')

    if (añadido) {
        const span = añadido.querySelector('span');
        const btn = document.querySelector(`#btnAdd${articulo.id}`)
        const btn1 = añadido.querySelector(`#add${articulo.id}`)
        addX1(span, articulo.stock, btn, btn1)

    } else {
        printInCart(articulo, carro);
        destacarCart(icono)

    }
    mostrarTotal();


}

// Pintar productos en el Screen.
function printOneArticle(articulo, dom) {
    // Creación de los elementos
    const article = document.createElement('article');
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const ul = document.createElement('ul');
    const btn = document.createElement('button');

    // Meter contenido y gestionar atributos
    img.src = articulo.imagen;
    img.alt = articulo.nombre;
    h3.textContent = articulo.nombre;
    ul.innerHTML = `<li>${articulo.descripcion}</li>
                    <li>Precio: ${articulo.precio} €</li>`;
    btn.textContent = "Agregar al carrito";

    btn.dataset.id = articulo.id
    btn.id = 'btnAdd' + btn.dataset.id

    // Meter los elementos dentro de sus contenedores
    figure.appendChild(img);
    article.append(figure, h3, ul, btn);
    dom.appendChild(article);

    btn.addEventListener('click', addToCart)
}


function printAllStock(stockList, dom) {
    stockList.forEach(articulo => printOneArticle(articulo, dom))


}

// Termina seccion de pintar productos
printAllStock(productList, productSection)

//Buscar productos en el input de busqueda


// Captura del input de búsqueda
const searchInput = document.querySelector('#buscador');
function searchProducts(term, stockList, dom) {
    const filteredProducts = stockList.filter(articulo => 
        articulo.nombre.toLowerCase().includes(term.toLowerCase()) || 
        articulo.descripcion.toLowerCase().includes(term.toLowerCase())
    );

    dom.innerHTML = '';
    printAllStock(filteredProducts, dom);

    /* btnAdd = document.querySelectorAll('article button');
    btnAdd.forEach(button => {
        button.addEventListener('click', addToCart);
    }); */
}
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    searchProducts(searchTerm, productList, productSection);
});

printAllStock(productList, productSection);


//End Search Input 


//Funcionalidad Back - Next Product

// Captura del DOM

const prevButton = document.querySelector('#previa');
const nextButton = document.querySelector('#siguiente');
const pageInfo = document.querySelector('#pag-info');

// Variables de paginación
let currentPage = 1;
const itemsPerPage = 6; // Número de productos por página

// Función para mostrar productos según la página actual
function showPage(page, stockList) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = stockList.slice(startIndex, endIndex);
    productSection.innerHTML = '';
    printAllStock(productsToShow, productSection);
    pageInfo.textContent = `Página ${currentPage} de ${Math.ceil(stockList.length / itemsPerPage)}`;

    
}

// Botón "Anterior"
function handlePrevClick() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage, productList);
    }
}

//Botón "Siguiente"
function handleNextClick() {
    const totalPages = Math.ceil(productList.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage, productList);
    }
}

//Eventos de clic en los botones
prevButton.addEventListener('click', handlePrevClick);
nextButton.addEventListener('click', handleNextClick);

// Evento de búsqueda
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    const filteredProducts = productList.filter(articulo => 
        articulo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        articulo.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Resetear la página actual y mostrar los productos filtrados
    currentPage = 1;
    showPage(currentPage, filteredProducts);
});

// Inicializar la visualización de productos
showPage(currentPage, productList);








//desplegable carrito
const botonCarrito = document.querySelector('#cart')

const desplegarCarro = () => {
    const carro = document.querySelector('.carro');

    /* carro.style.transform = 'translateX(-100%)' */
    /* carroBtn.setAttribute('style', 'transform: translateX(-800%)') */
    if (carro.style.transform === "") {
        carro.setAttribute('style', 'transform: translateX(-0%)')
    } else {
        carro.style.transform = ""
    }
}
botonCarrito.addEventListener('click', desplegarCarro)

//Mostrar precio total

const verTotal = document.querySelector('#total')

const calcularTotal = (lista) => {
    const articulosCarrito = document.querySelectorAll('.items li')
    let total = 0;

    articulosCarrito.forEach(articulo => {
        const dataId = Number(articulo.dataset.id)
        const articuloEnCarrito = lista.find(product => product.id === dataId)
        const cantidad = Number(articulo.querySelector('span').textContent.replace(' x', ''))
        total += articuloEnCarrito.precio * cantidad;
    })
    return total;

}

const mostrarTotal = () => {
    verTotal.textContent = calcularTotal(productList)
}

//agregar al carrito

const btnAdd = document.querySelectorAll('article button')

const addX1 = (span, stock, btn, btn1) => {
    let contador = Number(span.textContent.replace(' x', ''))
    if (stock > contador) {
        contador += 1;
        span.textContent = ' x' + contador;
    } else {
        btn.disabled = true;
        btn1.disabled = true;
        btn.textContent = 'Sin Stock'
        
    }
    mostrarTotal()
}

const deleteInCart = (event) => {

    let liBorrar = event.target.parentNode;

    while (liBorrar && liBorrar.tagName !== 'LI') {
        liBorrar = liBorrar.parentNode;
    }
    if (liBorrar) {
        const btnAdd = document.querySelector(`#btnAdd${liBorrar.dataset.id}`)
        btnAdd.disabled = false;
        btnAdd.textContent = 'Agregar al carrito';

        liBorrar.parentNode.removeChild(liBorrar)
    }
    mostrarTotal()
}

const printInCart = (articulo, dom) => {
    const li = document.createElement('li');
    li.dataset.id = articulo.id;
    const p = document.createElement('p')
    const span = document.createElement('span');
    const btn1 = document.createElement('button');
    btn1.id = 'add' + articulo.id
    const btn2 = document.createElement('button');
    btn2.id = 'delete'
    const btn2i = document.createElement('i');
    const btn = document.querySelector(`#btnAdd${articulo.id}`)

    p.textContent = articulo.nombre;
    btn1.textContent = '+';
    span.textContent = ' x' + 1;
    btn1.addEventListener('click', () => addX1(span, articulo.stock, btn, btn1))
    btn2.addEventListener('click', deleteInCart)
    btn2i.className = 'fa-solid fa-trash-can';

    btn2.appendChild(btn2i)
    p.appendChild(span)
    li.append(p, btn1, btn2)
    dom.appendChild(li)

}

const destacarCart = (icono) => {
    icono.classList.add('active')

    setTimeout(() => {
        icono.classList.remove('active')
    }, 500)
}





/* btnAdd.forEach(button => {
    button.addEventListener('click', addToCart);
}) */


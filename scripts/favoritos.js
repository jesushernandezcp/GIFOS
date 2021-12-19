let pintar = document.getElementById('showfav');
let p = 12; // variable de control maximo de paginado de gifs, asociada al boton ver mas
let j = 0; //variable de control minimo de paginado de gifs
let btnmas = document.getElementById('mas');
let jsonE;
let titulo = document.getElementById('tibus');





//window.onload = giphy();


//    if (!localStorage.getItem('favoritos')) {
  //      localStorage.setItem('favoritos', '[]');
    
    //}
    //let favoritos = JSON.parse(localStorage.getItem('favoritos'));
    //console.log(favoritos);
    jsonE = favoritos.length;    



window.onload = cargarStorage();    


//-----SECCION CON FUNCIONES PARA CARGAR LOS GIFOS FAVORITOS ALMACENADOS EN EL LOCALSTORAGE-----

function cargarStorage() {
    
    console.log('el arreglo json contiene: ' + jsonE)
    //en caso de que no haya GIFOS almacenados en el storage
    if (jsonE === 0) {
        pintar.innerHTML =
            `
            <div id="areaSinFav">
                <img id='sinFav' src="/images/icon-fav-sin-contenido.svg" alt"imagen sin resultados" width="150" height="151">
                <br>
                <p id='msjsinFav'>"¡Guarda tu primer GIFO en Favoritos 
                para que se muestre aquí!"</p>
            </div>

        `;
    }

//si los GIFOS almacenados son menos de 12 entonces cargarlos y no mostrar el boton VER MAS

if (jsonE <= p) {
    console.log('todos los elementos caben en una grilla');
    for (j = 0; j < jsonE; j++) {

        //console.log(json.data[j]);
        let imgres = document.createElement('div');
        imgres.innerHTML =
            `
                <div class='frameFav'>

                    <img class='giFav' src="${favoritos[j].urlImagen}" alt="">

                    <div class='iconsFav'>
                        <div class='favActive'><img id='${favoritos[j].id}' class='locfav' src='/images/icon-fav-active.svg' alt=""></div>
                        <div class='favActive'><img id='${favoritos[j].id}' class='found sdown' src='/images/icon-download.svg' alt=""></div>
                        <div class='favActive'><img id='${favoritos[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt=""></div>
                    </div>

                    <div class='dataFav'>
                        <p>${favoritos[j].usuario}<br>
                        <span>${favoritos[j].title}</span>
                        </p>
                    </div>
                    
                     </div>
                </div>
                `
        pintar.appendChild(imgres);

    }

}
//si los GIFOS almacenados son mas de 12 entonces cargarlos y mostrar el boton VER MAS
else {
     btnmas.textContent = 'Ver Mas';
    btnmas.style.visibility = 'visible';

    for (j = 0; j < p; j++) {
        //console.log(json.data[j]);
        let imgres = document.createElement('div');
        imgres.innerHTML =
            `
            <div class='frameFav'>

            <img class='giFav' src="${favoritos[j].urlImagen}" alt="">

            <div class='iconsFav'>
                <div class='favActive'><img id='${favoritos[j].id}' class='locfav' src='/images/icon-fav-active.svg' alt=""></div>
                    <img id='${favoritos[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                    <img id='${favoritos[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                </div>

                <div class='dataFav'>
                    <p>${favoritos[j].usuario}<br>
                    <span>${favoritos[j].title}</span>
                    </p>
                </div>
            
             </div>
        </div>
                `
        pintar.appendChild(imgres);


    }
//cargar mas GIFOS conforme se presiona el botono VER MAS
    btnmas.addEventListener('click', () => {
        let r = (jsonE - p) / 12;
        if (r >= 1) {
            p += 12;
            for (j; j < p; j++) {
                let imgres = document.createElement('div');
                imgres.innerHTML =
                    `
                    <div class='frameFav'>

                    <img class='giFav' src="${favoritos[j].urlImagen}" alt="">

                    <div class='iconsFav'>
                        <div class='favActive'><img id='${favoritos[j].id}' class='locfav' src='/images/icon-fav-active.svg' alt=""></div>
                            <img id='${favoritos[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                            <img id='${favoritos[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                        </div>

                        <div class='dataFav'>
                            <p>${favoritos[j].usuario}<br>
                            <span>${favoritos[j].title}</span>
                            </p>
                        </div>
                    
                     </div>
                </div>
                `
                pintar.appendChild(imgres);

            }
        }
        else {
            p += jsonE - p;
            for (j; j < p; j++) {
                let imgres = document.createElement('div');
                imgres.innerHTML =
                    `
                    <div class='framegif'>

                    <img class='giFav' src="${favoritos[j].urlImagen}" alt="">

                    <div class='iconsFav'>
                        <div class='favActive'><img id='${favoritos[j].id}' class='locfav' src='/images/icon-fav-active.svg' alt=""></div>
                            <img id='${favoritos[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                            <img id='${favoritos[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                        </div>

                        <div class='dataFav'>
                            <p>${favoritos[j].usuario}<br>
                            <span>${favoritos[j].title}</span>
                            </p>
                        </div>
                    
                     </div>
                </div>
                `
                pintar.appendChild(imgres);
                btnmas.style.visibility = 'hidden';

            }
        }


    })
}


}



//----SECCION CON LAS FUNCIONES DE COMPORTAMIENTO DE BOTONES----


//ALGORITMO PARA BOTON DE AMPLIAR IMAGENES

document.addEventListener('click', e => {
    if (e.target.classList.contains('exp')) {
        let imagen = e.target.id; //VARIABLE PARA ASIGNAR A BOTON FAV
        let idown = trending.find(gifo => gifo.urlImagen === imagen).id; //VARIABLE PARA ASIGNAR A BOTON DOWN
        let popUpBox = document.getElementById('popUpBox');
        document.body.style.visibility = 'hidden';
        popUpBox.style.visibility = "visible";

        popUpBox.innerHTML =
            `
            <button id='cerrarPop'>X</button>
            <img id='imgpop' src="${imagen}" alt="">

            <div id='popicons'>
                    <img id='${imagen}' class='found sfav' src='/images/icon-fav.svg' alt="">
                    <img id='${idown}' class='found sdown' src='/images/icon-download.svg' alt="">
            </div>


        `;

    }

    if (e.target.classList.contains('smax')) {
        let imagen = e.target.id; //VARIABLE PARA ASIGNAR A BOTON FAV
        let idown = favoritos.find(e => e.urlImagen === imagen).id; //VARIABLE PARA ASIGNAR A BOTON DOWN
        let popUpBox = document.getElementById('popUpBox');
        document.body.style.visibility = 'hidden';
        popUpBox.style.visibility = "visible";

        popUpBox.innerHTML =
            `
        <button id='cerrarPop'>X</button>
        <img id='imgpop' src="${imagen}" alt="">
            <div id='popicons'>
                    <img id='${imagen}' class='found sfav' src='/images/icon-fav.svg' alt="">
                    <img id='${idown}' class='found sdown' src='/images/icon-download.svg' alt="">
            </div>



        `;

    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'cerrarPop') {
        let popUpBox = document.getElementById('popUpBox');

        popUpBox.style.visibility = "hidden";
        document.body.style.visibility = 'visible';
    }
})



//ALGORITMO PARA BOTON DE DESCARGA DE GIFS

document.addEventListener('click', e => {
    if (e.target.classList.contains('down') || e.target.classList.contains('sdown')) {
        console.log(e.target.id)
        fetch(gifBid + '?ids=' + e.target.id + '&api_key=' + api_key)
            .then(response => response.json())
            .then(blob => {
                let urlElemento = blob.data[0].images.original.url;
                imgDownload(urlElemento);
            })
            .catch(err => console.error(err));

    }
});


async function imgDownload(url) {
    let imgblob = await fetch(url)
        .then(res => res.blob())
    let enlace = document.createElement('a');
    enlace.href = window.URL.createObjectURL(imgblob);
    enlace.download = 'gifo.gif';
    enlace.click();
}

//ALGORITMO PARA BOTON AGREGAR A FAVORITOS
/*
document.addEventListener('click', e => {
    let elemento;
    let gifoFavorito;
    
    if (e.target.classList.contains('fav')) {
        elemento = e.target.id;
        gifoFavorito = trending.find(gifo => gifo.id === elemento);
        console.log(gifoFavorito);
        favoritos.push(gifoFavorito);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        console.log(localStorage);
        setInterval(location.reload(), 2000);
    }

    if (e.target.classList.contains('sfav')) {
        elemento = e.target.id;
        console.log(elemento);
        gifoFavorito = gifosFound.find(gifo => gifo.id === elemento);
        console.log(gifoFavorito);
        favoritos.push(gifoFavorito);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        console.log(localStorage);
    }
    e.stopPropagation();
});
*/
//ALGORITMO PARA BOTON ELIMINAR GIFO DEL STORAGE DE FAVORITOS

document.addEventListener('click', e => {
//actua sobre el div que contiene al corazon
    if (e.target.className === 'favActive') {
        console.log('el elemento es sujeto de estraccion')
        let hijo = e.target.childNodes[0];
        let hijoevaluado=hijo.id;
        let hijoBorrado = favoritos.findIndex(gifo => gifo.id === hijoevaluado);
        console.log(hijoBorrado);
        favoritos.splice(hijoBorrado, 1);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        console.log(localStorage);
        

    }
//actua sobre la imagen del corazon
    if (e.target.classList.contains('locfav')) {
        console.log('eres todo un pro');
        let evaluado = e.target.id;
        let gifoBorrado = favoritos.findIndex(gifo => gifo.id === evaluado);
        console.log(gifoBorrado);
        favoritos.splice(gifoBorrado, 1);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        console.log(localStorage);
        location.reload();

    }
    //setInterval(location.reload(), 2000);
});
/*
function giphy() {

    fetch(uri + "?api_key=" + api_key + "&limit=12")
        .then(response => response.json())
        .then(json => {
            console.log(json);

            for (let index = 0; index < json.data.length; index++) {

                let gifo = new Gifo();
                    gifo.urlImagen = json.data[index].images.fixed_height.url,
                    gifo.urlOriginal = json.data[index].images.original.url,
                    gifo.id = json.data[index].id,
                    gifo.title = json.data[index].title,
                    gifo.usuario = json.data[index].username;

                trending.push(gifo);

            }

            cargar()
        })



        .catch(err => console.error(err));

};


//IR A PAGINA PRINCIPAL
let vinculo = document.getElementById('logo');
vinculo.addEventListener('click', () => {
    let index = document.createElement('a');
    index.href = "/index.html";
    index.click();
});*/

//window.onload=giphy();
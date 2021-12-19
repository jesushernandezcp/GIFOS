
//let api_key = "9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";
//let uri = "https://api.giphy.com/v1/gifs/trending";//ENDPOINT PARA GIF TRENDING
let uriauto = 'https://api.giphy.com/v1/gifs/search/tags';//ENDPOINT PARA AUTOCOMPLETADO
let urisug = 'https://api.giphy.com/v1/trending/searches';//ENDPOINT DE BUSQUEDA DE TRENDING TOPICS
let busqueda = 'https://api.giphy.com/v1/gifs/search';//ENDPOINT DE BUSQUEDA DE ELEMENTO SELECCIONADO
//let gifBid = 'https://api.giphy.com/v1/gifs'; //OBTENER GIFS BY ENDPOINTS




//window.onload = giphy();


//ALGORITMO DE LA BARRA DE PALABRAS TRENDING
let topicTren = document.getElementById('topicTren');


fetch(urisug + "?api_key=" + api_key)
    .then(response => response.json())
    .then(json => {
        let arrayTopic = json.data;

        for (let index = 0; index < 5; index++) {
            if (index === 4) {
                let wordStrong = document.createElement('strong');
                wordStrong.setAttribute('class', 'wordStrong');
                wordStrong.innerHTML = arrayTopic[index] + ' ';
                topicTren.appendChild(wordStrong);

            }
            else {
                let wordStrong = document.createElement('strong');
                wordStrong.setAttribute('class', 'wordStrong');
                wordStrong.innerHTML = arrayTopic[index] + ', ';
                topicTren.appendChild(wordStrong);


            }

        }

    })
    .catch(error => console.error(error));


/*
//objeto para almacenar datos del gifo trending extraido de la api
class Gifo {
    constructor(id, urlOriginal, urlImagen, title, usuario) {
        this.id = id;
        this.urlOriginal = urlOriginal;
        this.urlImagen = urlImagen;
        this.title = title;
        this.usuario = usuario;
    }

}

let trending = [];//arreglo para almacenar los gifos trending

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
*/

//FUNCION PARA ESTILOS DEL INPUT
let icon = document.getElementById('iconoClose');
let iconDos = document.getElementById('iconoLupa');
document.addEventListener('click', (e) => {
    let evento = e.target.id;

    if (evento === 'buscar') {
        let box = document.getElementById(evento);
        icon.src = '/images/close.svg';
        icon.style.width = '14px';
        icon.style.height = '14px';
        iconDos.style.visibility = 'visible';
        box.style.borderBottom = '1px solid #9CAFC3';

    }
    e.stopPropagation();
})



//ALGORITMO DE BUSQUEDA GIFO

let texto = document.getElementById('buscar');
let resultados = document.getElementById('listaResultados');
let container = document.querySelector('.container');
let pintar = document.getElementById('restopic');
let arreglo = [];


texto.addEventListener('input', () => {
    resultados.style.display = 'block';
    let txtinput = texto.value.toLowerCase();

    console.log(txtinput);
    fetch(uriauto + '?api_key=' + api_key + '&q=' + txtinput)
        .then(response => response.json())
        .then((json) => {
            resultados.innerHTML = '';
            arreglo = json.data;
            console.log(arreglo);
            for (const i of arreglo) {
                let res = i.name;

                if (res.indexOf(txtinput) !== -1) {
                    resultados.innerHTML += `<li class='options' id='${res}'>${res}</li>`;
                }

            }

        })
        .catch(error => console.error(error));

})


//Funciones de busqueda

document.addEventListener('click', e => {
    let etarget = e.target;
    //SI EL CLICK ES EN BOTON CERRAR SE BORRA LA BUSQUEDA

    if (etarget.id === 'iconoClose') {
        texto.value = '';
        resultados.innerHTML = '';
        searching(texto.value);
        btnmas.style.visibility = 'hidden';
    }
    //SI EL CLICK ES EN ALGUNA DE LAS PALABRAS ENCONTRADAS APERECE LA BUSQUEDA

    else if (etarget.classList == 'options') {
        texto.value = etarget.id;
        searching(texto.value);
        resultados.style.display = 'none';

    }
    // SI EL CLICK ES EN EL BOTON LUPA BUSCA RESULTADOS PARA LA PALABRA
    else if (etarget.id == 'iconoLupa') {
        console.log(texto.value);
        searching(texto.value);
    }

})
/*
document.addEventListener('click', e => {
    let etarget = e.target;


    if (etarget.classList == 'options') {
        texto.value = etarget.id;
        searching(texto.value);
        resultados.style.display='none';
        
    }

    e.stopPropagation();
});
*/


let p = 12; // variable de control maximo de paginado de gifs, asociada al boton ver mas
let j = 0; //variable de control minimo de paginado de gifs
let btnmas = document.getElementById('mas');
let jsonE;
let gifosFound = [];
let titulo = document.getElementById('titResBusqueda');


function searching(elemento) {

    if (elemento === '') {
        console.log('no existen elementos para buscar');
    }
    console.log(elemento);
    gifosFound = [];
    fetch(busqueda + '?api_key=' + api_key + '&q=' + elemento + '&limit=50')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            pintar.innerHTML = '';

            titulo.textContent = elemento;

            //ciclo para guardar todos los elementos del resultado en un arreglo
            for (let e = 0; e < json.data.length; e++) {
                let gifodata = new Gifo();
                gifodata.id = json.data[e].id,
                    gifodata.urlOriginal = json.data[e].images.original.url,
                    gifodata.urlImagen = json.data[e].images.downsized_medium.url,
                    gifodata.title = json.data[e].title,
                    gifodata.usuario = json.data[e].username,
                    gifosFound.push(gifodata);

            }

            console.log(gifosFound);

            jsonE = gifosFound.length;
            console.log('el arreglo json contiene: ' + jsonE)



            if (jsonE < p) {
                console.log('todos los elementos caben en una grilla');
                for (j = 0; j < jsonE; j++) {

                    console.log(json.data[j]);
                    let imgres = document.createElement('div');
                    imgres.innerHTML =
                        `
                        <div class='framegif'>

                        <img class='gifound' src="${gifosFound[j].urlImagen}" alt="">
                       
                        <div class='frameIcons'>
                        <img id='${gifosFound[j].id}' class='sfav found' src='/images/icon-fav.svg' alt=""> 
                        <img id='${gifosFound[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                        <img id='${gifosFound[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                        </div>
                        <div class='dataGif'>
                            <p class='usuarioGif>${gifosFound[j].usuario}<br>
                            <span class='titleGif'>${gifosFound[j].title}</span>
                            </p>
                        </div>
                    </div>
                    
                `

                    pintar.appendChild(imgres);


                }

            }
            else {

                console.log('los elementos exceden el espacio de una grilla');

                btnmas.textContent = 'Ver Mas';
                btnmas.style.visibility = 'visible';

                for (j = 0; j < p; j++) {
                    console.log(json.data[j]);
                    let imgres = document.createElement('div');
                    imgres.innerHTML =
                        `
                <div class='framegif'>

                    <img class='gifound' src="${gifosFound[j].urlImagen}" alt="">
                   
                    <div class='frameIcons'>
                    <img id='${gifosFound[j].id}' class='sfav found' src='/images/icon-fav.svg' alt="">
                    <img id='${gifosFound[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                    <img id='${gifosFound[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                    </div>
                    <div class='dataGif'>
                            <p class='usuarioGif>${gifosFound[j].usuario}<br>
                            <span class='titleGif'>${gifosFound[j].title}</span>
                            </p>
                        </div>
                </div>
                
                `
                    pintar.appendChild(imgres);


                }

                btnmas.addEventListener('click', () => {
                    let r = (jsonE - p) / 12;
                    if (r >= 1) {
                        p += 12;
                        for (j; j < p; j++) {
                            let imgres = document.createElement('div');
                            imgres.innerHTML =
                                `
                <div class='framegif'>

                    <img class='gifound' src="${gifosFound[j].urlImagen}" alt="">
                    
                    <div class='frameIcons'>
                    <img id='${gifosFound[j].id}' class='sfav found' src='/images/icon-fav.svg' alt=""> 
                    <img id='${gifosFound[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                    <img id='${gifosFound[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                    </div>
                    <div class='dataGif'>
                            <p class='usuarioGif>${gifosFound[j].usuario}<br>
                            <span class='titleGif'>${gifosFound[j].title}</span>
                            </p>
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

                    <img class='gifound' src="${gifosFound[j].urlImagen}" alt="">
                    
                    <div class='frameIcons'>
                     <img id='${gifosFound[j].id}' class='sfav found ' src='/images/icon-fav.svg' alt=""> 
                        <img id='${gifosFound[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                        <img id='${gifosFound[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                    </div>
                    
                    <div class='dataGif'>
                            <p class='usuarioGif>${gifosFound[j].usuario}<br>
                            <span class='titleGif'>${gifosFound[j].title}</span>
                            </p>
                    </div>    
                </div>
                
                `
                            pintar.appendChild(imgres);
                            btnmas.style.visibility = 'hidden';

                        }
                    }


                })
            }

        })




        .catch(err => {
            pintar.innerHTML =
                `
        <p id="areaSinres">
        <img id='sinRes' src="/images/icon-busqueda-sin-resultado.svg" alt"imagen sin resultados">
        <br>
        <h2>Intenta con otra búsqueda.</h2>
        </p>
        
        `;
        });




}



document.addEventListener('click', e => {
    let elemento = e.target.id;
    if (elemento === 'iconSearchDos') {

        searching(texto.value);

    }

})
/*
//FUNCION CARGAR IMAGEN

function cargar() {
    let images = document.getElementsByClassName('gifoImagen');
    let iconfav = document.getElementsByClassName('fav');
    let icondown = document.getElementsByClassName('down');
    let iconexp = document.getElementsByClassName('exp');
    let strongs = document.getElementsByTagName('strong');
    let datagifuser = document.getElementsByClassName('dataGifuser');



    for (let n = 0; n < strongs.length; n++) {
        strongs[n].innerHTML = trending[n].title;

    }


    for (let index = 0; index < iconexp.length; index++) {
        iconexp[index].setAttribute('id', trending[index].urlImagen);

    }

    for (let index = 0; index < images.length; index++) {
        images[index].setAttribute('src', trending[index].urlImagen);
    }
    for (let k = 0; k < iconfav.length; k++) {
        iconfav[k].setAttribute('id', trending[k].id);

    }
    for (let k = 0; k < icondown.length; k++) {
        icondown[k].setAttribute('id', trending[k].id);

    }

}






//FUNCION DESLIZAMIENTO A LA IZQUIERDA
function SliderLeft() {


    var slideLone = trending[0].urlImagen;
    var slideLtwo = trending[0].id;
    var slideLthree = trending[0].urlOriginal;
    var slideLfour = trending[0].title;
    var slideLfive = trending[0].usuario;

    for (let i = 0; i < ((trending.length - 1)); i++) {

        trending[i].urlImagen = trending[i + 1].urlImagen;
        trending[i].id = trending[i + 1].id;
        trending[i].urlOriginal = trending[i + 1].urlOriginal;
        trending[i].title = trending[i + 1].title;
        trending[i].usuario = trending[i + 1].usuario;
    };

    trending[11].urlImagen = slideLone;
    trending[11].id = slideLtwo;
    trending[11].urlOriginal = slideLthree;
    trending[11].title = slideLfour;
    trending[11].usuario = slideLfive;

    trending[trending.length - 1].urlImagen = slideLone;
    trending[trending.length - 1].id = slideLtwo;
    //console.log(trending);
    cargar();
}

//FUNCION DESLIZAMIENTO A LA DERECHA

function SlideRight() {

    var slideRone = trending[11].urlImagen;
    var slideRtwo = trending[11].id;
    var slideRthree = trending[11].urlOriginal;
    var slideRfour = trending[11].title;
    var slideRfive = trending[11].usuario;

    for (let index = 11; index > ((trending.length - 12)); index--) {

        trending[index].urlImagen = trending[index - 1].urlImagen;
        trending[index].id = trending[index - 1].id;
        trending[index].urlOriginal = trending[index - 1].urlOriginal;
        trending[index].title = trending[index - 1].title;
        trending[index].usuario = trending[index - 1].usuario;
    }
    trending[0].urlImagen = slideRone;
    trending[0].id = slideRtwo;
    trending[0].urlOriginal = slideRthree;
    trending[0].title = slideRfour;
    trending[0].usuario = slideRfive;

    cargar();
}

//EVENTO BOTON SLIDER LEFT

let sleft = document.getElementById('sleft');
sleft.addEventListener('click', () => SlideRight());

//EVENTO BOTON SLIDER RIGHT * AMBOS EVENTOS PUEDE ESTAR DENTRO DE UNA MISMA FUNCION ACTIVA, REVISAR TARGET

let sright = document.getElementById('sright');
sright.addEventListener('click', () => SliderLeft());

//giphy();


//ALGORITMO ALMACENAMIENTO DE GIFS FAVORITOS EN EL LOCALSTORAGE

if (!localStorage.getItem('favoritos')) {
    localStorage.setItem('favoritos', '[]');
}

let favoritos = JSON.parse(localStorage.getItem('favoritos'));



document.addEventListener('click', e => {
    let elemento = e.target.id;
    let gifoFavorito;
    let evaluar;    
    if (e.target.classList.contains('fav')) {
        
        evaluar = favoritos.find(gifo => gifo.id === elemento);
        if (evaluar === undefined) {
            gifoFavorito = trending.find(gifo => gifo.id === elemento);
            favoritos.push(gifoFavorito);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert('El GIFO se agrego con exito a tus Favoritos');
        }
        else {
            alert('EL GIFO YA SE ENCUENTRA!')
        }
    }
    else if(e.target.classList.contains('sfav')){
        evaluar = favoritos.find(gifo => gifo.id === elemento);
        if (evaluar === undefined) {
            gifoFavorito = gifosFound.find(gifo => gifo.id === elemento);
            favoritos.push(gifoFavorito);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert('El GIFO se agrego con exito a tus Favoritos');
        }
        else {
            alert('EL GIFO YA SE ENCUENTRA!')
        }
    }

   

    e.stopPropagation();
});

//ALGORITMO PARA DESCARGA DE GIFS

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

//FUNCION BOTON DE DESCARGA
async function imgDownload(url) {
    let imgblob = await fetch(url)
        .then(res => res.blob())
    let enlace = document.createElement('a');
    enlace.href = window.URL.createObjectURL(imgblob);
    enlace.download = 'gifo.gif';
    enlace.click();
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('exp')) {
        let imagen = e.target.id; //VARIABLE PARA ASIGNAR A BOTON FAV
        let idown = trending.find(gifo => gifo.urlImagen === imagen).id; //VARIABLE PARA ASIGNAR A BOTON DOWN
        let popUpBox = document.getElementById('popUpBox');
        document.body.style.visibility = 'hidden';
        popUpBox.style.visibility = "visible";
        //document.getElementById('modal').innerHTML =  
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
        let idown = gifosFound.find(e => e.urlImagen === imagen).id; //VARIABLE PARA ASIGNAR A BOTON DOWN
        let popUpBox = document.getElementById('popUpBox');
        document.body.style.visibility = 'hidden';
        popUpBox.style.visibility = "visible";
        //document.getElementById('modal').innerHTML =  
        popUpBox.innerHTML =
            `
        <button id='cerrarPop'>X</button>
        <img id='imgpop' src="${imagen}" alt="">
            <div id='popicons'>
                    <img id='${imagen}' class='found sfav' src='/images/icon-fav.svg' alt=""> 
                    <img id='${idown}' class='found sdown' src='/images/icon-download.svg' alt="">
            </div>    
        
        
        
        `;
        /*
            <img id='imgpop' src=${imagen} alt=''></img></a> 
            <img id=${imagen} class="fav" src='/images/icon-fav.svg' alt="">
            <img id=${idown} class="down" src='/images/icon-download.svg' alt="">
    */
/*
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'cerrarPop') {
        let popUpBox = document.getElementById('popUpBox');

        popUpBox.style.visibility = "hidden";
        document.body.style.visibility = 'visible';
    }
})


*/
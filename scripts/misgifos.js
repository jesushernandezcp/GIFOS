//let plasmar;
//let paginado = 12; // variable de control maximo de paginado de gifs, asociada al boton ver mas
//let paginadoMin = 0; //variable de control minimo de paginado de gifs
//let btnmas = document.getElementById('mas');
//let misGifos;
//let titulo = document.getElementById('tibus');

//-----SECCION CON FUNCIONES PARA CARGAR LOS GIFOS CREADOS ALMACENADOS EN EL LOCALSTORAGE-----
/*if (!localStorage.getItem('misGifos')) {
        localStorage.setItem('misGifos', '[]');
    
    }*/
    misGifos = JSON.parse(localStorage.getItem('misGifos'));
    //console.log(misGifos);
    gifosCreados = misGifos.length;
    console.log(gifosCreados);    

/*
function cargarStorage() {
    
  console.log('el arreglo json contiene: ' + jsonE)
  //en caso de que no haya GIFOS almacenados en el storage
  if (gifosCreados === 0) {
      plasmar.innerHTML =
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

if (gifosCreados <= paginado) {
  console.log('todos los elementos caben en una grilla');
  for (paginadoMin = 0; paginadoMin < gifosCreados; paginadoMin++) {

      //console.log(json.data[j]);
      let imgres = document.createElement('div');
      imgres.innerHTML =
          `
              <div class='frameFav'>

                  <img class='giFav' src="${misGifos[paginadoMin].urlImagen}" alt="">

                  <div class='iconsFav'>
                      <div class='favActive'><img id='${misGifos[paginadoMin].id}' class='locfav' src='/images/icon-fav-active.svg' alt=""></div>
                      <div class='favActive'><img id='${misGifos[paginadoMin].id}' class='found sdown' src='/images/icon-download.svg' alt=""></div>
                      <div class='favActive'><img id='${misGifos[paginadoMin].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt=""></div>
                  </div>

                  <div class='dataFav'>
                      <p>${misGifos[paginadoMin].usuario}<br>
                      <span>${misGifos[paginadoMin].title}</span>
                      </p>
                  </div>
                  
                   </div>
              </div>
              `
      plasmar.appendChild(imgres);

  }

}
//si los GIFOS almacenados son mas de 12 entonces cargarlos y mostrar el boton VER MAS
else {
   btnmas.textContent = 'Ver Mas';
  btnmas.style.visibility = 'visible';

  for (paginadoMin = 0; paginadoMin < paginado; paginadoMin++) {
      //console.log(json.data[j]);
      let imgres = document.createElement('div');
      imgres.innerHTML =
          `
          <div class='frameFav'>

          <img class='giFav' src="${misGifos[paginadoMin].urlImagen}" alt="">

          <div class='iconsFav'>
              <div class='favActive'><img id='${misGifos[paginadoMin].id}' class='locfav' src='/images/icon-fav-active.svg' alt=""></div>
                  <img id='${misGifos[paginadoMin].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                  <img id='${misGifos[paginadoMin].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
              </div>

              <div class='dataFav'>
                  <p>${misGifos[paginadoMin].usuario}<br>
                  <span>${misGifos[paginadoMin].title}</span>
                  </p>
              </div>
          
           </div>
      </div>
              `
      plasmar.appendChild(imgres);


  }
//cargar mas GIFOS conforme se presiona el botono VER MAS
  btnmas.addEventListener('click', () => {
      let r = (gifosCreados - paginado) / 12;
      if (r >= 1) {
          paginado += 12;
          for (paginadoMin; paginadoMin < paginado; paginadoMin++) {
              let imgres = document.createElement('div');
              imgres.innerHTML =
                  `
                  <div class='frameFav'>

                  <img class='giFav' src="${misGifos[paginadoMin].urlImagen}" alt="">

                  <div class='iconsFav'>
                      <div class='favActive'><img id='${misGifos[paginadoMin].id}' class='locfav' src='/images/icon-fav-active.svg' alt=""></div>
                          <img id='${misGifos[paginadoMin].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                          <img id='${misGifos[paginadoMin].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                      </div>

                      <div class='dataFav'>
                          <p>${misGifos[paginadoMin].usuario}<br>
                          <span>${misGifos[paginadoMin].title}</span>
                          </p>
                      </div>
                  
                   </div>
              </div>
              `
              plasmar.appendChild(imgres);

          }
      }
      else {
          paginado += gifosCreados - paginado;
          for (paginadoMin; paginadoMin < paginado; paginadoMin++) {
              let imgres = document.createElement('div');
              imgres.innerHTML =
                  `
                  <div class='framegif'>

                  <img class='giFav' src="${misGifos[paginadoMin].urlImagen}" alt="">

                  <div class='iconsFav'>
                      <div class='favActive'><img id='${misGifos[paginadoMin].id}' class='locfav' src='/images/icon-fav-active.svg' alt=""></div>
                          <img id='${misGifos[paginadoMin].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                          <img id='${misGifos[paginadoMin].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                      </div>

                      <div class='dataFav'>
                          <p>${misGifos[paginadoMin].usuario}<br>
                          <span>${misGifos[paginadoMin].title}</span>
                          </p>
                      </div>
                  
                   </div>
              </div>
              `
              plasmar.appendChild(imgres);
              btnmas.style.visibility = 'hidden';

          }
      }


  })
}


}
*/
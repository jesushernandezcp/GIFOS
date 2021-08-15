let api_key="9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";
let uri="https://api.giphy.com/v1/gifs/search"
let misgifos=document.getElementById("grid_gifos");
let imagen=document.createElement('img');
let lista=document.createElement('div');

    function migiphy() {
        fetch(uri+"?api_key="+api_key+"&q="+prompt("Escriba la palabra a buscar"))
          
        .then(response => response.json())
        .then( json => {
                console.log(json);
                let undato=json.d0ata[4].url;
                console.log(undato);
                imagen.src=undato;
                misgifos.appendChild(imagen);
                
                /*for (let index = 0; index < 5; index++){
                    
                    let atsrc=json.data[index].url;
                    imagen.src=atsrc;
                    misgifos.appendChild(imagen);
                
              }*/
                
                //imagen.src=undato;
                //resultado.appendChild(imagen);
            })
            .catch(err => console.error(err));
            
        };

//let boton=document.getElementById("search");
//addEventListener("click",giphy());

//COMPROBACION DE FUNCIONES DE MULTIMEDIA
function hasGetUserMedia() {
    // Note: Opera builds are unprefixed.
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }
  
  if (hasGetUserMedia()) {
    // Good to go!
  } else {
    alert('getUserMedia() is not supported in your browser');
  }

  var onFailSoHard = function(e) {
    console.log('Reeeejected!', e);
  };


  //FUNCION PARA ACTIVAR CAMARA

function cameractive() {
    navigator.mediaDevices.getUserMedia({video:true})
    .then(function(mediaStream) {
        let areavideo=document.querySelector('video');
        areavideo.srcObject = mediaStream;
        areavideo.play()
    
        }
      )
    .catch(function(err) {
        console.error('algo esta fallando');
      });
          
}

let btnactive=document.getElementById('btnactive');
btnactive.addEventListener('click',cameractive);

//FUNCION PARA APAGAR CAMARA
function cameroff() {
  navigator.mediaDevices.getUserMedia({video:false})
  /*.then(function(mediaStream) {
      let areavideo=document.querySelector('video');
      areavideo.srcObject = mediaStream;
      areavideo.play()
  
      }
    )
  .catch(function(err) {
      console.error('algo esta fallando');
    });
    */    
}

let btnoff=document.getElementById('btnoff');
btnoff.addEventListener('click',cameroff);
ExtensionScriptApis.video='off';

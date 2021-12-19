
//VARIABLES PARA ESTILO DE BOTONES Y PASOS
let iniciar = document.getElementById('btncomenzar');
let grabar = document.getElementById('grabar');
let detener = document.getElementById('detener');
let subir = document.getElementById('subir');
let repetir = document.getElementById('rewind');
let pasos = document.getElementsByTagName('h3');//arreglo con los botones de pasos 1,2,3
let block = 0;//variable de control para estilo de pasos

//OBJETO PARA CAPTURA DEL VIDEO
let mediaobject = {
  audio: false,
  video: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 }
  }
}

//VARIABLES PARA CONEXION CON LA API GIPHY

let api_key = "9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H"
let uri = "http://upload.giphy.com/v1/gifs";

//FUNCION QUE RECIBE EL VIDEO Y LO PROCESA

function cameractive() {

  navigator.mediaDevices.getUserMedia(mediaobject)
    .then(videostream)
    .then(pasoDos)
    .catch(err => {
      pasoNulo();
      console.error(err);

    })
}



function videostream(mediaStream) {

  block = 1;
  let recorder = RecordRTC(mediaStream, {
    type: 'gif'
  })
  let areavideo = document.querySelector('video');
  areavideo.srcObject = mediaStream;
  areavideo.play();
  areavideo.onloadedmetadata = function () { areavideo.play(); }
  btngrabar(recorder);

}



//ESTILO DE BOTONES Y TEXTO QUE SE ACTIVA AL PRESIONAR COMENZAR
let pasoUno = () => {
  pasos[0].style.backgroundColor = 'blue';
  pasos[0].style.color = 'white';
  let linea_uno = document.getElementsByClassName('titulos');
  linea_uno[0].textContent = "¿Nos das acceso";
  linea_uno[1].textContent = "a tu camara?";
  let linea_dos = document.getElementsByClassName('subtit');
  linea_dos[0].textContent = "El acceso a tu camara será válido sólo";
  linea_dos[1].textContent = "por el tiempo en el que estés creando el GIFO";
  cameractive();
}

//ESTILO DE LOS BOTONES Y TEXTO QUE SE APLICA SI EL USUARIO NO PERMITE ACCESO O BLOQUEA LA CAMARA
let pasoNulo = () => {
  pasos[0].style.backgroundColor = 'white';
  pasos[0].style.color = 'blue';
  let linea_uno = document.getElementsByClassName('titulos');
  linea_uno[0].textContent = "Aquí podrás";
  linea_uno[1].textContent = "crear tus propios GIFOS";
  let linea_dos = document.getElementsByClassName('subtit');
  linea_dos[0].textContent = "¡Crea tu GIFO en sólo 3 pasos!";
  linea_dos[1].textContent = "(sólo necesitas una cámara para grabar un video)";
  alert('se necesita acceso a tu camara');
}

let pasoDos = () => {
  let titulos = document.getElementsByClassName('titulos');
  let subtitulos = document.getElementsByClassName('subtit');

  for (let y = 0; y < subtitulos.length; y++) {
    subtitulos[y].style.visibility = 'hidden';

  }
  for (let x = 0; x < titulos.length; x++) {
    titulos[x].style.visibility = 'hidden';

  }

  if (block === 1) {
    pasos[1].style.backgroundColor = 'blue';
    pasos[1].style.color = 'white';
    pasos[0].style.background = 'white';
    pasos[0].style.color = 'blue';

  } else {
    pasoNulo();
  }

}

let pasoTres = () => {
  pasos[0].style.backgroundColor = 'white';
  pasos[0].style.color = 'blue';
  pasos[1].style.background='white';
  pasos[1].style.color='blue';
  pasos[2].style.background='blue';
  pasos[2].style.color='white';
}

var btndetenido = 0;


function rewind() {

  let btncronometro = document.getElementById('cronometro');
  btncronometro.style.visibility = 'hidden';
  let contador = '00:00:00';
  btncronometro.innerHTML = contador;
  repetir.style.visibility = 'visible';
  repetir.addEventListener('click', () => {
    btncronometro.style.visibility = 'visible';
    repetir.style.visibility = 'hidden';
    subir.style.visibility = 'hidden';
    grabar.style.visibility = 'visible';
    btndetenido = 0;


  });

}
function btngrabar(mediaStream) {
  let recorder = mediaStream;
  iniciar.style.visibility = 'hidden';
  grabar.style.visibility = 'visible';
  grabar.addEventListener('click', () => {
    alert('Presiona OK cuando estes listo!');
    recorder.startRecording();
    detener.style.visibility = 'visible';
    grabar.style.visibility = 'hidden';
    startcronos();
    console.log(btndetenido);
    stoprecorder(recorder);
    pasoTres();
    
  });
}

function stoprecorder(recorder) {
  detener.addEventListener('click', () => {
    alert('Tu video finalizo con exito, ahora puedes subirlo!');
    detener.style.visibility = 'hidden';
    subir.style.visibility = 'visible';
    alert('el video se detuvo');
    btndetenido = 1;
    console.log(btndetenido);
    rewind();
    recorder.stopRecording(() => {
      let blob = recorder.getBlob();
      subirGifo(blob);
    })


  })

}


function btncomenzar() {
  iniciar.addEventListener('click', pasoUno);

}
btncomenzar();

if (!localStorage.getItem('misGifos')) {
  localStorage.setItem('misGifos', '[]');

}
let misGifos = JSON.parse(localStorage.getItem('misGifos'));
console.log(misGifos);


//FUNCION QUE SUBIRA GIFO A LA API
function subirGifo(blob) {
  subir.addEventListener('click', () => {
    alert('subiendo gifo a la api');
    subir.style.visibility='hidden';
    repetir.style.visibility='hidden';
    pasoTres();
    
    let form = new FormData();
    form.append('file', blob, 'mygif.gif');
    console.log(form.get('file'));


    fetch((uri + "?api_key=" + api_key), {
      method: 'POST',
      body: form
      
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        let idGifoSubido=json.data.id;
        misGifos.push(idGifoSubido);
        console.log(idGifoSubido);
        localStorage.setItem('misGifos', JSON.stringify(misGifos));
        console.log(localStorage.misGifos);
      }

      )
      .catch(err => console.error(err));

  })

  
        
        
        
}



function startcronos() {
  let cronoUno = new Date();
  let tiempoO = cronoUno.getTime();
  tempo(tiempoO);
}



function tempo(a) {
  let tempoOrigin = a;
  var interval = setInterval(() => {
    if (btndetenido === 0) {
      let cronoDos = new Date();
      let tempoFinal = cronoDos.getTime();
      calculaTempo(tempoFinal, tempoOrigin);
    }
    else {
      console.log('el video fue detenido');
      clearInterval(interval);

    }
  }, 1000);


}

function calculaTempo(tf, to) {
  let reloj = [];
  let milis = tf - to;
  let minutos = 0;
  let segundos = 0;
  let horas = '00';
  let areacrono = document.getElementById('cronometro');


  if (milis < 180000) {
    minutos = parseInt(milis / 60000);
    segundos = parseInt((milis % 60000) / 1000);

    if (segundos < 10) {
      let sechar = '0' + segundos;
      reloj.push(sechar);
    }
    else {
      reloj.push(segundos);
    }

    if (minutos < 10) {
      let minchar = '0' + minutos + ':';
      reloj.push(minchar);
    }
    else {
      reloj.push(minutos + ':');
    }
    let contador = horas + ':' + reloj[1] + reloj[0];
    areacrono.innerHTML = contador;
  }
  else {
    alert('el tiempo del video excede los 10 minutos');
  }
}


//IR A PAGINA PRINCIPAL
let vinculo=document.getElementById('logo');
vinculo.addEventListener('click',()=>{
    let index=document.createElement('a');
    index.href="/index.html";
    index.click();
})
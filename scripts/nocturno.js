//PASAR ESTO A NOCTURNO SCSS DESPUES
function nocturno() {
    document.addEventListener('click',e=>{
        if (e.target.id==='modoNoc') {
            
            document.body.style.background='#37383c';
            let listaNoc=document.getElementsByTagName('li');
            listaNoc[0].innerHTML='MODO DIURNO';
            for (let index = 0; index < listaNoc.length; index++) {
                listaNoc[index].className='listaNoc';
            }
            let logoNoc=document.getElementById('logo');
            logoNoc.src='/images/Logo-modo-noc.svg';
            let btncrearGifo=document.getElementById('boton_gifo');
            btncrearGifo.src='/images/CTA-crear-gifo-modo-noc.svg';
            let btnsliderLeft=document.getElementById('sleft');
            btnsliderLeft.src='/images/button-slider-left-md-noct.svg';
            let btnsliderRight=document.getElementById('sright');
            btnsliderRight.src='/images/button-slider-right-md-noct.svg';
            let btnmas=document.getElementById('mas');
            btnmas.id='masNoc';
            btnmas.src='/images/CTA-ver+-modo-noc.svg';
            let tituloUno=document.getElementById('p0');
            tituloUno.style.color='white';
            let boxBuscar=document.getElementById('listSearch');
            boxBuscar.id='listNoc';
            let boxTexto=document.getElementById('buscar');
            boxTexto.style.color='white';
            let resultados=document.getElementById('results');
            resultados.style.color='#9CAFC3';
            resultados.style.fontFamily='Roboto, sans-serif';
            resultados.style.listStyle='url(/images/icon-search.svg)'
            let head=document.getElementsByTagName('header');
            head[0].style.borderTop='none';
            let titSec=document.getElementsByTagName('h1');
            titSec[0].style.color='white';
            let trending=document.getElementById('spantrending');
            trending.style.color='white';
    
            
            let subtitsec=document.getElementsByTagName('h2');
            subtitsec[0].style.color='white';
            subtitsec[1].style.color='white';
            let p1=document.getElementById('topicTren');
            p1.style.color='white';
            let carrusel=document.getElementById('trending');
            carrusel.style.backgroundColor='#222326';
            let compartir=document.getElementById('compartir');
            compartir.style.color='white';
            let copyright=document.getElementById('copyright');
            copyright.style.color='white';
            let twitter=document.getElementById('twitter');
            twitter.src="/images/icon_twitter_noc.svg";
            let titSecNoc=document.getElementById('secTrending');
            titSecNoc.style.backgroundColor='#222326';
    
    
    
    
        }
    })
        
} 
nocturno();

let link=document.getElementsByTagName('link');

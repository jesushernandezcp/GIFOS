let imagenfavorita=JSON.parse(localStorage.getItem('favoritos'));
//console.log(imagenfavorita);

let pintar=document.getElementById('showfav');

for (let r = 0; r <12; r++) {
    
        let iconos=`
        <div class="gifav">
            <img class="imgfav" src=${imagenfavorita[r]}>
            <img class="favsec" src='/images/icon-fav-active.svg' alt="">
            <img class="down" src='/images/icon-download.svg' alt="">
            <img class="exp" src='/images/icon-max-normal.svg' alt="">  
            <img class="trash" id=${imagenfavorita[r]} src='/images/icon-trash-normal.svg' alt="">  
        </div>
        `
        pintar.innerHTML+=iconos;   
        //pintar.innerHTML='aqui va una imagen';
        
   
    
}




let api_key="9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";
let uri="https://api.giphy.com/v1/gifs/trending";
var trendingurl=[];



//FUNCION PARA GUARDAR LAS URL DE LOS TRENDING GIFOS EN UN ARREGLO
function giphy() {
   
    fetch(uri+"?api_key="+api_key+"&limit=12")
    .then(response=> response.json())
    .then(json=>{
        
        
        for (let index = 0; index < json.data.length; index++) {
            trendingurl.push(json.data[index].images.fixed_height.url);
            //console.log(trendingurl[index]);
            //console.log(index);
            
            }
            
            
            })
    .then(cargar())
        
        
    .catch(err => console.error(err));

};     

giphy();



cargar();
//FUNCION CARGAR IMAGEN

function cargar() {
    let images=document.getElementsByClassName('especial');
    let iconfav=document.getElementsByClassName('fav');

    for (let index = 0; index < images.length; index++) {
        
        images[index].setAttribute('src',trendingurl[index]);
        
    }
    for (let k = 0; k < iconfav.length; k++) {
        iconfav[k].setAttribute('id',trendingurl[k]);
        
    }        
}



//FUNCION DESLIZAMIENTO A LA IZQUIERDA
function SliderLeft() {
    
    var temp=trendingurl[0];
    for (let i = 0; i < ((trendingurl.length-1)); i++) {
       
        trendingurl[i]=trendingurl[i+1];
        };
        trendingurl[11]=temp;
    trendingurl[trendingurl.length-1]=temp;    
    //console.log(trendingurl);
    cargar();
}

//FUNCION DESLIZAMIENTO A LA DERECHA

function SlideRight() {
    var temp2=trendingurl[11];

    for (let index = 11; index > ((trendingurl.length-12)); index--) {
        trendingurl[index]=trendingurl[index-1];
        console.log('la posiscion',index,'es igual a ',index-1);
    }
    trendingurl[0]=temp2;
    //console.log(trendingurl);
    cargar();
}

//EVENTO BOTON SLIDER LEFT

let sleft=document.getElementById('sleft');
sleft.addEventListener('click',()=>SlideRight());

//EVENTO BOTON SLIDER RIGHT * AMBOS EVENTOS PUEDE ESTAR DENTRO DE UNA MISMA FUNCION ACTIVA, REVISAR TARGET

let sright=document.getElementById('sright');
sright.addEventListener('click',()=>SliderLeft());





if(!localStorage.getItem('favoritos')){
    localStorage.setItem('favoritos','[]');
}

let favoritos =JSON.parse( localStorage.getItem('favoritos'));

document.addEventListener('click',e=>{
        
    //console.log(e.target);
    if (e.target.classList.contains('fav')) {
        let elemento=e.target.id;
        console.log(elemento);
        favoritos.push(elemento);
        localStorage.setItem('favoritos',JSON.stringify(favoritos));
        
        //console.log(e.target.parentElement);
    }

    e.stopPropagation();
});

//funcion para borrar un elemento del localstorage

document.addEventListener('click',e=>{
    if(e.target.classList.contains('trash')){
        let evaluado=e.target.id;
        let indexevaluado=favoritos.findIndex(x=>x===evaluado);
        favoritos.splice(indexevaluado,1);
        localStorage.setItem('favoritos',JSON.stringify(favoritos));

    }
      
    

    e.stopPropagation();
});
console.log(favoritos);

let corazonlleno=document.getElementsByClassName('favsec');
for (let index = 0; index < corazonlleno.length; index++) {
    corazonlleno[index].addEventListener('mouseover',e=>{
        e.target.classList.toggle('favsec');
    });
for (let index = 0; index < corazonlleno.length; index++) {
    corazonlleno[index].addEventListener('mouseout',e=>{
        e.target.classList.toggle('favsec');
    })
   
    
}
  
}
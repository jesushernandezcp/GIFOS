//document.addEventListener('DOMContentLoaded',()=>alert('bienvenido'));

let api_key="9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";
let uri="https://api.giphy.com/v1/gifs/trending";
var trendingurl=[];

//funcion fetch para ver todos los datos del json
const data=()=>{
    fetch(uri+"?api_key="+api_key+"&limit=12")
    .then(response=> response.json())
    .then(json=>console.log(json));
    
}




//FUNCION PARA GUARDAR LAS URL DE LOS TRENDING GIFOS EN UN ARREGLO
function giphy() {
   
    fetch(uri+"?api_key="+api_key+"&limit=12")
    .then(response=> response.json())
    .then(json=>{
        
        
        for (let index = 0; index < json.data.length; index++) {
            trendingurl.push(json.data[index].images.fixed_height.url);
            console.log(trendingurl[index]);
            console.log(index);
            
            }
            
            
            })
    .then(cargar())
 
        
    .catch(err => console.error(err));

};     
    
giphy();

//FUNCION CARGAR IMAGEN

function cargar() {
    let images=document.getElementsByClassName('especial');
    let iconfav=document.getElementsByClassName('fav');
    let icondown=document.getElementsByClassName('down');

    for (let index = 0; index < images.length; index++) {
        
        images[index].setAttribute('src',trendingurl[index]);
        
    }
    for (let k = 0; k < iconfav.length; k++) {
        iconfav[k].setAttribute('id',trendingurl[k]);
        icondown[k].setAttribute('id',trendingurl[k]);

    }        
}


//cargar();




//FUNCION DESLIZAMIENTO A LA IZQUIERDA
function SliderLeft() {
    
    var temp=trendingurl[0];
    for (let i = 0; i < ((trendingurl.length-1)); i++) {
       
        trendingurl[i]=trendingurl[i+1];
        };
        trendingurl[11]=temp;
    trendingurl[trendingurl.length-1]=temp;    
    console.log(trendingurl);
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
    console.log(trendingurl);
    cargar();
}

//EVENTO BOTON SLIDER LEFT

let sleft=document.getElementById('sleft');
sleft.addEventListener('click',()=>SlideRight());

//EVENTO BOTON SLIDER RIGHT * AMBOS EVENTOS PUEDE ESTAR DENTRO DE UNA MISMA FUNCION ACTIVA, REVISAR TARGET

let sright=document.getElementById('sright');
sright.addEventListener('click',()=>SliderLeft());

//giphy();



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

document.addEventListener('click',e=>{
    
    if(e.target.classList.contains('down')){
        let url=e.target.id;
        //console.log(url);
    window.open(url);
    //window.open('https://media0.giphy.com/media/1lk1IcVgqPLkA/giphy.gif?cid=767a6ec3jwqdwlcsdh89cpoq65xd1m50iylbocenkwebd84u&rid=giphy.gif&ct=g');
    }
    e.stopPropagation();
});

let api_key="9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";
let uri="https://api.giphy.com/v1/stickers/random"
let resultado=document.getElementById("result");
let imagen=document.createElement('img');
let lista=document.createElement('div');

    function giphy() {
        fetch(uri+"?api_key="+api_key)
          
        .then(response => response.json())
        .then( json => {
                console.log(json);
                let undato=json.data.images.original.url;
                console.log(undato);
                imagen.src=undato;
                resultado.appendChild(imagen);
            })
            .catch(err => console.error(err));
            
        };

let boton=document.getElementById("search");
addEventListener("click",giphy());

//FUNCION DE AUTOCOMPLETADO

let listaresultados=document.getElementById("autoresult");
let listelement=document.createElement("h3");
listelement.textContent="probando"
listaresultados.appendChild(listelement);


const autocomplete=()=>{
    
    let barra=document.querySelector("input")
    let palabra=barra.value;
    let uriauto="https://api.giphy.com/v1/gifs/search/tags"
    let limite=10;
    fetch(uriauto+"?api_key="+api_key+"&q="+palabra+"&limit="+limite)
        .then(response=>response.json())
        .then(arreglo=>{
        
            console.log(arreglo);
            
            for (let index = 0; index < arreglo.length; index++) {
                ;
                resultado.innerHTML=arreglo.data[index].name;
                //`
                //<h3>${arreglo.data[index].name}
                //`

            }
            
            
                resultado.innerHTML=arreglo.data[3].name;    
            
            

            
    })
    .catch(err => console.error(err));
}

var xhr=()=>{
    fetch("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H&limit=5")
    .then(response=>response.json())
    .then(json=>{
        console.log("success got data", json.data[3].url);
        lista.innerHTML=json.data[3].url;
    })
    .catch(error=>console.error(error));
    
}

//barra.onclick=function () {alert(barra.value)
    



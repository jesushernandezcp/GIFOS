let api_key="9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";
let uri="https://api.giphy.com/v1/stickers/random"
let misgifos=document.getElementById("grid_gifos");
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

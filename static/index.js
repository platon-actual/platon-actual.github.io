// Ramiro Ivan Rios 2022.
// UPDATE 2024-09-28: lo preparo para subir a platon-actual.github.io

import Background3D from './background_3d';
import Scroll from './scroll';
// import './style.css'

createChefSuggestion( 50,   "LEFT", "Programación Web");
createChefSuggestion( 600,  "RIGHT", " Diseño 3D");
createChefSuggestion( 1200,  "LEFT", " Impresión 3D");
createChefSuggestion( 1800, "RIGHT","Desarrollo de videojuegos");
createChefSuggestion( 2400, "LEFT", "Desarrollo de apps mobile");
createChefSuggestion( 3000, "RIGHT", " Servicios digitales");

let window_scroll = new Scroll({onScroll: updateHeight});
let fondo = new Background3D();
fondo.animate();


var resizer;

window.onresize = function(){
    clearTimeout( resizer );
    resizer = setTimeout(()=>{fondo.resizeWindow();}, 100);
}

function updateHeight() {
    fondo.updateHeight(window_scroll.position());
    // console.log("update height " + window_scroll.position());
}


// Esto lo hice en 2022 pero no funciona como esperaba...
function createChefSuggestion(position, side, text) {
    console.log('BEGIN create chef suggestion');
    let new_div = document.createElement('div');
    new_div.classList.add('chef_suggestion');
    new_div.innerHTML = text;
    new_div.style.top = position + 'px';
    if(side == "LEFT") {
        new_div.style.left = '10px';
        new_div.style.marginLeft = '1rem'
    }
    else {
        new_div.style.right = '10px';
        new_div.style.marginRight = '1rem'
    }

    document.body.appendChild(new_div);
    console.log('FIN create chef suggestion');
}
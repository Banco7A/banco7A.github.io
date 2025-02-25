document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('section').forEach(div => {
        div.style.display = 'none'
    })
    document.getElementById('homeDiv').style.display = 'flex'
    abrirFerramenta(localStorage.getItem('ultimaFerramenta'))
});

let divButtons = document.querySelectorAll("section div div");

divButtons.forEach(div => {
    let buttons = Array.from(div.querySelectorAll("button"));

    buttons.forEach((btn, index) => {
        let separator = document.createElement("span");
        separator.classList.add("separator");

        if (index < buttons.length - 1) {
            btn.after(separator);
        }
    });
});

document.getElementById('ferramentas').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        abrirFerramenta(btn.id + 'Div')
    })
})

document.getElementById('ferramentasPix').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        abrirFerramenta(btn.id + 'Div')
    })
})

document.getElementById('contatosrecentes').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        localStorage.setItem('contatoselecionado', btn.innerText)
        abrirFerramenta('transferirDiv')
    }) 
})

document.getElementById('cartoes').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        abrirFerramenta(btn.id + 'Div')
    }) 
})

function abrirFerramenta(btn) {
    localStorage.setItem('ultimaFerramenta', btn)
    document.querySelectorAll('section').forEach(div => {
        div.style.display = 'none'
    })
    document.getElementById(btn).style.display = 'flex'
}

function abrirPopUp(popUp) {
    document.getElementById(popUp).classList.toggle('active')
    document.body.classList.toggle('popUpActive')
}

let canSee = true;
let valoresOriginais = [];

document.getElementById('ocultar').addEventListener('click', () => {
    document.querySelectorAll('.valor').forEach((valor, index) => {
        if (canSee) {
            if (!valoresOriginais[index]) {
                valoresOriginais[index] = valor.innerHTML;
            }
            valor.innerHTML = 'R$ --,--';
        } else {
            valor.innerHTML = valoresOriginais[index];
        }
    });

    canSee = !canSee; 
});

let criarCofrinho = document.getElementById('criarCofrinho')
let objetivoCofrinho

criarCofrinho.querySelector('#header .xbtn').addEventListener('click', () => {
    criarCofrinho.querySelector('#objetivoCofrinhoDiv').style.display = 'grid';
    criarCofrinho.querySelector('#nomeCofrinhoDiv').style.display = 'none';
});

criarCofrinho.querySelector('#objetivoCofrinhoDiv').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('nomeCofrinho').innerText = '';
        objetivoCofrinho = btn.querySelector('p').innerText;

        if (btn.querySelector('p').innerText == 'Criar outro') {
            objetivoCofrinho = '';
        }

        criarCofrinho.querySelector('#objetivoCofrinhoDiv').style.display = 'none';
        criarCofrinho.querySelector('#nomeCofrinhoDiv').style.display = 'block';

        let fotoCofrinho = btn.querySelector('img') ? btn.querySelector('img').src : ''; 
        let imgCofrinho = document.getElementById('prewiew');

        imgCofrinho.src = fotoCofrinho;
        document.getElementById('nomeCofrinho').innerText = objetivoCofrinho;
    });
});

document.getElementById('edit-btn').addEventListener('click', () => {
    document.getElementById("fileInput").click();
});     

document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let imgCofrinho = criarCofrinho.querySelector('#nomeCofrinhoDiv').querySelector('img');
            imgCofrinho.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function validarEntrada(event, regex) {
    const div = event.target;
    let textoLimpo = div.innerText.replace(regex, '');

    if (div.innerText !== textoLimpo) {
        div.innerText = textoLimpo;

        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(div);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function bloquearTeclas(event, regex) {
    if (!regex.test(event.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
    }
}

function bloquearColagem(event, regex) {
    event.preventDefault();
    const textoColado = (event.clipboardData || window.clipboardData).getData('text');
    const textoFiltrado = textoColado.replace(regex, '');
    document.execCommand('insertText', false, textoFiltrado);
}

const valorCofrinho = document.getElementById('valorCofrinho');
valorCofrinho.addEventListener('input', function(event) { validarEntrada(event, /[^0-9,]/g); });
valorCofrinho.addEventListener('keydown', function(event) { bloquearTeclas(event, /[0-9,]/); });
valorCofrinho.addEventListener('paste', function(event) { bloquearColagem(event, /[^0-9,]/g); });

const tempoCofrinho = document.getElementById('tempoCofrinho');
tempoCofrinho.addEventListener('input', function(event) { validarEntrada(event, /[^0-9]/g); });
tempoCofrinho.addEventListener('keydown', function(event) { bloquearTeclas(event, /[0-9]/); });
tempoCofrinho.addEventListener('paste', function(event) { bloquearColagem(event, /[^0-9]/g); });

const guardarCofrinho = document.getElementById('guardarCofrinho');
guardarCofrinho.addEventListener('input', function(event) { validarEntrada(event, /[^0-9,]/g); });
guardarCofrinho.addEventListener('keydown', function(event) { bloquearTeclas(event, /[0-9,]/); });
guardarCofrinho.addEventListener('paste', function(event) { bloquearColagem(event, /[^0-9,]/g); });


let contadorCofrinho = 1

document.getElementById('criarCofrinhoBtn').addEventListener('click', () => {
    let nomeCofrinho = document.createElement('h5');
    nomeCofrinho.innerHTML = document.getElementById('nomeCofrinho').innerText;

    let valorCofrinho = document.createElement('p');
    valorCofrinho.innerHTML = document.getElementById('valorCofrinho').innerText;

    let tempoCofrinho = document.createElement('p');
    tempoCofrinho.innerHTML = document.getElementById('tempoCofrinho').innerText;

    let guardarCofrinho = document.createElement('h3');
    guardarCofrinho.innerHTML = document.getElementById('guardarCofrinho').innerText;

    let imgCofrinho = document.createElement('img');
    imgCofrinho.src = document.getElementById('prewiew').src;

    let div = document.createElement('div')
    div.id = 'cofrinho' + 1
    contadorCofrinho++;

    div.appendChild(nomeCofrinho);
    div.appendChild(valorCofrinho);
    div.appendChild(tempoCofrinho);
    div.appendChild(guardarCofrinho);
    div.appendChild(imgCofrinho);

    document.getElementById('seusCofrinhos').appendChild(div)
})

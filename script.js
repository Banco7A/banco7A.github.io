document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('section').forEach(div => {
        div.style.display = 'none'
    })
    document.getElementById('homeDiv').style.display = 'flex'
    criarSeparadores()
});

let divButtons = document.querySelectorAll("section div div");

function criarSeparadores() {
    document.querySelectorAll('.separator').forEach(e => {
        e.remove('')
    })

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
    
}

document.getElementById('ferramentas').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        abrirFerramenta(btn.id + 'Div')
        criarSeparadores()
    })
})

document.getElementById('ferramentasPix').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        abrirFerramenta(btn.id + 'Div')
        criarSeparadores()
    })
})

document.getElementById('contatosrecentes').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        localStorage.setItem('contatoselecionado', btn.innerText)
        abrirFerramenta('transferirDiv')
        criarSeparadores()
    }) 
})

document.getElementById('cartoes').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        abrirFerramenta(btn.id + 'Div')
        criarSeparadores()
    }) 
})

function abrirFerramenta(btn) {
    let todasAsDivs = document.querySelectorAll('section');
    let novaDiv = document.getElementById(btn);

    todasAsDivs.forEach(div => {
        if (div.id !== btn) {
            div.style.transition = 'opacity 0.3s ease-in-out';
            div.style.opacity = '0';

            setTimeout(() => {
                div.style.visibility = 'hidden';
                div.style.display = 'none';
            }, 300);
        }
    });

    setTimeout(() => {
        if (novaDiv) {
            novaDiv.style.display = 'flex';
            novaDiv.style.visibility = 'visible';
            novaDiv.style.opacity = '0'; 
            novaDiv.style.transition = 'opacity 0.3s ease-in-out';

            setTimeout(() => {
                novaDiv.style.opacity = '1'; 
            }, 20); 
        }
    }, 300); 
}

function abrirPopUp(popUp) {
    document.getElementById(popUp).classList.toggle('active')
    document.body.classList.toggle('popUpActive')
}

let canSee = true;
let valoresOriginais = [];

document.getElementById('ocultar').addEventListener('click', () => {
    if (document.getElementById('ocultar').querySelector('i').classList.contains('fa-eye')) {
        document.getElementById('ocultar').querySelector('i').classList.remove('fa-eye')
        document.getElementById('ocultar').querySelector('i').classList.add('fa-eye-slash')
    } else {
        document.getElementById('ocultar').querySelector('i').classList.remove('fa-eye-slash')
        document.getElementById('ocultar').querySelector('i').classList.add('fa-eye')
    }
    
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

criarCofrinho.querySelector('#criarCofrinho .header .xbtn').addEventListener('click', () => {
    criarCofrinho.querySelector('#objetivoCofrinhoDiv').style.display = 'grid';
    criarCofrinho.querySelector('#nomeCofrinhoDiv').style.display = 'none';
});

criarCofrinho.querySelector('#objetivoCofrinhoDiv').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('nomeCofrinho').innerText = '';
        document.getElementById('valorCofrinho').innerText = '';
        document.getElementById('tempoCofrinho').innerText = '';
        document.getElementById('guardarCofrinho').innerText = '';

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

document.getElementById("fileInput").addEventListener("change", function (event) {
    let file = event.target.files[0]; 
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("prewiew").src = e.target.result;
        };
        reader.readAsDataURL(file); 
    }
});


document.getElementById('edit-btn').addEventListener('click', () => {
    document.getElementById("fileInput").click();
});     

document.querySelectorAll('.inputEspecial').forEach(div => {
    div.addEventListener('input', function(event) {
        let divEvent = event.target;

        let valor = divEvent.innerText.replace(/\D/g, '');

        if (valor.length > 0) {
            valor = (parseFloat(valor) / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        } else {
            valor = "R$ 0,00";
        }

        if (divEvent.innerText !== valor) {
            divEvent.innerText = valor;

            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(divEvent);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    div.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
});

document.getElementById('tempoCofrinho').addEventListener('input', (event) => {
    let div = event.target;
    div.innerText = div.innerText.replace(/\D/g, ''); 

    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(div);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
});


let contadorCofrinho = 1

function salvarCofrinhos() {
    let cofrinhos = [];
    document.querySelectorAll("#seusCofrinhos > div").forEach(div => {
        let cofrinho = {
            nome: div.querySelector(".nomeCofrinho").innerText,
            valor: div.querySelector(".valorCofrinho").innerText,
            imagem: div.querySelector(".imgCofrinho").src,
            tempo: div.getAttribute("data-tempo"),
            guardar: div.getAttribute("data-guardar")
        };
        cofrinhos.push(cofrinho);
    });

    localStorage.setItem("cofrinhos", JSON.stringify(cofrinhos));
}

function carregarCofrinhos() {
    let cofrinhosSalvos = localStorage.getItem("cofrinhos");
    if (cofrinhosSalvos) {
        let cofrinhos = JSON.parse(cofrinhosSalvos);
        cofrinhos.forEach(cofrinho => {
            adicionarCofrinho(cofrinho);
        });
    }
}

function adicionarCofrinho(data) {
    let div = document.createElement("div");
    div.id = "cofrinho" + contadorCofrinho;
    div.setAttribute("data-tempo", data.tempo);
    div.setAttribute("data-guardar", data.guardar);
    div.setAttribute("data-valor", data.valor);

    let nomeCofrinho = document.createElement("p");
    nomeCofrinho.classList.add("nomeCofrinho");
    nomeCofrinho.innerHTML = data.nome;

    let guardarCofrinho = document.createElement("h6"); 
    guardarCofrinho.classList.add("guardarCofrinho", "valor");
    guardarCofrinho.innerHTML = data.guardar;

    let imgCofrinho = document.createElement("img");
    imgCofrinho.classList.add("imgCofrinho");
    imgCofrinho.src = data.imagem;

    let i = document.createElement("i");
    i.classList.add("fas", "fa-trash");

    let button = document.createElement("button");
    button.id = contadorCofrinho + "Btn";
    button.classList.add("deletarCofrinho");
    button.appendChild(i);

    div.appendChild(nomeCofrinho);
    div.appendChild(guardarCofrinho);
    div.appendChild(imgCofrinho);
    div.appendChild(button);

    document.getElementById("seusCofrinhos").appendChild(div);

    contadorCofrinho++;

}

document.getElementById("criarCofrinhoBtn").addEventListener("click", () => {
    let nomeCofrinho = document.getElementById("nomeCofrinho").innerText.trim();
    let valorCofrinho = document.getElementById("valorCofrinho").innerText.trim();
    let tempoCofrinho = document.getElementById("tempoCofrinho").innerText.trim();
    let guardarCofrinho = document.getElementById("guardarCofrinho").innerText.trim();
    let imagem = document.getElementById("prewiew").src;

    if (nomeCofrinho === "" || valorCofrinho === "" || tempoCofrinho === "" || guardarCofrinho === "" || imagem === "") {
        alert("Por favor, preencha o nome e o valor do cofrinho antes de continuar.");
        return;
    }

    abrirFerramenta("cofrinhosDiv");
    abrirPopUp("criarCofrinho");

    let cofrinhoData = {
        nome: nomeCofrinho,
        valor: valorCofrinho,
        imagem: imagem,
        tempo: tempoCofrinho,
        guardar: guardarCofrinho
    };

    adicionarCofrinho(cofrinhoData);
    salvarCofrinhos();

    document.getElementById("nomeCofrinho").innerText = "";
    document.getElementById("valorCofrinho").innerText = "";
    document.getElementById("tempoCofrinho").innerText = "";
    document.getElementById("guardarCofrinho").innerText = "";
});

document.addEventListener('click', function(event) {
    if (event.target.closest('.deletarCofrinho')) {
        let btn = event.target.closest('.deletarCofrinho');
        let cofrinho = btn.parentElement;

        if (cofrinho) {
            let guardarCofrinho = cofrinho.getAttribute("data-guardar") || "O valor guardado";

            let confirmacao = confirm(`Realmente deseja apagar este cofrinho? ${guardarCofrinho} será retirado.`);
            
            if (confirmacao) {
                cofrinho.remove(); 
                salvarCofrinhos();
            }
        }
    }
});

let detalhesCofrinhoDiv = document.getElementById('detalhesCofrinhoDiv')

document.querySelector('#seusCofrinhos').addEventListener('click', (event) => {
    let cofrinho = event.target.closest('div');
    let detalhesCofrinhoDiv = document.getElementById('detalhesCofrinhoDiv');

    if (event.target.closest('.deletarCofrinho')) {
        return; 
    }

    if (cofrinho && detalhesCofrinhoDiv) {
        detalhesCofrinhoDiv.querySelector('#valorCofrinhoElement').innerText = 'de: ' + cofrinho.getAttribute("data-valor");
        detalhesCofrinhoDiv.querySelector('#nomeCofrinhoElement').innerText = cofrinho.querySelector('.nomeCofrinho').innerText;
        detalhesCofrinhoDiv.querySelector('#guardarCofrinhoElement').innerText = cofrinho.getAttribute("data-guardar");
        detalhesCofrinhoDiv.querySelector('#imgCofrinhoElement').src = cofrinho.querySelector('.imgCofrinho').src;
        
        abrirFerramenta('detalhesCofrinhoDiv');
    }

    localStorage.setItem('ultimoCofrinho', cofrinho.id)
});

document.addEventListener("DOMContentLoaded", carregarCofrinhos);

document.getElementById('guardarMaisCofrinho').addEventListener('click', () => {
    abrirPopUp('guardarMaisDiv')
})

document.querySelector('#guardarMaisDiv .xbtn').addEventListener('click', () => {
    document.querySelector('#guardarMaisDiv').classList.remove('active')
    document.body.classList.remove('popUpActive')
})

document.getElementById('editarCofrinhoAtual').addEventListener('click', () => {
    let ultimoCofrinhoId = localStorage.getItem('ultimoCofrinho');
    abrirPopUp('editarCofrinho');

    let cofrinhos = JSON.parse(localStorage.getItem('cofrinhos')) || [];
    let cofrinho = cofrinhos.find(c => c.id === ultimoCofrinhoId);

    document.getElementById('editarNomeCofrinho').innerText = cofrinho.nome;
    document.getElementById('editarValorCofrinho').innerText = cofrinho.valor;
    document.getElementById('editarPrewiew').src = cofrinho.imagem;
});

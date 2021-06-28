var contId = 0;
var contObject = 0;
var nomeLength;

var catId = [0, 1, 2, 3, 4];

var catNome = [
    'Agricultura',
    'Construção',
    'Eletrecidade',
    'Ladrilho',
    'Pesca'
];

var catDesc = [
    'Corta Relvas, Pulverizador, Picarete...',
    'Formas, Carros de Mão, Marreta...',
    'Dijuntores, Lâmpadas, Suporte...',
    'Mosáicos, Cimento cola...',
    'Anzóis, Canas de Pesca...'
];

var prodEletrecidadeId = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var prodEletrecidadeNome = [
    'Disjuntor Monofásico',
    'Disjuntor Bifásico',
    'Disjuntor Trifásico',
    'Alicate',
    'Lâmpada Incadescente',
    'Lâmpada Florescente',
    'Suporte',
    'Suporte de Parede',
    'Tomada'
];

var prodEletrecidadePreco = [
    1000,
    1500,
    2000,
    500,
    200,
    300,
    100,
    200,
    200
];

var prodConstrucaoId = [0, 1, 2, 3, 4, 5, 6];

var prodConstrucaoNome = [
    'Pá',
    'Carro de Mão',
    'Chapa',
    'Teto de Rosalite',
    'Marreta Curta',
    'Marreta Comprida',
    'Martelo'
];

var prodConstrucaoPreco = [
    500,
    2500,
    2000,
    3500,
    1000,
    2000,
    500
];

var prodLadrilhoId = [0, 1, 2];

var prodLadrilhoNome = [
    'Cimento Cola - 5Kg',
    'Mosáico Branco',
    'Mosáico Preto'
];

var prodLadrilhoPreco = [
    1500,
    2000,
    2000
];

var prodPescaId = [0, 1, 2, 3];

var prodPescaNome = [
    'Cana de Pesca',
    'Cana de Pesca Moderno',
    'Anzol',
    'Anzol Triplo'
];

var prodPescaPreco = [
    4000,
    5000,
    1000,
    3000
];

var prodAgriculturaId = [0, 1, 2];

var prodAgriculturaNome = [
    'Corta Relvas',
    'Pulverizador',
    'Picarete'
];

var prodAgriculturaPreco = [
    10000,
    7000,
    2000
];

function showAllProd(_appendAll, _whereAll) {
    showConstruçãoProdutos(_appendAll, _whereAll);
    showEletrecidadeProdutos(_appendAll, _whereAll);
    // showLadrilhoProdutos(_appendAll, _whereAll);
    // showPescaProdutos(_appendAll, _whereAll);
}

function showEletrecidadeProdutos(_append, _where) {
    let _src;
    if (_where == 'index') {
        _src = '';
    } else if('search') {
        document.getElementById('' + _append + '').innerHTML = '';
        document.getElementById('contentClosePostsCat').setAttribute('class', 'show');
        _src = '../';
    } else {
        // document.getElementById('' + _append + '').innerHTML = '';
        document.getElementById('contentClosePostsCat').setAttribute('class', 'show');
        _src = '../';
    }
    for (let cont = 0; cont < prodEletrecidadeId.length; cont++) {
        document.getElementById('' + _append + '').innerHTML += `
            <div  id="prodHideEletrecidade${cont}" class="col s10 m5 l4 push-s1 push-m1">
                <div class="card card-prod">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${_src}img/produtos/eletrecidade${prodEletrecidadeId[cont]}.png">
                    </div>
                    <div class="card-content">
                        <h4 class="card-title activator">
                            ${prodEletrecidadeNome[cont]}
                        </h4>
                    </div>
                    <div class="card-btn">
                        <a class="btn green waves-effect" style="width: 100%">+ carrinho</a>
                    </div>
                    
                    <div class="card-reveal">
                        <span class="card-title">
                            ${prodEletrecidadeNome[cont]}
                            <i class="uping fas fa-angle-down right"></i>
                        </span>
                        <br> <br>
                        <p>
                            <span class="preco green-text">${prodEletrecidadePreco[cont]}Kz</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

function showConstruçãoProdutos(_append, _where) {
    let _src;
    if (_where == 'index') {
        _src = '';
    } else {
        document.getElementById('' + _append + '').innerHTML = '';
        document.getElementById('contentClosePostsCat').setAttribute('class', 'show');
        _src = '../';
    }
    for (let cont = 0; cont < prodConstrucaoId.length; cont++) {
        document.getElementById('' + _append + '').innerHTML += `
            <div  id="prodHideConstrucao${cont}" class="col s10 m5 l4 push-s1 push-m1">
                <div class="card card-prod">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${_src}img/produtos/construcao${prodConstrucaoId[cont]}.png">
                    </div>
                    <div class="card-content">
                        <h4 class="card-title activator">
                            ${prodConstrucaoNome[cont]}
                        </h4>
                    </div>
                    <div class="card-btn">
                        <a class="btn green waves-effect" style="width: 100%">+ carrinho</a>
                    </div>
                    
                    <div class="card-reveal">
                        <span class="card-title">
                            ${prodConstrucaoNome[cont]}
                            <i class="uping fas fa-angle-down right"></i>
                        </span>
                        <br> <br>
                        <p>
                            <span class="preco green-text">${prodConstrucaoPreco[cont]}Kz</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

function showLadrilhoProdutos(_append, _where) {
    let _src;
    if (_where == 'index') {
        _src = '';
    } else {
        document.getElementById('' + _append + '').innerHTML = '';
        document.getElementById('contentClosePostsCat').setAttribute('class', 'show');
        _src = '../';
    }
    for (let cont = 0; cont < prodLadrilhoId.length; cont++) {
        document.getElementById('' + _append + '').innerHTML += `
            <div  id="prodHideLadrilho${cont}" class="col s10 m5 l4 push-s1 push-m1">
                <div class="card card-prod">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${_src}img/produtos/ladrilho${prodLadrilhoId[cont]}.png">
                    </div>
                    <div class="card-content">
                        <h4 class="card-title activator">
                            ${prodLadrilhoNome[cont]}
                        </h4>
                    </div>
                    <div class="card-btn">
                        <a class="btn green waves-effect" style="width: 100%">+ carrinho</a>
                    </div>
                    
                    <div class="card-reveal">
                        <span class="card-title">
                            ${prodLadrilhoNome[cont]}
                            <i class="uping fas fa-angle-down right"></i>
                        </span>
                        <br> <br>
                        <p>
                            <span class="preco green-text">${prodLadrilhoPreco[cont]}Kz</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

function showPescaProdutos(_append, _where) {
    let _src;
    if (_where == 'index') {
        _src = '';
    } else {
        document.getElementById('' + _append + '').innerHTML = '';
        document.getElementById('contentClosePostsCat').setAttribute('class', 'show');
        _src = '../';
    }
    for (let cont = 0; cont < prodPescaId.length; cont++) {
        document.getElementById('' + _append + '').innerHTML += `
            <div  id="prodHidePesca${cont}" class="col s10 m5 l4 push-s1 push-m1">
                <div class="card card-prod">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${_src}img/produtos/pesca${prodPescaId[cont]}.png">
                    </div>
                    <div class="card-content">
                        <h4 class="card-title activator">
                            ${prodPescaNome[cont]}
                        </h4>
                    </div>
                    <div class="card-btn">
                        <a class="btn green waves-effect" style="width: 100%">+ carrinho</a>
                    </div>
                    
                    <div class="card-reveal">
                        <span class="card-title">
                            ${prodPescaNome[cont]}
                            <i class="uping fas fa-angle-down right"></i>
                        </span>
                        <br> <br>
                        <p>
                            <span class="preco green-text">${prodPescaPreco[cont]}Kz</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

function showAgriculturaProdutos(_append, _where) {
    let _src;
    if (_where == 'index') {
        _src = '';
    } else {
        document.getElementById('' + _append + '').innerHTML = '';
        document.getElementById('contentClosePostsCat').setAttribute('class', 'show');
        _src = '../';
    }
    for (let cont = 0; cont < prodAgriculturaId.length; cont++) {
        document.getElementById('' + _append + '').innerHTML += `
            <div  id="prodHideAgricultura${cont}" class="col s10 m5 l4 push-s1 push-m1">
                <div class="card card-prod">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${_src}img/produtos/Agricultura${prodAgriculturaId[cont]}.png">
                    </div>
                    <div class="card-content">
                        <h4 class="card-title activator">
                            ${prodAgriculturaNome[cont]}
                        </h4>
                    </div>
                    <div class="card-btn">
                        <a class="btn green waves-effect" style="width: 100%">+ carrinho</a>
                    </div>
                    
                    <div class="card-reveal">
                        <span class="card-title">
                            ${prodAgriculturaNome[cont]}
                            <i class="uping fas fa-angle-down right"></i>
                        </span>
                        <br> <br>
                        <p>
                            <span class="preco green-text">${prodAgriculturaPreco[cont]}Kz</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

function initFunc() {
    $(".button-collapse").sideNav();
    $('.fixed-action-btn').openFAB();
    // $('.modal-trigger').leanModal();
    $('select').material_select();
    $('.slider').slider({
        full_width: true,
        indicators: false
    });
    $('input.autocomplete').autocomplete({
        data: {
            'Disjuntor Monofásico': null,
            'Disjuntor Bifásico': null,
            'Disjuntor Trifásico': null,
            'Alicate': null,
            'Lâmpada Incadescente': null,
            'Lâmpada Florescente': null,
            'Suporte': null,
            'Suporte de Parede': null,
            'Tomada': null,
            'Pá': null,
            'Carro de Mão': null,
            'Chapa': null,
            'Teto de Rosalite': null,
            'Marreta Curta': null,
            'Marreta Comprida': null,
            'Martelo': null,
            'Dobra 90º': null,
            'Tubo PVC - 1m': null,
            'Tubo T': null,
            'Cimento Cola - 5Kg': null,
            'Mosáico Branco': null,
            'Mosáico Preto': null,
            'Cana de Pesca': null,
            'Cana de Pesca Moderno': null,
            'Anzol': null,
            'Anzol Triplo': null
        }
    });

    /* ^ Inicializando Componentes do MATERILIZE ^ */

    var btnAdjustMode = document.getElementById("btnAdjustMode");

    btnAdjustMode.addEventListener("click", adjustModeFunc);

    var cont = 0;

    function adjustModeFunc() {
        if (cont % 2 == 1) {
            document.getElementById("linkAdjustMode").setAttribute("href", "/css/lightMode.css");
        } if (cont % 2 == 0) {
            document.getElementById("linkAdjustMode").setAttribute("href", "/css/darkMode.css");
        }
        cont++;
    }

    /* ^ Tratando o modo ESCURO e CLARO ^ */

    var btnFixed = document.getElementById('btnFixed');
    var btnFixed2 = document.getElementById('btnFixed2');

    btnFixed.addEventListener('click', rotate);
    btnFixed2.addEventListener('click', rotate2);

    function rotate() {
        document.getElementById('btnFixed').style.transform += "rotate(180deg)";
    }

    function rotate2() {
        document.getElementById('btnFixed2').style.transform += "rotate(180deg)";
    }

    rotate();

    /* ^ Tratando a ROTAÇÃO do Botão Flutuante ^ */
}

function localizacaoFunc() {
    var coordenadas = {
        lat: -8.776367,
        lng: 13.343969
    }

    var mapa = new google.maps.Map(document.getElementById('localizacao'), {
        zoom: 15,
        center: coordenadas
    });

    var marker = new google.maps.Marker({
        position: coordenadas,
        map: mapa,
        title: 'Cassolucas'
    });
}
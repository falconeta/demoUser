/*exported paginaCaricata */
/*exported loadMain */
/*exported contact */
/*global $*/
function loadMain() {
    "use strict";
    $('#all').css('display','none');
    //$('#all').hide('toggle');
    $('#loading').loading({
        theme: 'dark',
        message: 'one moment...',
        hiddenClass: 'loading-hidden',
        onStart: function (loading) {
            loading.overlay.slideDown(400);
        },
        onStop: function (loading) {
            loading.overlay.slideUp(400);
        }
    }, 'toggle');
    setTimeout(function () {
        $.getJSON('https://randomuser.me/api', paginaCaricata);
    }, 1500);
}
function contact() {
    "use strict";
    $('#submit').click(function () {
        $.post('http://localhost:3000/results', $('#contact').serialize());
    });
}
function paginaCaricata(data) {
    "use strict";
    var persona = data.results[0];
    var userId = ['email', 'born', 'name', 'gender', 'street', 'city', 'state', 'postcode', 'image'];
    var userValue = [persona.email, persona.dob, persona.name.first + ' ' + persona.name.last,
    persona.gender, persona.location.street, persona.location.city,
    persona.location.state, persona.location.postcode, persona.picture.large];
    for (var i = 0; i < userId.length; i++) {
        carica(userId[i], userValue[i]);
    }
    var dob = document.getElementById('born');/*****conversione date of Born*****/
    var born = dob.outerText;
    dob.innerText = born.slice(8, 10) + '-' + born.slice(5, 7) + '-' + born.slice(0, 4);
    var gender = document.getElementById('gender');
    var genderImage = document.getElementById('imageGender');
    switch (gender.outerText) {
        case 'male':
            genderImage.src = 'https://png.icons8.com/metro/1600/male.png';
            break;
        case 'female':
            genderImage.src = 'https://png.icons8.com/metro/1600/female.png';
            break;
        default:
    }
    $('#loading').loading('toggle');
    $('#all').show('toggle');
}
function carica(id, value) {// funzione di caricamento
    "use strict";
    var name = document.getElementById(id);
    if (id === 'image') {
        name.src = value;
    } else { name.innerText = value; }
}
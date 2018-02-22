/*exported paginaCaricata */
/*global $*/
$(document).ready(function () {
    "use strict";
    $('#loading').loading('toggle');
    $.getJSON('https://randomuser.me/api/', paginaCaricata);
});

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
        case 'Male':
            genderImage.src = 'https://png.icons8.com/metro/1600/male.png';
            break;
        case 'Female':
            genderImage.src = 'https://png.icons8.com/metro/1600/female.png';
            break;
        default:
    }
}
function carica(id, value) {// funzione di caricamento
    "use strict";
    var name = document.getElementById(id);
    if (id === 'image') {
        name.src = value;
    } else { name.innerText = value; }
}
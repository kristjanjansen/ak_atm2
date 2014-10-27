var e = BackboneEvents.mixin({});
var states = {}
var currentState = ''
var currentLanguage = defaultLanguage = 'et'

var socket = io('http://localhost');


// Get states

$.ajaxSetup({async: false});
$.get('./data/states_all.yml', function(data) {
  states = yaml.load(data)
})




// TRIGGERS


// Document init

$(function() {

  var frontpage = ''
  for (var key in states) {
    if (states[key].frontpage) {
      frontpage = key
    }
  }
  e.trigger('changeState', frontpage ? frontpage : Object.keys(states)[0]);

})


// Trigger: DOM buttons

$('.button').on('click', function() {

  var id = $(this).parent().attr('id')
  
  if (states[currentState][id].go) {
    
    // Button sound

    if (buttonSound = states[Object.keys(states)[0]].button_sound) {
      $('#firstSound').attr('src','audio/' + buttonSound).trigger('play')
    }
    
    // Change language

    if (language = states[currentState][id].language) {
      currentLanguage = language
    }

    // Change state

    e.trigger('changeState', states[currentState][id].go)
  
  }

})


// Trigger: Socket

socket.on('message', function(data) {

  if (data.status == 'card_in' && states[currentState].card_in) {
    e.trigger('changeState', states[currentState].card_in)
  } else if (data.status == 'card_out' && states[currentState].card_out) {
    e.trigger('changeState', states[currentState].card_out)
  }

});



// STATE CHANGES


// Change current state

e.on('changeState', function(state) {

  currentState = state ? state : currentState

});


// Play intro sound

e.on('changeState', function() {
  
  if (introSound = states[currentState].intro_sound) {
    $('#secondSound').trigger('pause')
    $('#secondSound').attr('src','audio/' + introSound).trigger('play')
  }

});


// Change title

e.on('changeState', function() {
 
  var title_key = (currentLanguage !== defaultLanguage ? 'title_' + currentLanguage : 'title') 
  
  $('.title').html(states[currentState][title_key] ? states[currentState][title_key] : states[currentState]['title'])

});



// Change buttons

e.on('changeState', function() {
 
  var label_key = (currentLanguage !== defaultLanguage ? 'label_' + currentLanguage : 'label') 

  for (var key in states[currentState]) {
    if (key.length < 4 && key.substr(0,1).toLowerCase() == 'b') {
    if (states[currentState][key][label_key] || states[currentState][key]['label']) {
      $('#' + key + ' .label').removeClass('invisible')
      $('#' + key + ' .label').text(states[currentState][key][label_key] ? states[currentState][key][label_key] : states[currentState][key]['label'])
    } else {
      $('#' + key + ' .label').addClass('invisible')
    }
    }
  }

});


// Show input fields

e.on('changeState', function() {

  $('.pin').toggleClass('hidden', !states[currentState].input_pin).find('input').val('').focus()
  $('.cash').toggleClass('hidden', !states[currentState].input_cash).find('input').val('').focus()

});


// Show ads and help

e.on('changeState', function() {

  $('.image').toggleClass('hidden', !states[currentState].display_ad)
  $('.help').toggleClass('hidden', !states[currentState].display_help)

});


// Trigger timer

e.on('changeState', function() {

  if (states[currentState].timer) {
    setTimeout(function() {
      e.trigger('changeState', states[currentState].timer.go)
    }, states[currentState].timer.time)
  }

});



// OTHER


// Input fields

$('.field input').on('keypress', function(event) {

  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  var regex = new RegExp("^[0-9]+$");

  if (regex.test(key) && (buttonSound = states[Object.keys(states)[0]].button_sound)) {
    $('#firstSound').attr('src','audio/' + buttonSound).trigger('play')
  } else {
    event.preventDefault();
    return false;
  }

})



// CSS query parameter

function query(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return(false);
}

var css = (query('css') || 'style.css')
$('#custom-css').attr('href', 'data/' + css)


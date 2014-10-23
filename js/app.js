$(function() {

  var socket = io();
  socket.on('connect', function() {
    socket.on('message', function(data) {
      if (data.status == 'card_in') {
        $('#card_in .button').trigger('click')
      } else if (data.status == 'card_out') {
        $('#card_out .button').trigger('click')
      }
    });
  });
  
  
  $.get('data/states_all.yml', function(data) {
    
  var states = yaml.load(data)
  
  for (var key in states) {
    if (states[key].frontpage) {
      var currentState = key
    }
    if (states[key].button_sound) {
      var buttonSound = states[key].button_sound
    }
  }
  
  var currentLanguage = defaultLanguage = 'et'
  
  renderState(currentState)


$('.field input').on('keypress', function(event) {

  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  var regex = new RegExp("^[0-9]+$");

  if (regex.test(key)) {
    $('#firstSound').attr('src','audio/' + buttonSound).trigger('play')
  } else {
    event.preventDefault();
    return false;
  }
})

// dupe!

  if (states[currentState].display_ad) {
      $('.image').removeClass('hidden')
  } else {
      $('.image').addClass('hidden')
  }

  if (states[currentState].display_help) {
      $('.help').removeClass('hidden')
  } else {
      $('.help').addClass('hidden')
  }

$('.button').on('click', function() {
  
  $('#firstSound').attr('src','audio/' + buttonSound).trigger('play')

  var id = $(this).parent().attr('id')
  console.log(id)
  if (language = states[currentState][id].language) {
    currentLanguage = language
  }

  if (states[currentState][id].go && (introSound = states[states[currentState][id].go].intro_sound)) { 
    $('#secondSound').attr('src','audio/' + introSound).trigger('play')
  }
    
  currentState = states[states[currentState][id].go] ? states[currentState][id].go : currentState
  renderState(currentState)
 
  $('.field').addClass('hidden')

   if (states[currentState].input_pin) {
      $('.pin').removeClass('hidden').find('input').val('').focus()
   } else if (states[currentState].input_cash) {
      $('.cash').removeClass('hidden').find('input').val('').focus()
   }

  if (states[currentState].display_ad) {
      $('.image').removeClass('hidden')
  } else {
      $('.image').addClass('hidden')
  }

  if (states[currentState].display_help) {
      $('.help').removeClass('hidden')
  } else {
      $('.help').addClass('hidden')
  }
  
  if (states[currentState].timer) {
    setTimeout(function() {
    

      currentState = states[states[currentState].timer.go] ? states[currentState].timer.go : currentState
      $('#secondSound').trigger('pause')
      renderState(currentState)

        if (states[currentState].display_ad) {
      $('.image').removeClass('hidden')
  } else {
      $('.image').addClass('hidden')
  }
      
    }, states[currentState].timer.time)
  }
  
})

function renderState(currentState) {
  var title_key = (currentLanguage !== defaultLanguage ? 'title_' + currentLanguage : 'title') 
  var label_key = (currentLanguage !== defaultLanguage ? 'label_' + currentLanguage : 'label') 
   
  $('.title').html(states[currentState][title_key] ? states[currentState][title_key] : states[currentState]['title'])
  
  for (var key in states[currentState]) {
    if (key.length < 4 && key.substr(0,1).toLowerCase() == 'b') {
    if (states[currentState][key][label_key] || states[currentState][key]['label']) {
      $('#' + key + ' .label').removeClass('hidden')
      $('#' + key + ' .label').text(states[currentState][key][label_key] ? states[currentState][key][label_key] : states[currentState][key]['label'])
    } else {
      $('#' + key + ' .label').addClass('hidden')
    }
    }
  }
}

})


function query(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var css = (query('css') || 'style.css')
$('#custom-css').attr('href', 'data/' + css)

})



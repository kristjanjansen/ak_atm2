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
  
  
  $.get('data/states.yml', function(data) {
    
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
 
  if (states[currentState].timer) {
    setTimeout(function() {
      currentState = states[states[currentState].timer.go] ? states[currentState].timer.go : currentState
      $('#secondSound').trigger('pause')
      renderState(currentState)
      
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



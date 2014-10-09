$(function() {

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

  var id = $(this).parent().attr('id')

  if (language = states[currentState][id].language) {
    currentLanguage = language
  }

  if (states[currentState][id].go && buttonSound)  {
    $('#firstSound').attr('src','audio/' + buttonSound).trigger('play')
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
  
  console.log('Current language: ', currentLanguage)

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

})




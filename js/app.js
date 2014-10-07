$(function() {

  $.get('data/states.yml', function(data) {
    
    var states = yaml.load(data)
  
  for (var key in states) {
    if (states[key].frontpage) {
      currentState = key
    }
  }

  renderState(currentState)


$('.button').on('click', function() {
  
  var id = $(this).parent().attr('id')
  if (sound = states[currentState][id].button_sound || null) {

    playSound(sound)
  }
  currentState = states[states[currentState][id].go] ? states[currentState][id].go : currentState
  renderState(currentState)
 
  if (states[currentState].timer) {
    setTimeout(function() {
      currentState = states[states[currentState].timer.go] ? states[currentState].timer.go : currentState
      renderState(currentState)
    }, states[currentState].timer.time)
  }
  
    
})

function playSound(sound) {
  $('audio').attr('src','audio/' + sound).trigger('play')
}

function renderState(currentState) {
  $('.title').html(states[currentState].title)
  for (var key in states[currentState]) {
    if (key.length < 4 && key.substr(0,1).toLowerCase() == 'b') {
    if (states[currentState][key].label) {    
      $('#' + key + ' .label').removeClass('hidden')
      $('#' + key + ' .label').text(states[currentState][key].label)
    } else {
      $('#' + key + ' .label').addClass('hidden')
    }
    }
  }
}

})

})




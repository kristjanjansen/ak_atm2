/*
var states = {
  'Tere tulemast' : {
    title : 'Tere tulemast',
    b1: { title:null, go: null },
    b2: { title:null, go: null },
    b3: { title:null, go: null },
    b4: { title:'Jätka', go: 'PIN' },
    frontpage: true
  },
  'PIN' : {
    title : 'Sisesta PIN',
    b1: { title:null, go: null },
    b2: { title:null, go: null },
    b3: { title:null, go: null },
    b4: { title:'Jätka', go: 'Esileht' },
  },
  'Esileht' : {
    title : 'Vali tegevus',
    b1: { title:'Keel', go: 'Keel' },
    b2: { title:'Kaardi tagastamine', go: 'Lõpp' },
    b3: { title:'Sularaha', go: 'Sularaha' },
    b4: { title:'Kontojääk', go: 'Kontojääk' },  
  },
  'Keel' : {
    title : '...',
    b1: { title:'Eesti', go: 'Esileht' },
    b2: { title:'English', go: 'Esileht' },
    b3: { title:'Pусский', go: 'Esileht' },
    b4: { title:'Suomi', go: 'Esileht' },  
  },
  'Sularaha' : {
    title : 'Palun vali summa',
    b1: { title: '5 EUR', go: 'Raha kättesaamine' },
    b2: { title:'20 EUR', go: 'Raha kättesaamine' },
    b3: { title:'50 EUR', go: 'Raha kättesaamine' },
    b4: { title:'Muu summa', go: 'Muu' },  
  },
  'Kontojääk' : {
    title: 'Kontojääk',
    b1: { title: null, go: null },
    b2: { title:'Katkesta', go: 'Esileht' },
    b3: { title:'Paberil', go: 'Paberil' },
    b4: { title:'Ekraanil', go: 'Ekraanil' },  
  },
  'Raha kättesaamine' : {
    title: 'Palun oodake, raha väljastatakse',
    timer: {time: 2000, go: 'Esileht'},
    b1: { title: null, go: null },
    b2: { title: null, go: null },
    b3: { title: null, go: null},
    b4: { title: null, go: null },  
  },  
  'Ekraanil' : {
    title: 'Vabad vahendid:5000 EUR',
    b1: { title: null, go: null },
    b2: { title:'Katkesta', go: 'Esileht' },
    b3: { title: null, go: null},
    b4: { title: null, go: null },  
  },
  'Paberil' : {
    title: 'Oodake, kviitungit väljastatakse',
    b1: { title: null, go: null },
    b2: { title:'Katkesta', go: 'Esileht' },
    b3: { title: null, go: null},
    b4: { title: null, go: null },  
  },
  'Muu' : {
    title: '[..................]',
    b1: { title: null, go: null },
    b2: { title:'Katkesta', go: 'Esileht' },
    b3: { title: null , go: null},
    b4: { title: 'Sisesta', go: 'Raha kättesaamine' },  
  },
  'Lõpp' : {
    title : 'Palun võtke kaart',
    timer: {time: 2000, go: 'PIN'},
    b1: { title:null, go: null },
    b2: { title:null, go: null },
    b3: { title:null, go:null },
    b4: { title:null, go: null },  
  },
}

*/

$(function() {

  $.get('states.yml', function(data) {
    
    var states = yaml.load(data)
 //   console.log(states)
  
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




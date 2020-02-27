var scores, roundScore, activePlayer, dice, gamePlaying

/*
document.querySelector('#current-' + activePlayer).textContent = dice 
se si vuole usare HTML invece di solo testo:
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
*/

function init(){
    scores = [0,0]
    roundScore = 0
    activePlayer = 0
    gamePlaying = true
    document.querySelector('.dice').style.display = 'none'
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}
 
init()

/* Sintassi alternativa, richiede una funzione definita
function button(){
    //Corpo funzione
}
document.querySelector('.btn-roll').addEventListener('click', button)
*/

//funzione anonima, ovvero definita inline
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        dice = Math.floor(Math.random() * 6) + 1

        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block'
        diceDOM.src = 'assets/img/dice-' + dice + '.png'

        if(dice > 1){
            roundScore += dice
            document.getElementById('current-'+activePlayer).textContent = roundScore
        } else {
            playerChange()
        }
    }  
})
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer]
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER!'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
            gamePlaying = false
        } else {
            playerChange()
        }
    }
})

function playerChange(){
    document.getElementById('current-'+activePlayer).textContent = 0
    activePlayer == 1 ? activePlayer = 0 : activePlayer = 1
    roundScore = 0
    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
}

document.querySelector('.btn-new').addEventListener('click', init)
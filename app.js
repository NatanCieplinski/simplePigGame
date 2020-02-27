/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

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
        diceDOM.src = 'dice-' + dice + '.png'

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
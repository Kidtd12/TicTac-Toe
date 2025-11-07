const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#xPlayerDisplay')
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restartBtn')

const restartBtn = document.querySelector('#restartBtn')




let player = 'X'
let isPauseGame = false
let isGameStart = false

const inputCell = ['','','',
                   '', '','',
                   '','','']

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index));
});




function tapCell(cell, index) {
    if (cell.textContent == '' &&
        !isPauseGame
    ){
        isGameStart = true 
        updateCell(cell,index)
        if (!checkWinner()){
             changePlayer()
             randomPick()
        }

        
    }
}

function updateCell(cell,index){

    cell.textContent = player
   inputCell[index] = player;
    cell.style.color = (player == 'X' ? '#1892ea' : '#a737ff')
}

function  changePlayer(){

    player = (player == 'X') ? 'O': 'X'
}
function randomPick(){
    isPauseGame = true

    setTimeout(() => {
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * inputCell.length);

        } while (
            inputCell[randomIndex]  != ''

        )
        updateCell(cells[randomIndex], randomIndex, player)
        if(!checkWinner()) {
            changePlayer()
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'


    }, 1000)
}
function checkWinner(){

    for(const [a, b, c] of winConditions){

if(inputCell[a] == player &&
    inputCell[b] == player &&
    inputCell[c] == player 
){

    declareWinner([a,b,c])
    return true 
    }

    }
    if (inputCell.every(cell => cell != '' )){
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} wins! 🎉`;
    isPauseGame = true;

    winningIndices.forEach(index => {
        cells[index].style.background = '#2a2343';
    });

    restartBtn.style.visibility = 'visible';

    let duration = 3000; 
    let end = Date.now() + duration;

    const confettiInterval = setInterval(function () {
        if (Date.now() > end) {
            clearInterval(confettiInterval);
        } else {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, 200); 
}


function declareDraw() {

    titleHeader.textContent = 'draw!'
    isPauseGame = true
    restartBtn.style.visibility = 'visible'
}
function choosePlayer(selectedPlayer){

    if (!isGameStart){
        player = selectedPlayer
        if(player == 'X'){

            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        }
        else{xPlayerDisplay.classList.remove('player-active')
            oPlayerDisplay.classList.add('player-active')

        }
    }

}

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden';
    inputCell.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.background = '';
    });
    isPauseGame = false;
    isGameStart = false;
    titleHeader.textContent = 'choose';
});


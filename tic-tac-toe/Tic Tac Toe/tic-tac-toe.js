
const infoDiv = document.querySelector('#infoDiv');
const gameDiv = document.querySelector('#gameDiv')
const playAginBtn = document.getElementById('playAginBtn')
const startBtn = document.getElementById('stBtn');
const score = document.querySelector('#score')
const restartBtn = document.getElementById('restartBtn')
const you_win = document.getElementById('youWin')
const youLoose = document.getElementById('youLoose')
const youDraw = document.getElementById('youDraw')
startBtn.addEventListener('click',displayIn)
   

function displayIn(){
    infoDiv.style.display = 'none'
    startBtn.style.display = 'none'
    gameDiv.style.display = 'block';
    playAginBtn.style.display = 'block'
    score.style.display = 'block'
    restartBtn.style.display = 'block'
}

function displayOut() {
    score.style.display = 'none'
    gameDiv.style.display = 'none';
    restartBtn.style.display = 'none'
    playAginBtn.style.display = 'none'
    startBtn.style.display = 'block'
    infoDiv.style.display = 'block';
}

// A function that restart the game
function resetGame () {
    location.reload()
}

let counter = 0;
let check_box = []



const boxes = document.querySelectorAll('.box')
boxes.forEach(box => {
    box.addEventListener('click',ev =>{

        let check = checked(ev)
        if(check == 'checked')return;

        let win = user_win(ev)
        if(win == 'win') return;

    
        // game_draw()
        let draw = game_draw()
        if(draw == 'draw')return;
    

        let loose = computer_win()
        if(loose == 'loose')return

    })
})

const checked = ev =>{
    
    if(ev.target.textContent != ''){
        return 'checked'
    }
    
}

// let result=[]
let user_score = 0

const user_win = ev =>{

    ev.target.textContent = player
    ev.target.style.backgroundColor = 'green'
    let r = win_condition.some(val => val.every(i => boxes[i].textContent == player))
    if(r) {
        score.firstElementChild.firstElementChild.textContent = user_score += 1;
        you_win.style.display = 'block'
        return 'win';
    }
}

const random = () =>{

    let rn = Math.floor(Math.random() * boxes.length)
    return rn

}

let computer_score = 0;
const computer_win = () =>{
   
    let rn = random()

    if(boxes[rn].textContent != '')  computer_win()
    else {
        boxes[rn].textContent = computer;
        boxes[rn].style.backgroundColor = 'red'
        let r = win_condition.some(val => val.every(i => boxes[i].textContent == computer))
        if(r) {
            score.lastElementChild.firstElementChild.textContent = computer_score += 1;
            youLoose.style.display = 'block'
            return 'loose';
        }
    }
    
}

const game_draw = () =>{

    let count = 0;
    boxes.forEach(box => {
        if(box.textContent != '') count++
    })

    if(count === boxes.length){
        if(youLoose.style.display == 'none' || youLoose.style.display == ''){
            if(you_win.style.display == 'none' || you_win.style.display == ''){

                youDraw.style.display = 'block'
                return 'draw'

            }
        }
    }
}

const win_condition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [1,4,7],
    [0,3,6],
    [2,5,8]
]

restartBtn.addEventListener('click',resetGame)

let player;
let computer;

let char = document.querySelectorAll('.chartToPlayWith')
char.forEach(c => c.addEventListener('click',ev => {

    char.forEach(d => d.style.backgroundColor = '')
    c.style.backgroundColor = 'white'
    player = c.textContent
    if(player == 'o') computer = 'x';
    else if(player == 'x') computer = 'o';

}))

playAginBtn.addEventListener('click',()=>{

    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = 'white'
    })
   Array.of([youDraw,youLoose,you_win]).flat().forEach(x => x.style.display = 'none')

})

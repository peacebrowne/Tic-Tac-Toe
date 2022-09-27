
const infoDiv = document.querySelector('#infoDiv');
const gameDiv = document.querySelector('#gameDiv')
const playAginBtn = document.getElementById('playAginBtn')
const startBtn = document.getElementById('stBtn');
const score = document.querySelector('#score')
const restartBtn = document.getElementById('restartBtn')
const you_win = document.getElementById('youWin')
const youLoose = document.getElementById('youLoose')
const youDraw = document.getElementById('youDraw')
const selectLevels = document.querySelector('select')
startBtn.addEventListener('click',displayIn)
   
let level;

function displayIn(){
    level = selectLevels.value;
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

        if (level === 'easy') {
            
            let play = user_play(box)
            if (play) return;
            else {
                let win = easy()
                if (win) return;
            };
            
        }

    })
})

// funtion display user play
const user_play = box =>{
   
    // if user selected box is not empty, user should play
    if (box.textContent === '') {

        box.textContent = player
        box.style.backgroundColor = '#04AA6D'
        let win = user_win()
        if(win) return true
        return false
        
    }
    // else alert user to select another box and return true
    else{
        alert('Please select an empty box')
        return true
    }

}


// function for computer easy level.
const easy = () =>{

    let count = 0;
    for (let i = 0; i < boxes.length; i++) {
        if(boxes[i].textContent != '') count++        
    }
    if(count === boxes.length) return;

    // getting random number
    let rn = random()

    // if computer selected random box is empty, computer plays in it.
    if (boxes[rn].textContent === '') {
        boxes[rn].textContent = computer;
        boxes[rn].style.backgroundColor = 'rgb(170, 17, 17)'
        let win = computer_win()
        if (win) return true;
        return false;
    }
    else{
        easy()
        
    }

}

const computer_win = () => {

    let result = win_condition.some(val => val.every(i => boxes[i].textContent === computer))
    if(result) {
        // score.lastElementChild.firstElementChild.textContent = computer_score += 1;
        alert('computer win')
        return true;
    }else return false;

}

const user_win = () => {

    let result = win_condition.some(val => val.every(i => boxes[i].textContent == player))
    if(result) {
        // score.firstElementChild.firstElementChild.textContent = user_score += 1;
        alert('user win')
        return true;
    }else return false;

}


   

// let check = checked(ev)
        // if(check == 'checked')return;

        // let win = user_win(ev)
        // if(win == 'win') return;

    
        // // game_draw()
        // let draw = game_draw()
        // if(draw == 'draw')return;
    

        // let loose = computer_win()
        // if(loose == 'loose')return

const checked = ev =>{
    
    if(ev.target.textContent != ''){
        return 'checked'
    }
    
}

// let result=[]
// let user_score = 0
// let user_box,computer_box;

// const user_win = ev =>{
//     user_box = ev.target.id;
//     ev.target.textContent = player
//     ev.target.style.backgroundColor = '#04AA6D'
//     let result = win_condition.some(val => val.every(i => boxes[i].textContent == player))
//     if(result) {
//         score.firstElementChild.firstElementChild.textContent = user_score += 1;
//         you_win.style.display = 'block'
//         return 'win';
//     }
// }

const random = () =>{

    return Math.floor(Math.random() * boxes.length)

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
   Array.of([youDraw,youLoose,you_win]).flat().forEach(msg => msg.style.display = 'none')

})

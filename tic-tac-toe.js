
const infoDiv = document.querySelector('#infoDiv');
const gameDiv = document.querySelector('#gameDiv')
const play_again = document.getElementById('play_again')
const start = document.getElementById('stBtn');
const score = document.querySelector('#score')
const restart = document.getElementById('restart')
const you_win = document.getElementById('youWin')
const youLoose = document.getElementById('youLoose')
const youDraw = document.getElementById('youDraw')
const selectLevels = document.querySelector('select')
   
let level;
const win_condition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6]
]

function displayIn(){
    level = selectLevels.value;
    infoDiv.style.display = 'none'
    start.style.display = 'none'
    gameDiv.style.display = 'block';
    play_again.style.display = 'block'
    score.style.display = 'block'
    restart.style.display = 'block'
}

start.addEventListener('click',displayIn)


function displayOut() {
    score.style.display = 'none'
    gameDiv.style.display = 'none';
    restart.style.display = 'none'
    play_again.style.display = 'none'
    start.style.display = 'block'
    infoDiv.style.display = 'block';
}

// A function that restart the game
function resetGame () {
    location.reload()
}

let computer_box;
let player_box;
let counter = 0;
let check_box = []

const boxes = document.querySelectorAll('.box')
boxes.forEach(box => {
    box.addEventListener('click',ev =>{

        if (level === 'easy') {
            
            let check = checked(box)
            if(check) return

            let play = user_play(box)
            if (play) return;
            else {
                let win = easy()
                if (win) return;
            };
            
        }else{
            hard(box)
        }

    })
})

// funtion marks user played box
const user_play = box =>{
   
    // if user selected box is not empty, user should play
    if (box.textContent === '') {

        box.textContent = player
        box.style.backgroundColor = '#04AA6D'
        player_box = +box.id;
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

let player_count = 0;
const hard = box => {

    user_play(box)
    
    // checking if user has played for first time.
    if(player_count != 1) {
        player_count++

        // checking if player plays in center box if true computer plays in first box else computer plays in center box
        if(boxes[4].textContent.includes(player)){
            boxes[0].textContent = computer
            boxes[0].style.backgroundColor = 'rgb(170, 17, 17)'
            computer_box = 0;
        }else{
            boxes[4].textContent = computer
            boxes[4].style.backgroundColor = 'rgb(170, 17, 17)'  
            computer_box = 4;
        }
        return;
    }
    else {
        computer_check_win_pos()
    }
}

// checking for computer winning position.
const computer_check_win_pos = () =>{

    let computer_boxes = win_condition.filter(val => val.includes(computer_box))

            let count = 0;
            let pos

        for (let a = 0; a < computer_boxes.length; a++) {
            const winPos = computer_boxes[a];

            for (let i = 0; i < winPos.length; i++) {
                    
                if (boxes[winPos[i]].textContent.includes(computer))count++
                else if(boxes[winPos[i]].textContent === '') pos = winPos[i]
                else {
                    count = 0;
                    break;
                }
                
            }

            if (count === 2) {
                boxes[pos].textContent = computer;
                boxes[pos].style.backgroundColor = 'rgb(170, 17, 17)';
                return
            }
            count = 0;
        }
            let block = block_user() 
            if (block) return

}

const block_user = () =>{
    let count = 0;
    let pos

    let player_boxes = win_condition.filter(val => val.includes(player_box))
    for (let a = 0; a < player_boxes.length; a++) {
        const blockPos = player_boxes[a];

        for (let i = 0; i < blockPos.length; i++) {

            if(boxes[blockPos[i]].textContent.includes(player)) count++
            else if (boxes[blockPos[i]].textContent === '') pos = blockPos[i];
            else {
                count = 0;
                break;
            };

        }

        if (count === 2) {
            boxes[pos].textContent = computer;
            boxes[pos].style.backgroundColor = 'rgb(170, 17, 17)'
            return true;
        }
        count = 0;
    }

    easy()
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
        alert('computer win')
        return true;
    }else return false;

}

const user_win = () => {

    let result = win_condition.some(val => val.every(i => boxes[i].textContent == player))
    if(result) {
        alert('user win')
        return true;
    }else return false;

}

const checked = box =>{
    // if player checks a box twice alert them to play in another box
    if(box.textContent != '') {
        alert('Please play in another box')
        return true;
    }
    else return false;    
    
}

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


restart.addEventListener('click',resetGame)

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

play_again.addEventListener('click',()=>{

    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = 'white'
    })
   Array.of([youDraw,youLoose,you_win]).flat().forEach(msg => msg.style.display = 'none')

})

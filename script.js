const startBtn = document.querySelector('.startBtn');
const form = document.querySelector('form');
const controls = document.getElementById('controls')
const winScore = document.getElementById('userscore')
const looseScore = document.getElementById('computerscore')
const message = document.querySelector('#msg span')
const player_name = document.getElementById('username')

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

const start_game = () => {

        play_game()
        startBtn.style.display = 'none';
        form.style.display = 'none';
        game_box.style.display = 'flex';
        controls.style.display = 'flex'
    
}
startBtn.addEventListener('click', start_game)

const game_box = document.getElementById('game_box')
const boxes = document.querySelectorAll('.box')

let level;
const play_game = () =>{

    if(form.children[0].value === ''){
        alert('Please Enter Your Username')
        return;
    }
    player_name.textContent = form.children[0].value;

    if(form.children[1].value.includes('Please Select Your Level'))level = 'easy'
    else level = form.children[1].value;
    
}

let player = 'x';
let computer = 'o';

const characters = document.querySelectorAll('.char span')
characters.forEach(char => {
    char.addEventListener('click', () =>{
        characters.forEach(c => c.style = 'backgroundColor: white; color:#0F4E63;')
        char.style = 'background-color: #0F4E63; color:white; font-weight: 700;'
        player = char.dataset.value;
        if(player == 'o') computer = 'x';
    })
})

const back = document.getElementById('back')
const play_again = document.getElementById('play_again')
const restart = document.getElementById('restart')

const form_back = () =>{
    controls.style.display = 'none'
    game_box.style.display = 'none'
    form.style.display = 'flex'
    startBtn.style.display = 'block'
    reinitializ()
    winScore.textContent = 0
    looseScore.textContent = 0;
    player_count = 0;
    user_score = 0, 
    computer_score = 0;

}

let computer_box;
let player_box;
let counter = 0;
let check_box = []


// A function that restart the game
const resetGame = () => location.reload();

const reinitializ = () =>{

    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = ''
    })
    boxes.forEach(box => {
        box.addEventListener('click', active_boxes)
    })
    display_message('')
    player_count = 0;
}

play_again.addEventListener('click', reinitializ)
restart.addEventListener('click', resetGame)


const active_boxes = ev =>{

    let box = ev.target;
    let check = checked(box);
        if(check) return;

        let play = user_play(box);
        if (play) return

        if (level === 'easy') {

            let loose = easy();
            if (loose) return;
            
        }else{
           let loose = medium(box);
            if (loose) return;
        };

        let draw = game_draw()
        if (draw) return;
}

const addListener = () =>{
    boxes.forEach(box => {
        box.addEventListener('click', active_boxes)
    })
}

const removeListener = () =>{
    boxes.forEach(box => {
        box.removeEventListener('click', active_boxes)
    })
}
addListener()
// funtion marks user played box
const user_play = box =>{
   
    // if user selected box is not empty, user should play
    if (box.textContent === '') {

        box.textContent = player;
        player_box = +box.dataset.value;
        let win = user_win();
        if(win) return true;
        return false;
        
    }
    // else alert user to select another box and return true
    else{
        alert('Please select an empty box');
        return true;
    }

}

let player_count = 0;
const medium = box => {

    // checking if user has played for first time.
    if(player_count != 1) {
        player_count++

        // checking if player plays in center box if true computer plays in first box else computer plays in center box
        if(boxes[4].textContent.includes(player)){
            boxes[0].textContent = computer
            computer_box = 0;
        }else{
            boxes[4].textContent = computer
            computer_box = 4;
        }
        return;
    }
    else {
        let win = computer_check_win_pos()
        if (win) return true;
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
            computer_box = pos
            // show_win_boxes(winPos)
            let win = computer_win()
            if (win) return true;
        }
        count = 0;
    }

    let block = block_user(computer_boxes) 
    if (block) return

}

const block_user = (result) =>{
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
            computer_box = pos
            // boxes[pos].style.backgroundColor = 'rgb(170, 17, 17)'
            return true;
        }
        count = 0;
    }
    let win = easy()
    if (win) return true;
    // computer_play_pos(result)
}

const computer_play_pos = result =>{
    let count = []
    for (let i = 0; i < result.length; i++) {
        
        for (let a = 0; a < result[i].length; a++) {

            const box = result[i][a];
            if(boxes[box].textContent === '') count.push(box)
            
        }
        
        if(count.length === 2){
            boxes[count[0]].textContent = computer;
            // computer_box = +boxes[count[1]].dataset.value
            // let win = computer_win()
            return true;
        }

        count = [];
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
        computer_box = rn
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
    if(result){
        removeListener()
        scoreBoard('YOU LOOSE')
        display_message('YOU LOOSE')
        return true;
    }
    else return false;

}

const user_win = () => {

    let result = win_condition.some(val => val.every(i => boxes[i].textContent == player))
    if(result){
        removeListener()
        scoreBoard('YOU WIN')
        display_message('YOU WIN')
        return true;
    }
    else return false;

}

const game_draw = () =>{

    let draw = Array.from(boxes).every(box => box.textContent != '')
    if (draw){
        removeListener()
        display_message('DRAW')
        return true;
    };

}

const checked = box =>{
    // if player checks a box twice alert them to play in another box
    if(box.textContent != "") {
        alert('Please play in another box')
        return true;
    }
    else return false;    
}

const random = () =>{
    return Math.floor(Math.random() * boxes.length)
}

let user_score = 0, computer_score = 0;
winScore.textContent = user_score;
looseScore.textContent = computer_score;

const scoreBoard = msg =>{
    if (msg === 'YOU WIN')winScore.textContent = ++user_score;
    else if (msg === 'YOU LOOSE') looseScore.textContent = ++computer_score;
}

const display_message = msg =>{
    message.textContent = msg;
}

const show_win_boxes = win_boxes =>{
    win_boxes.forEach(box =>{
        boxes[box].classList.add('winBox')
    })

}

window.addEventListener('load',()=>{
    setTimeout({
        
    })
})
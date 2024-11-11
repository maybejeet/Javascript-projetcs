document.addEventListener('DOMContentLoaded',()=>{

    
    let arr = [
        ["","",""],
        ["","",""],
        ["","",""]
        
    ]
    let players = []
    const gameBoard = document.getElementById('gameBoard')
    const reset = document.getElementById('reset')
    const instruction = document.getElementById('instruction')
    const player1 = document.getElementById('player1')
    const player2 = document.getElementById('player2')
    const submitButton = document.getElementById('submit')
    const playerNameInput = document.getElementById('playerNameInput')
    const showScore = document.getElementById('showScore')
    const showPlayer1Score = document.getElementById('showPlayer1Score')
    const showPlayer2Score = document.getElementById('showPlayer2Score')
    
    
    function setPlayer() {
        // Enable the submit button if both player names are filled in
        if (player1.value && player2.value) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    player1.addEventListener('input', setPlayer);
    player2.addEventListener('input', setPlayer);
    
    submitButton.addEventListener('click', () => {
        let player1Name = player1.value || "Player 1";
        let player1score = new Number(0)
        let player2Name = player2.value || "Player 2";
        let player2score = new Number(0)
        let playerOne = {
            name: player1Name,
            score: player1score
        }
        players.push(playerOne)
        let playerTwo = {
            name: player2Name,
            score: player2score
        }    
        players.push(playerTwo)
        playerNameInput.classList.add('hidden')
        showScore.classList.remove('hidden')
        // console.log(players[0].name);
        showPlayer1Score.innerHTML = `
        ${players[0].name} = ${players[0].score}
        `
        showPlayer2Score.innerHTML = `
        ${players[1].name} = ${players[1].score}
        `    
        instruction.innerHTML = `
        ${players[0].name}'s (X)turn
        `
        
    });
    
    let c = 0
    
    arr.forEach((e,i) => {
        
        e.forEach((element,j) => {      
            let box = document.createElement('div')
            box.classList.add('box')
            box.classList.add('h-1/3')
            box.classList.add('w-1/3')
            box.classList.add(`bg-white`)
            box.classList.add(`border-2`)
            box.classList.add(`border-black`)
            box.classList.add(`border-solid`)
            box.classList.add(`flex`)
            box.classList.add(`justify-center`)
            box.classList.add(`items-center`)
            box.setAttribute('id', `${i}${j}`)
            gameBoard.appendChild(box)
            
            box.addEventListener('click',(e)=>{   
                if(!e.target.innerHTML){     
                    let mark = c%2===0? 'X':'O'
                    let turnName = c%2==0? players[1].name :players[0].name
                    let turnSymbol = c%2==0? 'O' : 'X'
                    if(mark === 'X'){
                        e.target.innerHTML = `
                        <span><h2 class="text-6xl text-red-700">X</h2></span>`
                    } 
                    if(mark === 'O'){
                        e.target.innerHTML = `
                        <span><h3 class="text-6xl text-blue-700">O</h3></span>` 
                    } 
                    instruction.innerHTML = `
                    <h3 class="sm:text-4xl text-2xl font-mono">${turnName}'s (${turnSymbol})turn </h3> 
                    `    
                    
                    
                    arr[i][j] = mark
                    
                    if(checkWin()){
                        setTimeout(() => {
                            // alert(`${mark} won!!`)
                            if(mark === 'X'){
                                alert(`${players[0].name} won!!`)
                                players[0].score += 1
                                showPlayer1Score.innerHTML = `
                                ${players[0].name} = ${players[0].score}
                                `
                            }
                            if(mark === 'O'){
                                alert(`${players[1].name} won!!`)
                                players[1].score += 1
                                showPlayer2Score.innerHTML = `
                                ${players[1].name} = ${players[1].score}
                                `
                            }
                            resetBoard()
                        }, 200);
                    } else if (c==8) {
                        alert(`Damn its a draw!!`);
                        
                    }
                    
                    c+=1
                }})
                
            })
            
        })
        
        function checkWin() {
            // Check rows and columns
            for (let i = 0; i < 3; i++) {
                if (arr[i][0] && arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2]) return true;
                if (arr[0][i] && arr[0][i] === arr[1][i] && arr[1][i] === arr[2][i]) return true;
            }
            // Check diagonals
            if (arr[0][0] && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) return true;
            if (arr[2][0] && arr[2][0] === arr[1][1] && arr[1][1] === arr[0][2]) return true;
            return false;
        }
        
        function resetBoard(){
            arr = [
                ["","",""],
                ["","",""],
                ["","",""]   
            ]
            c=0
            instruction.innerHTML = `<h3>Start the game!!</h3>`
            
            document.querySelectorAll('.box').forEach(box => box.innerHTML = '');
            
        }
        
        reset.addEventListener('click',()=>{
            resetBoard()
            players = []
            playerNameInput.classList.remove('hidden')
            showScore.classList.add('hidden')
            player1.value = ''
            player2.value = ''
        })
        
    })
        
        
// // console.log(ElapsedTime)
// // console.log("mili ", Math.floor(ElapsedTime * 0.1)%100)
// // console.log("seconds ",Math.floor((ElapsedTime * (0.001))))
// // console.log("minutes ", Math.floor((ElapsedTime * 0.001 * (1/60))))
// //seconds /1000
// //minutes /(1000*60)
// document.addEventListener('DOMContentLoaded', function(){
//     const startBtn = document.getElementById('startBtn')
//     const stopBtn = document.getElementById('stopBtn')
//     const resetBtn = document.getElementById('resetBtn')
//     const resumeBtn = document.getElementById('resumeBtn')
//     const minutes = document.getElementById('minutes')
//     const seconds = document.getElementById('seconds')
//     const mili = document.getElementById('mili')
//     const timeDisplay = document.getElementById('timeDisplay')
//     const stopwatch = document.getElementById('stopwatch')
//     let intervalID
//     let resumeTime = new Date()
//     let stopTime = new Date()
//     let startTime = new Date()
//     let ElapsedTime = 0


//     let scores = []

//     startBtn.addEventListener('click', ()=>{
//         startTime = Date.now()
//         intervalID = setInterval(DisplayTime, 10);
//         startBtn.classList.add('hidden')
//         stopBtn.classList.remove('hidden')
        
        
//     })

//     stopBtn.addEventListener('click',()=>{
//         stopTime = Date.now()      
//         clearInterval(intervalID)
//          intervalID = null
//         resumeBtn.classList.remove('hidden')
//         stopBtn.classList.add('hidden')       
//     })

//     resumeBtn.addEventListener('click',()=>{
//         resumeTime = Date.now() 
//         intervalID = setInterval(DisplayTime, 10);
//         resumeBtn.classList.add('hidden')
//         stopBtn.classList.remove('hidden')
//     })

//     resetBtn.addEventListener('click',()=>{
//         startBtn.classList.remove('hidden')
//         resumeBtn.classList.add('hidden')
//         stopBtn.classList.add('hidden')
//         mili.textContent = `00`
//         seconds.textContent = `00`
//         minutes.textContent = `00`
//         clearInterval(intervalID)
//         intervalID = null
//     })

//     function DisplayTime(){
//         if(intervalID === 0){
//             ElapsedTime = (Date.now() - startTime)
//         }
//          else {
//              ElapsedTime = (Date.now() - resumeTime)
//             //  ElapsedTime = (Date.now() - (resumeTime - stopTime))
//         }
        

//         let displayMili = Math.floor(ElapsedTime * 0.1)%100
//         let displaySeconds = Math.floor((ElapsedTime * (0.001)))
//         let displayMinutes = Math.floor((ElapsedTime * 0.001 * (1/60)))
//         if (displayMili<10) {
//             mili.innerHTML = `
//         0${displayMili}
//         `
//         } else {
//             mili.innerHTML = `
//         ${displayMili}
//         `
//         }
//         if (displaySeconds>=10) {
//             seconds.innerHTML = `
//         ${displaySeconds}
//         `
//         } else {
//             seconds.innerHTML = `
//         0${displaySeconds}
//         `
//         }
//         if (displayMinutes>=10) {
//             minutes.innerHTML = `
//             ${displayMinutes}
//             `
        
//         } else {
//             minutes.innerHTML = `
//             0${displayMinutes}    
//         `
//         }        
        
//     }
// })

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');
    const miliElem = document.getElementById('mili');
    
    let intervalID;
    let startTime = 0;
    let elapsedTime = 0;  // Accumulated time
    let isRunning = false;

    // Start button - initializes stopwatch
    startBtn.addEventListener('click', () => {
        startTime = Date.now() - elapsedTime;  // Adjust startTime by elapsed time
        intervalID = setInterval(updateDisplayTime, 10);
        isRunning = true;
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
    });

    // Stop button - stops the stopwatch but keeps elapsed time
    stopBtn.addEventListener('click', () => {
        clearInterval(intervalID);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        stopBtn.classList.add('hidden');
        resumeBtn.classList.remove('hidden');
    });

    // Resume button - continues from where it left off
    resumeBtn.addEventListener('click', () => {
        startTime = Date.now() - elapsedTime;  // Reset start time with elapsed time
        intervalID = setInterval(updateDisplayTime, 10);
        isRunning = true;
        resumeBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
    });

    // Reset button - clears everything
    resetBtn.addEventListener('click', () => {
        clearInterval(intervalID);
        intervalID = null
        startTime = 0;
        elapsedTime = 0;
        isRunning = false;
        // updateDisplayTime();  // Reset display
        miliElem.textContent = "00"
        secondsElem.textContent = "00"
        minutesElem.textContent = "00"
        startBtn.classList.remove('hidden');
        resumeBtn.classList.add('hidden');
        stopBtn.classList.add('hidden');
    });

    // Updates display time
    function updateDisplayTime() {
        let currentTime = Date.now() - startTime;
        let displayMili = Math.floor((currentTime % 1000) / 10);
        let displaySeconds = Math.floor((currentTime / 1000) % 60);
        let displayMinutes = Math.floor((currentTime / (1000 * 60)) % 60);

        miliElem.textContent = displayMili.toString().padStart(2, '0');
        secondsElem.textContent = displaySeconds.toString().padStart(2, '0');
        minutesElem.textContent = displayMinutes.toString().padStart(2, '0');
    }
});

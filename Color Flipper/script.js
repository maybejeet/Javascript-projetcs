document.addEventListener('DOMContentLoaded',()=>{
    const colorCode = document.getElementById('colorCode')
    const button = document.getElementById('button')
    const Background = document.getElementById('Background')
    const hex = '0123456789abcdef'
    let code = ""

    button.addEventListener('click',()=>{
        for(let i=0;i<6;i++){
            let ran = Math.floor(Math.random() * (16))
            code = code.concat(hex.charAt(ran))
        }
        Background.style.backgroundColor = `#${code}`
        colorCode.textContent = `#${code}`
        console.log(colorCode.textContent);
        code = ""
    })
})


 

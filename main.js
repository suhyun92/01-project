let computerNum = 0;
let userNum = document.getElementById("user-num");
let playBtn = document.getElementById("play-btn");
let resultText = document.getElementById("result-text");
let mainImg = document.querySelector(".main-img");
let resetBtm = document.getElementById("reset-btn")

let chanceArea = document.getElementById("chance-area");
let chanceText = document.getElementById("chance-text");
let chances = 10;
let gameOver = false;
let history = [];

let soju = document.querySelector(".soju");
let bottomValue = -100;



playBtn.addEventListener("click",play)
resetBtm.addEventListener("click",reset)
userNum.addEventListener("focus",function(){userNum.value=""})
userNum.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        play();
    }
  });




function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답 : ",computerNum);
}
pickRandomNum();

function play(){
    let userValue = userNum.value;
    console.log("유저값 : ",userValue);
    if(userValue<1 || userValue > 100){
        resultText.textContent = "1 ~ 100 사이의 숫자를 입력해 주세요";
        return
    }

    if(history.includes(userValue)){
        resultText.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
        return
    }
    chances --;
    console.log(chances)
    chanceText.textContent = `남은기회: ${chances}번`
    
    if(userValue>computerNum){
        resultText.textContent = "Down!";
        mainImg.src = "https://i.makeagif.com/media/3-15-2019/Ybw-XO.gif"

    }else if(userValue<computerNum){
    resultText.textContent = "Up!"
    mainImg.src = "https://1.bp.blogspot.com/-faB8aJsCeg4/W8MRerGDeRI/AAAAAAAAl0A/8I9U2Sj2IjoFiidiLCMJgabDegV78wc5QCLcBGAs/s1600/9.gif"

    }else if(userValue==computerNum){
        resultText.textContent = "너가 이겼네~ 한 번 더 하자!"
        mainImg.src ="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTAxMTZfMTU5%2FMDAxNTQ3NTk0ODI1ODkx.78fgnQzy9unmes6RG3686I529wsCR_4XFUYMK1k1V_8g.hRkgz8tDKGQ9fhWBEz5-Ghe6BcPGFzDthzrc0JKyBf4g.GIF.spaz0325%2FexternalFile.gif&type=sc960_832_gif"
    }

    history.push(userValue);
    bottomValue += 10;
    soju.style.bottom = ` ${bottomValue}%`


    if(chances<1){
        gameOver = true;
    }
    if(gameOver){
        playBtn.disabled = true;
        resultText.textContent = "너가 졌네~ 한 잔 마시고 한 번 더? 콜~?"
        mainImg.src ="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAxMTVfNzIg%2FMDAxNTQ3NTQ4NTk3MTc2.zw8ENRYwKLVPaqsIRmH273bLoECaH_aSnB6Tvp-butog.LEfPtPC0FQKTFe8KYnu0R_afMkRj1pL3ftJ0mFVj0Q0g.GIF.detkwan%2F4_%25286%2529.gif&type=sc960_832_gif"
    }
}

function reset (){
    pickRandomNum();
    userNum.value = ""
    mainImg.src = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA3MzFfODQg%2FMDAxNTAxNDg3OTM4NDUw.3bS5GCirtc6tzjDrZ7t8Fm0sMBaFIOHt_fX5q3tgpEkg.jk4y3Kohqw2VL6S9nZQ8rfoKhJNkgg3GHM0Sye0kmqsg.GIF.1541zhf%2FNaverBlog_20170731_165854_03.gif&type=sc960_832_gif"
    resultText.textContent = "게임에서 지면~ 너가 마시는 거다~?";
    chances = 10;
    chanceArea.innerHTML = `남은 기회: ${chances}번`;
    gameOver = false;
    playBtn.disabled = false;
    history=[]
}


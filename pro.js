let startBack = document.querySelector(".control-buttons");
let start = document.querySelector(".control-buttons span");
let namee = document.querySelector(".info-container .name span");
let min = document.querySelector(".min");
let second = document.querySelector(".second");

let duration;
if(parseInt(min.innerHTML)===0 && parseInt(second.innerHTML)!=0){
    duration=parseInt(second.innerHTML);
}
else if(parseInt(min.innerHTML)!=0 && parseInt(second.innerHTML)===0){
    duration=parseInt(min.innerHTML)*60;
}
else{
    duration=parseInt(min.innerHTML)*60+parseInt(second.innerHTML);
}
console.log(duration);

start.onclick=function(){
    let name = prompt("What is your name?")
    if(name===null || name===""){
        name = "UnKnown";
    }
    startBack.remove();
    namee.innerHTML=name;
    if(name!="" || name!=null){
        cards.forEach(function(ele){
            ele.classList.add("flipped")
            setTimeout(()=>{
                ele.classList.remove("flipped")
            }, 5000)
        })
        setTimeout(()=>{
            setInterval(timer, 1000);
        },5000)
        setTimeout(()=>{
            if(goodTries===10){

            }
            else{
                endGame();
            }
        }, duration*1000+5000);

    }
}

function timer(){
    if(goodTries==10){
        clearInterval();
    }
    else if(parseInt(second.innerHTML)===0){
        if(parseInt(min.innerHTML)>0){
            min.innerHTML=parseInt(min.innerHTML)-1;
            second.innerHTML=59;
        }
        else{
            clearInterval();
        }
    }
    else{
        second.innerHTML=parseInt(second.innerHTML)-1;
    }
    if(min.innerHTML.length<2){
        min.innerHTML=`0${min.innerHTML}`;
    }
    if(second.innerHTML.length<2){
        second.innerHTML=`0${second.innerHTML}`;
    }
}


//............................................................


let cardsContainer = document.querySelector(".memory-game-blocks");
let cards = Array.from(document.querySelectorAll(".game-block"));
let goodTries=0;

let orderRange = Array.from(Array(cards.length).keys());

function shuffle(Array){
    let current=Array.length, temp, random;
    while(current>0){
        random=Math.floor(Math.random() * current);
        current--;
        temp=Array[current];
        Array[current]=Array[random];
        Array[random]=temp;
    }
    return Array;
}

shuffle(orderRange);



cards.forEach(function(ele, index){
    ele.style.order=orderRange[index];
    ele.addEventListener("click", function(){
        flip(ele);
    })
})

function flip(card){
    card.classList.add("flipped");
    let allFlippedBlocks = cards.filter(flippedBlock => flippedBlock.classList.contains('flipped'));
    if(allFlippedBlocks.length===2){
        stoping();
        check(allFlippedBlocks[0], allFlippedBlocks[1])
    }

}

function stoping(){
    cardsContainer.classList.add("clicking");
    setTimeout(()=>{
        cardsContainer.classList.remove("clicking");
    }, 1000)
}

function check(ele1, ele2){
    let triesElement = document.querySelector('.tries span');
    if(ele1.dataset.technology === ele2.dataset.technology){
        ele1.classList.remove("flipped");
        ele2.classList.remove("flipped");
        ele1.classList.add("match");
        ele2.classList.add("match");
        document.getElementById("success").play();
        goodTries++;
        if(goodTries===10){
            document.getElementById("wow").play();
            document.querySelector(".end").classList.add("final");
            cardsContainer.classList.add("clicking");
        }
    }
    else{
        triesElement.innerHTML=parseInt(triesElement.innerHTML)+1;
        setTimeout(()=>{
            ele1.classList.remove("flipped");
            ele2.classList.remove("flipped");
        },1000)
        document.getElementById("fail").play();
    }
}

function endGame(){
    document.querySelector(".lose").classList.add("final");
    cardsContainer.classList.add("clicking");
    document.getElementById("ohh").play();


}


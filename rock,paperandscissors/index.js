let userScore=0;
let compScore=0;


//selecting queries
let choice=document.querySelectorAll(".choices");
let msg=document.querySelector("#msg");
let user=document.querySelector("#you");
let comp=document.querySelector("#comp");


//functions
const drawgame=()=>{
    msg.innerText="Draw";
    msg.style.backgroundColor="#081b31";
}
const win=()=>{
    
    msg.style.backgroundColor="Green";
    userScore++;
    user.innerText=userScore;
}
const loose=()=>{
    
    msg.style.backgroundColor="Red";
    compScore++;
    comp.innerText=compScore;
}


const compchoice=()=>{
    const options=["rock", "paper", "scissors"];
    const indx=Math.floor(Math.random()*3);
    return options[indx];
}

const playgame=(userchoice)=>{
    let compch=compchoice();
    if(userchoice==compch){
        drawgame();
    }
    else if(userchoice=="rock"){
        if(compch=="paper"){
            loose();
            msg.innerText="You lost. [You: Rock; Comp: Paper]";
        }
        else if(compch=="scissors"){
            win();
            msg.innerText="You won!!! [You: Rock; Comp: Scissors]";
        }
    }
    else if(userchoice=="paper"){
        if(compch=="rock"){
            win();
            msg.innerText="You won!!! [You: Paper; Comp: Rock]";
        }
        else if(compch=="scissors"){
            loose();
            msg.innerText="You lost. [You: Paper; Comp: Scissors]";
        }
    }
    else{
        if(compch=="paper"){
            win();
            msg.innerText="You won!!! [You:Scissor; Comp: Paper]";
        }
        else if(compch=="rock"){
            loose();
            msg.innerText="You lost. [You:Scissor; Comp: Rock]";
        }
    }
}
choice.forEach((choices)=>{
    choices.addEventListener("click", ()=>{
        const userchoice=choices.getAttribute("id");
        playgame(userchoice);
    })
})


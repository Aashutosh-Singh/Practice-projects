const baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
let dropdowns=document.querySelectorAll(".dropdown select");
let inputs=document.querySelectorAll("input");
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        
    }
    select.addEventListener("change", async()=>{
        let element=event.target;
         let currCode=element.value;
         
         if(select.name==="from"){
            let fromcurrx=document.querySelector("form #fromcurr");
           
         fromcurrx.innerText=currCode;
        }
        if(select.name==="to"){
            let tocurrx=document.querySelector("form #tocurr");
          
         tocurr.innerText=currCode;
        }
         let countryCode=countryList[currCode];
         
         let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
         let img=element.parentElement.querySelector("img");
         
         img.src=newSrc;



         //something here


         for(let inp of inputs){
            
                let element=event.target;
                
                
                inputs[1].value=0;
                inputs[0].value=0;
         }
     });
}

for(let inp of inputs){
    inp.addEventListener("keypress", async ()=>{
        let element=event.target;
        
        
        if(inp.name==="one"){
            let from=document.querySelector(".from select");
            let to=document.querySelector(".to select");
            let URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.value.toLowerCase()}.json`
           let response=await fetch(URL);
           let data=await response.json();
           let rate=data[from.value.toLowerCase()][to.value.toLowerCase()];
        
            let amt=element.value;
            let conv=rate*amt;
       
            inputs[1].value=conv;
         
      
        }
        else if(inp.name==="two"){
            let from=document.querySelector(".to select");
            let to=document.querySelector(".from select");
            let URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.value.toLowerCase()}.json`
           let response=await fetch(URL);
           
           let data=await response.json();
           let rate=data[from.value.toLowerCase()][to.value.toLowerCase()];
 
            let amt=element.value;
         
            let conv=rate*amt;
         
            inputs[0].value=conv;
          
        }
    })
}

for(let inp of inputs){
    inp.addEventListener("keydown", async ()=>{
        let element=event.target;
        
        
        if(inp.name==="one"){
            let from=document.querySelector(".from select");
            let to=document.querySelector(".to select");
            let URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.value.toLowerCase()}.json`
           let response=await fetch(URL);
           let data=await response.json();
           let rate=data[from.value.toLowerCase()][to.value.toLowerCase()];
            
            let amt=element.value;
            let conv=rate*amt;
            
            inputs[1].value=conv;
           
            console.log(from.value,to.value);
        }
        else if(inp.name==="two"){
            let from=document.querySelector(".to select");
            let to=document.querySelector(".from select");
            let URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.value.toLowerCase()}.json`
           let response=await fetch(URL);
           
           let data=await response.json();
           let rate=data[from.value.toLowerCase()][to.value.toLowerCase()];
           
            let amt=element.value;
            
            let conv=rate*amt;
           
            inputs[0].value=conv;
            console.log(from.value,to.value);
        }
    })
}

// select.addEventListener("change", (evt)=>{
//     updateflag(evt.target);
// });
// const updateflag=(element)=>{
//     let currCode=element.value;
//     let countCode=countryList[currCode];
//     let newsrc="https://flagsapi.com/${countryCode}/flat/64.png";
//     let img=element.parentElement.querySelector(img);
//     img.src=newsrc;
// }



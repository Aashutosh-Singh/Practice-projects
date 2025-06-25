
let currentsong=new Audio("");
let firstsong=new Audio("");
let lastsong=new Audio("");

let pp=0;
let vollevel=0.5;
let currentplaylist="songs";
let lastplaylist="songs";
async function getsongs(playlist) {
    let songs=[];
let songsinfo=[];
    let songurls=[];
        // currentplaylist.src="icons/play.svg";
        // currentplaylist=document.querySelector(".card-container #SelenaGomez .play-pause img");
        // currentplaylist.src="icons/pause.svg";
    let a = await fetch(`http://localhost:3000/${playlist}/`);

        let response = await a.text();
        console.log("response of api",response);
        let div=document.createElement("div");
        div.innerHTML=response;
        let anchor=div.getElementsByTagName("a");
        
        let baseURL;
        if (window.location.protocol === "file:") {
            // For file protocol, construct the base URL manually
            baseURL = window.location.href.replace(/\/[^\/]*$/, `/${playlist}/`);
        } else {
            // For HTTP protocol, use the origin and append /songs/
            baseURL = window.location.origin + `/${playlist}/`;
        }

        for (let i = 0; i < anchor.length; i++) {
            let elem = anchor[i];
            if (elem.href.endsWith(".mp3")|| elem.href.endsWith(".flac")) {
                // Manually construct the correct URL
                let correctURL = baseURL + encodeURIComponent(elem.innerText);
                // console.log("Correct URL:", correctURL); // Debugging log
                songs.push(correctURL);
                songsinfo.push(elem.innerText);
                
                //
                let songul=document.querySelector(".librarybox .mysongs ul");
                let text=elem.innerText.replace(/\.mp3|\.flac/g, '');
                
                let cleantext=text.replace(/[^a-zA-z\s]/g,' ').replace(/\s+/g,' ');
                // let cleantext=text.replace(/[-._]/g,' ').replace(/\s+/g,' ').replace(/\d/g,'');
                
                let words = cleantext.split(' ');
                let singer= words.slice(0, 2).join(' ');
                
                // let singer=elem.innerText.split("-")[0];
                let songname=words.slice(2).join(' ');
                // let songname=elem.innerText.split("-")[1].split(".")[0];
               
                songul.innerHTML=songul.innerHTML+`<li id=${correctURL}>
                <h5>${songname}</h5>
                <h9>${singer}</h9>
                </li>`;
                
                lastsong.src=correctURL;
            }
        }
        firstsong.src=songs[0];
        
        currentsong.src=songs[0];
            lastplaylist=currentplaylist;
            
        currentplaylist=playlist;
        playplaylist(currentsong.src);
        
}
//changing playlist
 function playplaylist(musicname){
    let audio =  new Audio(musicname);
    if(lastplaylist!=currentplaylist){
        
        currentsong.play();
        currentsong.addEventListener("pause",updatetime);
        pp=1;
        currentsong.volume=vollevel;
   
        document.querySelectorAll(".mysongs li").forEach((e)=>{
            
            if(e.id==currentsong.src){
                
                document.querySelector(".track-playing h9").innerText=e.querySelector("h5").innerText;
                document.querySelector(".track-playing p").innerText=e.querySelector("h9").innerText;
            }
        })
        
    }
    if(pp==1){
        document.querySelector(".track-control .play-pause img").src="icons/pause.svg";
        document.querySelector(`#${currentplaylist} .play-pause img`).src="icons/pause.svg";
        document.querySelector(`#${lastplaylist} .play-pause img`).src="icons/play.svg";
    }
    
    document.querySelectorAll(".mysongs li").forEach((e)=>{
        if(e.id==currentsong.src){
            e.querySelector("h5").style.color="#1DB954"
        }
        else{
            e.querySelector("h5").style.color="#ffffff"
        }
    })
    document.querySelector(".track-playing #track-playing-img").src=document.querySelector(`.card-container #${currentplaylist} .${currentplaylist}`).src;

 }

//function to update time
const updatetime=()=>{
    let duration = Math.floor(currentsong.duration);
            let durationMinutes = Math.floor(duration / 60);
            let durationSeconds = duration - durationMinutes * 60;
        
            let formattedDuration = `${String(durationMinutes).padStart(2, '0')}:${String(durationSeconds).padStart(2, '0')}`;
            document.querySelector(".player .track #duration").innerText = formattedDuration;
            //updating time
                let seconds = Math.floor(currentsong.currentTime);
                 let minutes = Math.floor(seconds/60);
                 let currseconds=seconds-minutes*60;
            let formattime=`${String(minutes).padStart(2,'0')}:${String(currseconds).padStart(2,'0')}`;
            document.querySelector(".player .track #currtime").innerText=formattime;
            document.querySelector(".circle").style.left=`${100*(seconds/duration)}%`;
            document.querySelector(".player .track-control .progress").style.width=`${100*(seconds/duration)}%`;
            //when one song ends
            if(formattedDuration==formattime){
                let nextsong;
        document.querySelectorAll(".mysongs li").forEach(
            (e)=>{
                if(e.id==currentsong.src&&currentsong.src!=lastsong.src){
                    nextsong=e.nextElementSibling;
                    
                    
                }
                
            }
        )
        playmusic(nextsong.id);
            }
}

//play music function
const playmusic=(musicname)=>{
    
    let audio =  new Audio(musicname);
    if(currentsong.src==musicname && pp==1){
        currentsong.addEventListener("pause",updatetime);
        currentsong.pause();
        pp=0;
        
    }
    else if(currentsong.src==musicname && pp==0){
        currentsong.play();
        currentsong.volume=vollevel;
        currentsong.addEventListener("timeupdate",updatetime);
        pp=1;
    }
    else{
       
        currentsong.pause();
        currentsong=audio;
        currentsong.play();
        currentsong.volume=vollevel;
        document.querySelectorAll(".mysongs li").forEach((e)=>{
            
            if(e.id==currentsong.src){
                
                document.querySelector(".track-playing h9").innerText=e.querySelector("h5").innerText;
                document.querySelector(".track-playing p").innerText=e.querySelector("h9").innerText;
            }
        })
        
        //updating time
         currentsong.addEventListener("timeupdate",updatetime);
        pp=1;
    }
    if(pp==1){
        document.querySelector(".track-control .play-pause img").src="icons/pause.svg";
        document.querySelector(`#${currentplaylist} .play-pause img`).src="icons/pause.svg";
    }
    else{
        document.querySelector(".track-control .play-pause img").src="icons/play.svg";
        document.querySelector(`#${currentplaylist} .play-pause img`).src="icons/play.svg";
    }
    document.querySelectorAll(".mysongs li").forEach((e)=>{
        if(e.id==currentsong.src){
            e.querySelector("h5").style.color="#1DB954"
        }
        else{
            e.querySelector("h5").style.color="#ffffff"
        }
    })
}

//changing songs
async function changemusic(){
    document.querySelectorAll(".mysongs li").forEach(async (e)=>{

        e.addEventListener("click",function(){
            playmusic(e.id);
             })
    })
}


(async ()=>{
    await getsongs("songs"); 
        await changemusic();
    //gettinh song
    // await getsongs(currentplaylist);
    document.querySelector("#SelenaGomez").addEventListener("click", async (e)=>{
        if(currentplaylist=="SelenaGomez"){
            playmusic(currentsong.src);
        }
        else{document.querySelector(".mysongs").innerHTML="<ul></ul";
      
        await getsongs("SelenaGomez");  
        await changemusic();}
        
         
    })
    document.querySelector("#TaylorSwift").addEventListener("click", async (e)=>{
        if(currentplaylist=="TaylorSwift"){
            playmusic(currentsong.src);
        }
        else{document.querySelector(".mysongs").innerHTML="<ul></ul";
      
        await getsongs("TaylorSwift"); 
        await changemusic(); } 
    })
    document.querySelector("#songs").addEventListener("click", async (e)=>{
        if(currentplaylist=="songs"){
            playmusic(currentsong.src);
        }
        else{document.querySelector(".mysongs").innerHTML="<ul></ul";
  
        await getsongs("songs"); 
        await changemusic();  }
       
    })
    document.querySelector("#HitSongs").addEventListener("click", async (e)=>{
        if(currentplaylist=="HitSongs"){
            playmusic(currentsong.src);
        }
        else{document.querySelector(".mysongs").innerHTML="<ul></ul";
  
        await getsongs("HitSongs");  
        await changemusic(); }
    })
    document.querySelector("#ShreyaGhoshal").addEventListener("click", async (e)=>{
        if(currentplaylist=="ShreyaGhoshal"){
            playmusic(currentsong.src);
        }
        else{document.querySelector(".mysongs").innerHTML="<ul></ul";
      
        await getsongs("ShreyaGhoshal"); 
       
        await changemusic();}
    })



    

    
    document.querySelector(".track-control .play-pause img").addEventListener("click",function(){
    
    playmusic(currentsong.src);
    })
    //play-pause on pressing space

    document.querySelector("body").addEventListener("keydown",()=>{
        if(event.key==" "){
            playmusic(currentsong.src);
        }
    })

    //previous song
    document.querySelector(".track-control #previous").addEventListener("click",function(){
        let prevsong;
        document.querySelectorAll(".mysongs li").forEach(
            (e)=>{
              
                if(e.id==currentsong.src&&currentsong.src!=firstsong.src){
                    console.log("This is running");
                    prevsong=e.previousElementSibling;
                    console.log("Song:", prevsong.innerText);
                    playmusic(prevsong.id);
                    return;
                }
                
            }
        )
        
        
    })

    //next song
    document.querySelector(".track-control #next").addEventListener("click",function(){
        let nextsong;
        document.querySelectorAll(".mysongs li").forEach(
            (e)=>{
                if(e.id==currentsong.src&&currentsong.src!=lastsong.src){
                    
                    nextsong=e.nextElementSibling;
                    console.log("Song:", nextsong.innerText);
                    
                    
                }
                
            }
        )
        playmusic(nextsong.id);
        
    })
    //songs info
    document.querySelectorAll(".mysongs li").forEach((e)=>{
            
        if(e.id==currentsong.src){
            document.querySelector(".track-playing h9").innerText=e.querySelector("h5").innerText;
            document.querySelector(".track-playing p").innerText=e.querySelector("h9").innerText;
            
        }
    })
    //song duration
    currentsong.addEventListener('loadedmetadata', updatetime);
    //song progress-bar
    document.querySelector(".play-bar").addEventListener("click",(e)=>{
        document.querySelector(".circle").style.left=`${((e.offsetX)*100)/400}%`;
        document.querySelector(".progress").style.width=`${((e.offsetX)*100)/400}%`
        currentsong.currentTime=(e.offsetX/400)*currentsong.duration;
        let seconds = Math.floor(currentsong.currentTime);
                 let minutes = Math.floor(seconds/60);
                 let currseconds=seconds-minutes*60;
            let formattime=`${String(minutes).padStart(2,'0')}:${String(currseconds).padStart(2,'0')}`;
            document.querySelector(".player .track #currtime").innerText=formattime;
            document.querySelector(".circle").style.left=`${100*(seconds/duration)}%`;
            document.querySelector(".player .track-control .progress").style.width=`${100*(seconds/duration)}%`;
        
    })
    //volume

    document.querySelector(".vol-level").style.width="50%";
        document.querySelector(".volbar-circle").style.left="50%";
        currentsong.volume=(0.5);
    document.querySelector(".volbar").addEventListener("click",(e)=>{
        document.querySelector(".vol-level").style.width=`${e.offsetX}%`;
        document.querySelector(".volbar-circle").style.left=`${e.offsetX}%`;
        vollevel=e.offsetX/100;
        currentsong.volume=(e.offsetX/100);
        console.log(currentsong.volume);
    })
    //mute
    document.querySelector(".other-controls img").addEventListener("click",()=>{
        
        if(currentsong.muted==false){
            currentsong.muted=true;
            document.querySelector(".other-controls img").src="icons/novolume.svg";
        }
        else{
            currentsong.muted=false;
            document.querySelector(".other-controls img").src="icons/highvol.svg"
        }
    })
   //ham burger
   let ham=0;
   document.querySelector(".rightbox header #ham").addEventListener("click",(e)=>{
    if(ham==0){
        document.querySelector(".leftbox").style.left="0%"
        
        ham=1;
    }
    else{
        document.querySelector(".leftbox").style.left="-100%"
        ham=0;
    }
        
   })
})();   
 
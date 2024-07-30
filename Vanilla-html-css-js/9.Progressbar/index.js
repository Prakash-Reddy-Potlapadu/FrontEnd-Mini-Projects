

(function showProgress(){
     let progress=0;
    const interval=    setInterval(()=>{
                progress++;
                const progressbar=document.getElementById("progressbar");
                progressbar.value=progress;
                const progressPercentElement=document.getElementById("progress-percent");
                progressPercentElement.innerHTML=progress+"%";
                if(progress>45){
                        progressPercentElement.style.color="#ffffff"
                }
                if(progress===100){
                        clearInterval(interval)
                }
                console.log('progress',progress);
        },100)
})()
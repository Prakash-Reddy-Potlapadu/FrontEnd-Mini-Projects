
let noOfStarsSelected =0

function handleStarClick(event){
        
        const {element}=event.target.dataset;
        if(element==="star"){
            const starID=event.target.id;
            noOfStarsSelected=Number(starID);
            const stars=document.getElementsByClassName("star");
            
            for(let i=0; i<noOfStarsSelected; i++){
                stars[i].classList.add("selected")
            }
            for(let i=noOfStarsSelected; i<5; i++){
                stars[i].classList.remove("selected")
            } 
          
            let ratingMsg;
            switch(noOfStarsSelected){
                case 1:
                        {
                                ratingMsg='Very poor';
                                break;
                        } 
                case 2:
                        {
                                ratingMsg='Poor';
                                break;
                        } 
                case 3:
                        {
                                ratingMsg='Average';
                                break;
                        } 
                case 4:
                        {
                                ratingMsg='Good';
                                break;
                        } 
                case 5:
                        {
                                ratingMsg='Excellent';
                                break;
                        }
                default: break; 
            }
            const ratingMsgElement=document.getElementById("rating-msg")
            ratingMsgElement.innerHTML=ratingMsg;
        
        }
}


function handleStarMouseOver(event){
        const {element}=event.target.dataset;
        if(element==="star"){
            const starID=event.target.id;
            const noOfStarsHovered=Number(starID);
            const stars=document.getElementsByClassName("star");
            
            for(let i=0; i<noOfStarsHovered; i++){
                stars[i].classList.add("selected")
            }
            for(let i=noOfStarsHovered; i<5; i++){
                stars[i].classList.remove("selected")
            } 
        
        }   
}


function handleStarMouseOut(event){
        const {element}=event.target.dataset;
        if(element==="star"){
            const stars=document.getElementsByClassName("star");
            for(let i=noOfStarsSelected; i<5; i++){
                stars[i].classList.remove("selected")
            } 
        
        }   
}
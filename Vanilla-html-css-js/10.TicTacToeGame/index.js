
const winningCombo=[
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]

let player1Positions=[];
let player2Positions=[];
let currentPlayer=1;
const playerTurnElement=document.getElementById('player-turn');
window.onload=()=>{
        playerTurnElement.innerHTML=`Player <b>${currentPlayer}</b> turn`
}



function didPlayerWin(playerPositions){
        console.log('playerPositions',playerPositions)
        for(let i=0; i<winningCombo.length;i++){
                const currentCombo=winningCombo[i];
                console.log('combo',currentCombo)
              
            const isWinningCombo=    currentCombo.every((position)=>
                playerPositions.includes(position)
                )
                console.log('isWinningCombo',isWinningCombo)
                if(isWinningCombo){
                       console.log("gameStatusElement",playerTurnElement)
                        // gameStatusElement.innerHTML=""
                        playerTurnElement.innerHTML=`<p style="color:darkorange">Player <b>${currentPlayer}</b> won!</p>`;
                        console.log('playerTurnElement.innerHTML',playerTurnElement.innerHTML);
                        document.getElementsByClassName('tic-tac-toe-table')[0].style.pointerEvents='none';
                        return true;
                }
        }

        
}



function handleCellClick(event){
        if(event.target.tagName!=="TD"){
                return;
        }
         
        const playerPosition=Number(event.target.id);
        if(currentPlayer===1){
                event.target.innerHTML="X"
                player1Positions.push(playerPosition)
               if(player1Positions.length>=3) {
                        if(didPlayerWin(player1Positions)){
                                debugger
                                return;
                        }
               }
                currentPlayer=2;
        }else{
                event.target.innerHTML="0" 
                player2Positions.push(playerPosition)
                if(player2Positions.length>=3) {
                       if(didPlayerWin(player2Positions)){
                                return;
                       }
               } 
                currentPlayer=1;

        }
        playerTurnElement.innerHTML=`Player <b>${currentPlayer}</b> turn`

}

function handleResetGame(){
         player1Positions=[];
         player2Positions=[];
         currentPlayer=1;
         Array.from(document.getElementsByClassName("cell")).forEach(cell=>cell.innerHTML="")
         playerTurnElement.innerHTML=`Player <b>${currentPlayer}</b> turn`;
         document.getElementsByClassName('tic-tac-toe-table')[0].style.pointerEvents='all';
}
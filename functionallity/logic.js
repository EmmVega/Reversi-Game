import * as selectors from './selectors.js';

class Token {
    id;
    colorGroup;
    coords;
    constructor(id,colorGroup,coords){
        this.id=id;
        this.colorGroup=colorGroup;
        this.coords=coords;
    }
    dropper(){
        // if(this.colorGroup){
            // console.log(selectors[this.id]);
            selectors[this.id].innerHTML = `
            <div class="token ${this.colorGroup}" ></div> 
            `;
        // }

        // masterBoard[this.colorGroup] = teamPlayer;

    }
}

class Board {
    A1;B1;C1;D1;E1;F1;G1;H1;
    A2;B2;C2;D2;E2;F2;G2;H2;
    A3;B3;C3;D3;E3;F3;G3;H3;
    A4;B4;C4;D4;E4;F4;G4;H4;
    A5;B5;C5;D5;E5;F5;G5;H5;
    A6;B6;C6;D6;E6;F6;G6;H6;
    A7;B7;C7;D7;E7;F7;G7;H7;
    A8;B8;C8;D8;E8;F8;G8;H8;
    T;
}

function mainLoop(turn, activateFlipper) {
    if (turn == 'player'){
        // alert("It's your turn");
        console.log(`Es turno es de ${masterBoard.T} del team ${opponentTeam}`); 
        opponentTeam = 'blacks';
        teamPlayer = 'whites';  
        for (var tokens in masterBoard){
            if(masterBoard[tokens] != masterBoard.T){

                // console.log(masterBoard[tokens]);               
                // if(masterBoard[tokens] && masterBoard[tokens].colorGroup == teamPlayer){
                    if(masterBoard[tokens] && masterBoard[tokens].colorGroup == teamPlayer){
                        neighborChecker(masterBoard[tokens].coords,activateFlipper);                                
                        // console.log(masterBoard[tokens]);
                        // console.log(`${masterBoard[tokens].colorGroup} En ${masterBoard[tokens].coords}`); //PRUEBA AHORITA
                    }
                    // else{
                    //     console.log(masterBoard[tokens]);                    // PRUEBA DE AHORITA
                    // }
                    // else{
                        //     console.log(masterBoard[tokens]);
                        //     console.log(masterBoard[tokens].colorGroup);
                        // }
            }
        }
    }else{
        // alert('My turn');
    console.log(`Es turno de ${masterBoard.T} del team ${opponentTeam}`); 
        opponentTeam = 'whites';
        teamPlayer = 'blacks';  
        for (var tokens in masterBoard){
            if(masterBoard[tokens] != masterBoard.T){
                if(masterBoard[tokens] && masterBoard[tokens].colorGroup == teamPlayer){
                    neighborChecker(masterBoard[tokens].coords,activateFlipper)
                    // console.log(masterBoard[tokens].colorGroup);
                    // console.log(`En ${masterBoard[tokens].coords}`);
                }
                // else{
                //     console.log(masterBoard[tokens]);
                // }
            }
        }
    }
}

function tokenFlipper(tokens, opponentTeam){
            for(var token of tokens){
            // console.log(masterBoard[token].id);
            // masterBoard[token].id.innerHTML = `
            selectors[token].innerHTML = `
            <div class="token ${opponentTeam}" ></div> 
            `;
            masterBoard[token].colorGroup = teamPlayer;
            // console.log(masterBoard[token].colorGroup);
        }  
}

function tokenBuilder(){
    const values = {
        A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8
    }
    coords = [values[(this.id).charAt(0)],parseInt((this.id).charAt(1))];
    masterBoard[this.id] = new Token(this.id,teamPlayer,coords);
    masterBoard[this.id].dropper();

    // console.log(`ASÍ CONSTRUYO EL TOKEN.?`);
    // console.log(`this: ${this}`);
    // console.log(`this.id ${this.id}`);
    // console.log(`MASTERBOARD.THIS: ${masterBoard.this}`);
    // console.log(`MASTERBOARD.C5: ${masterBoard.C5}`);
    // console.log(`MASTERBOARD.this.COLORGROUP ${masterBoard.this.colorGroup}`);

    neighborChecker(coords, true);
    // console.log(`Es turno de  ${masterBoard.T} y sus fichas son ${teamPlayer}`);
    masterBoard.T = masterBoard.T === 'player'?'machine':'player';
    // console.log(`el sig turn es de ${masterBoard.T} y sus fichas serán ${opponentTeam}`); 
    tokensFlipped = false;
    mainLoop(masterBoard.T, false);   
}

function clickListenerFactory(positionsAvailable){
    // console.log(`agregar ${positionsAvailable}`)
    selectors[positionsAvailable].addEventListener("click", tokenBuilder);
    selectors[positionsAvailable].style.backgroundColor = 'white';
}

function clickEventDeleter(positionsAvailable){
    for (var position of positionsAvailable){
        // console.log(`remover ${position}`);
        selectors[position].removeEventListener('click', tokenBuilder);
        selectors[position].style.backgroundColor = 'green';
    }
} 

function neighborChecker(home, activateFlipper) {
    const letters = ['-','A','B','C','D','E','F','G','H'];
    const values = {A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8}
    const nNeighbor = [letters[home[0]]]+[home[1]-1];
    const wNeighbor = [letters[home[0]+1]]+[home[1]];
    const sNeighbor = [letters[home[0]]]+[home[1]+1];
    const eNeighbor = [letters[home[0]-1]]+[home[1]];
    // console.log('sNeighbor: '+sNeighbor);       
    const NEIGHBORS = [nNeighbor,wNeighbor,sNeighbor,eNeighbor];

    for (var neighbor of NEIGHBORS){
        if(masterBoard[neighbor]){
            if (masterBoard[neighbor].colorGroup == opponentTeam) {
                var newNeighbor ;                   //BEFORE WHILE TO AVOID RE-INICIALIZATION 
                var track = [neighbor];
                var direction = NEIGHBORS.indexOf(neighbor);
                var follower = true;
                var newHome = [
                    values[neighbor.charAt(0)],
                    parseInt(neighbor.charAt(1)),
                  ]; //NEEDS COORDS IN NUMBERS FROM 1ST NEIGHBOR
                while (follower) {                       
                    switch (direction){
                        case 0:
                          newNeighbor = [letters[newHome[0]]] + [newHome[1] - 1];
                          break;
                        case 1:
                          newNeighbor = [letters[newHome[0] + 1]] + [newHome[1]];
                          break;
                        case 2:
                          newNeighbor = [letters[newHome[0]]] + [newHome[1] + 1];
                          break;
                        case 3:
                          newNeighbor = [letters[newHome[0] - 1]] + [newHome[1]];
                    }
                    if (masterBoard[newNeighbor]) {
                        if (masterBoard[newNeighbor].colorGroup == opponentTeam) {
                            // console.log("sigue aplicando funcion");
                            track.push(newNeighbor); // TOKENS THAN SHOULD BE FLIPPED
                            newHome = [
                                values[newNeighbor.charAt(0)],
                                parseInt(newNeighbor.charAt(1)),
                              ];
                        } else if ((masterBoard[newNeighbor].colorGroup == teamPlayer)&&(activateFlipper==true)) {
                            // console.log(activateFlipper);
                            console.log(`FLIPPER EN ${track}`); //APPLY FLIPPER FUNCTION
                            clickEventDeleter(activeListeners);
                            activeListeners = []; 
                            // setTimeout(  ()=>{
                                 tokenFlipper(track, teamPlayer);
                            // },500);
                            follower = false;
                            tokensFlipped = true;
                            // console.log(`Es turno de  ${turn}`);
                            // turn = 'player'?nextTurn='machine':nextTurn='player';
                            // return nextTurn;
                            // mainLoop();
                        }else break;
                        
                    } else{
                        if(tokensFlipped == true) return;//IF THE TOKENS WERE FLIPPED IN THE SAME PLAYED, DON'T MAKE LISTENERS OF 'EM
                        else{
                            if (
                                !isNaN(newNeighbor) ||
                                values[newNeighbor.charAt(0)] > 8 ||
                                parseInt(newNeighbor.charAt(1)) > 8 ||
                                values[newNeighbor.charAt(0)] < 1 ||
                                parseInt(newNeighbor.charAt(1)) < 1
                                ) break;
                                else{
                                console.log(`PON LA FICHA EN ${newNeighbor}`);
                                activeListeners.push(newNeighbor);
                                clickListenerFactory(newNeighbor); //ADDING EVENT LISTENERS
                                follower = false;
                            }
                        }   
                    }
                }
            }
        }
    }
}

// var turn;
// var nextTurn; 
var coords = [];
var masterBoard = new Board;
masterBoard.T = 'player';
var opponentTeam;
var teamPlayer;
var winner = undefined;
var activeListeners = [];
var tokensFlipped = false;


coords = [4,5];
masterBoard.D5 = new Token('D5','blacks',coords);
masterBoard.D5.dropper();
coords = [5,4];
masterBoard.E4 = new Token('E4','blacks',coords);
masterBoard.E4.dropper();
coords = [5,5];
masterBoard.E5 = new Token('E5','whites',coords);
masterBoard.E5.dropper();
coords = [4,4];
masterBoard.D4 = new Token('D4','whites',coords);
masterBoard.D4.dropper();

mainLoop(masterBoard.T,false);




    
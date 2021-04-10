import * as selectors from './selectors.js';
// import { tokenDroper} from './selectors';

class Token {
    id;
    colorGroup;
    coords;
    nNeighbor;
    eNeighbor;
    sNeighbor;
    wNeighbor;
    neNeighbor; 
    seNeighbor; 
    swNeighbor; 
    nwNeighbor; 
    constructor(id,colorGroup,coords,nNeighbor,eNeighbor,sNeighbor,wNeighbor,neNeighbor,seNeighbor,swNeighbor,nwNeighbor){
        this.id=id;
        this.colorGroup=colorGroup;
        this.coords=coords;
        this.nNeighbor=nNeighbor;     
        this.eNeighbor=eNeighbor;
        this.sNeighbor=sNeighbor;
        this.wNeighbor=wNeighbor;
        this.neNeighbor=neNeighbor;
        this.seNeighbor=seNeighbor;
        this.swNeighbor=swNeighbor;
        this.nwNeighbor=nwNeighbor;   
    }
    dropper(){
        if(this.colorGroup){
            this.id.innerHTML = `
            <div class="token ${this.colorGroup}" ></div> 
            `;
        }
    }
    // checker(){
    //     if(this.colorGroup){
    //         console.log(this.colorGroup)
    //         this.coords
    //     }
    // }
}

class Board {
    B1;
    D4;
    D5;
    E4;
    E5;
}
var masterBoard = new Board;


D4.addEventListener("click", () => {
    const coords = [4,4];
    masterBoard.D4 = new Token(D4,'blacks',coords,false,true,true,false,false,false,false,false);
    masterBoard.D4.dropper();
    console.log(masterBoard.D4.coords);
    const wNeighbor = neighborChecker(masterBoard.D4.coords);
});

D5.addEventListener("click", () => {
    const coords = [4,5];
    masterBoard.D5 = new Token(D5,'blacks',coords,false,true,true,false,false,false,false,false);
    masterBoard.D5.dropper();
});

E4.addEventListener("click", () => {
    var coords = [[5],[4]];
    masterBoard.E4 = new Token(E4,'blacks',coords,false,true,true,false,false,false,false,false);
    masterBoard.E4.dropper();
});

E5.addEventListener("click", () => {
    const coords = [5,5];
    masterBoard.E5 = new Token(E5,'whites',coords,false,true,true,false,false,false,false,false);
    masterBoard.E5.dropper();
});

function neighborChecker(home) {
    const letters = ['-','A','B','C','D','E','F','G','H'];
    // console.log('Home: '+home);

    const nNeighbor = [letters[home[0]]]+[home[1]-1];
    console.log('nNeighbor: '+nNeighbor);
    const wNeighbor = [letters[home[0]+1]]+[home[1]];
    console.log('wNeighbor: '+wNeighbor); 
    const sNeighbor = [letters[home[0]]]+[home[1]+1];
    console.log('sNeighbor: '+sNeighbor); 
    const eNeighbor = [letters[home[0]-1]]+[home[1]];
    console.log('eNeighbor: '+eNeighbor);       
    
    const NEIGHBORS = [nNeighbor,wNeighbor,sNeighbor,eNeighbor];

    for (var neighbor of NEIGHBORS){
        if(masterBoard[neighbor]){
            console.log(`HAY FICHA ${neighbor}`);
        }else{
            console.log(`NO HAY FICHA ${neighbor}`);
        }
    }
}

import * as selectors from './selectors.js';
// import { tokenDroper} from './selectors';

var space = {
    id: undefined,
    token: undefined,
    nNeighbor: undefined,
    eNeighbor: undefined,
    sNeighbor: undefined,
    wNeighbor: undefined,
    neNeighbor: undefined,
    seNeighbor: undefined,
    swNeighbor: undefined,
    nwNeighbor: undefined
};

class tokenBuilder {
    id;
    colorGroup;
    nNeighbor;
    eNeighbor;
    sNeighbor;
    wNeighbor;
    neNeighbor; 
    seNeighbor; 
    swNeighbor; 
    nwNeighbor; 
    constructor(id,colorGroup,nNeighbor,eNeighbor,sNeighbor,wNeighbor,neNeighbor,seNeighbor,swNeighbor,nwNeighbor){
        this.id=id;
        this.colorGroup=colorGroup;
        this.nNeighbor=nNeighbor;     
        this.eNeighbor=eNeighbor;
        this.sNeighbor=sNeighbor;
        this.wNeighbor=wNeighbor;
        this.neNeighbor=neNeighbor;
        this.seNeighbor=seNeighbor;
        this.swNeighbor=swNeighbor;
        this.nwNeighbor=nwNeighbor;   
    }
}

const D4 = new tokenBuilder('D4','whites',false,true,true,false,false,false,false,false);
const D5 = new tokenBuilder('D5','blacks',true,true,false,false,false,false,false,false);
const E4 = new tokenBuilder('E4','whites',false,false,true,true,false,false,false,false);
const E5 = new tokenBuilder('E5','blacks',true,false,false,true,false,false,false,false);


var token = {
    id: undefined,
    color: undefined
};




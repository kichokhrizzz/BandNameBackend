const { v4: uuidV4 } = require('uuid');

class Band {

    constructor( name = 'no-name', img = 'https://via.placeholder.com/150' ){

        this.id = uuidV4(); //ID unico
        this.name = name;
        this.votes = 0;
        this.img = img;
    }

}

module.exports = Band;
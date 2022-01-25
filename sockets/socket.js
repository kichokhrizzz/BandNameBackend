const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
console.log(' ● Servidor inicializado ● ');

bands.addBand( new Band( 'Queen', 'https://i.scdn.co/image/af2b8e57f6d7b5d43a616bd1e27ba552cd8bfd42' ) );
bands.addBand( new Band( 'Lindemann', 'https://i.pinimg.com/originals/82/03/29/8203293f8bf920256859495f55a134db.jpg' ) );
bands.addBand( new Band( 'Emigrate', 'https://rammwiki.net/w/images/thumb/a/a6/Emigratevinyl.jpg/300px-Emigratevinyl.jpg' ) );
bands.addBand( new Band( 'Gorillaz', 'https://crazyminds.es/wp-content/uploads/GORILLAZ-2020.jpg' ) );

console.log(bands);

//Mensajes de Sockets
io.on('connection', client =>{

    console.log('Cliente conectado', Date());

    //Mandamos el listado de las bandas
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload)=> {
        console.log('Mensaje!!!', payload);

        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    });

    client.on('emitir-mensaje', ( payload) => {
        console.log(payload);
        client.broadcast.emit('nuevo-mensaje', payload); //Emite a todos menos al que lo emitió
    });

    client.on('vote-band', (payload) => {
        //console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) =>{
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) =>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    })

});
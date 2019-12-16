import express from 'express';

export default class Server {

    public app: express.Application;
    public port: any = process.env.PORT || 3000 ;

    constructor(){
        this.app = express();
    }

    //Poner el puerto a la escucha
    start( callback: any) {
        this.app.listen(this.port, callback);
    }
}
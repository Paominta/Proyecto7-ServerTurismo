import  Server  from "./classes/server";
import userRoutes from "./routes/usuario";
import mongoose from 'mongoose';

import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import postRoutes from "./routes/post";


const server = new Server();

// Midelware (body parser)
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());


//FileUpload
server.app.use(fileUpload());


// Configuracion de CORS
server.app.use(cors({origin: true, credentials: true}))

//Rutas de la aplicacion
server.app.use('/user',userRoutes);
server.app.use('/posts',postRoutes);


//Conectar DB
let uri = 'mongodb+srv://Paola:FSWZtqjWfodowhiw@cluster0-owcnv.mongodb.net/fotosgram?retryWrites=true&w=majority' 

mongoose.connect(uri,
            { useNewUrlParser: true, useCreateIndex:true },(err)=>{
            
                if (err) throw err;
                console.log('Base de datos online');               
})




//Levantar express 
server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
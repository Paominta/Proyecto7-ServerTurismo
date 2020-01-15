import {Schema,Document,model} from 'mongoose';

const postSchema = new Schema({

    created:{
        type:Date
    },
    nombre:{
        type: String 
    },
    mensaje:{
        type:String
    },
    categoria:{
        type: String 
    },
    direccion:{
        type: String 
    },
    horario:{
        type: String 
    },
    costo:{
        type: String 
    },
    contactos:{
        type: String 
    },
    imgs: [{
        type:String
    }],
    coords:{
        type: String // Latitud y longitud
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required:[true,'Debe existir un relacion a un usuario']
    }
});

postSchema.pre<IPost>('save',function(next){
    this.created = new Date();
    next();
});

interface IPost extends Document{
    created:Date;
    nombre: string;
    mensaje:string;
    categoria: string;
    direccion: string;
    horario: string;
    costo: string;
    contactos: string;
    img:string[];
    coords:string;
    usuario:string;
}

export const Post = model<IPost>('Post', postSchema);
   
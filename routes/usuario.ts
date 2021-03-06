import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { verificaToken } from "../middlewares/autenticacion";

const userRoutes = Router();

//login
userRoutes.post('/login',(req:Request, res:Response) =>{

    const body = req.body;
    
    Usuario.findOne({ email: body.email}, (err, userDB)=>{
        if ( err) throw err;

        if (!userDB){
            return res.json({
                ok:false,
                mensaje:'Usuario/contraseña no son correctos'
            });
        }

        if (userDB.compararPassword(body.password)){

            const tokenUser = Token.getJwtToken({
                _id:userDB._id,
                nombre:userDB.nombre,
                email:userDB.email,
                avatar:userDB.avatar,
                edad: userDB.edad,
                genero: userDB.genero,
                pais: userDB.pais,
                ciudad: userDB.ciudad,
                intereses: userDB.intereses
            });

            res.json({
                ok:true,
                token: tokenUser
            });

        }else{
            return res.json({
                ok:false,
                mensaje:'Usuario/contraseña no son correctos ***'
            });
        }

        
    })
});



//Crear un usuario
userRoutes.post('/create',(req: Request, res: Response) =>{
    
    const user ={
        nombre : req.body.nombre,
        email  : req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
        avatar: req.body.avatar,
        edad: req.body.edad,
        genero:req.body.genero,
        pais: req.body.pais,
        ciudad: req.body.ciudad,
        intereses: req.body.intereses
    }


    Usuario.create(user).then( userDB =>{

        const tokenUser = Token.getJwtToken({
            _id:userDB._id,
            nombre:userDB.nombre,
            email:userDB.email,
            avatar:userDB.avatar,
            edad: userDB.edad,
            genero: userDB.genero,
            pais: userDB.pais,
            ciudad: userDB.ciudad,
            intereses: userDB.intereses
        });

        res.json({
            ok:true,
            token: tokenUser
        });

    }).catch( err =>{
        res.json({
            ok: false,
            err
        })
    });
    
    
});

//Actualizar usuario
userRoutes.post('/update', verificaToken,(req:any, res:Response) =>{
    
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar,
        edad: req.body.edad || req.body.edad,
        genero:req.body.genero ||req.body.genero,
        pais: req.body.pais || req.body.pais,
        ciudad: req.body.ciudad || req.body.ciudad,
        intereses: req.body.intereses || req.body.intereses
    }

    Usuario.findByIdAndUpdate(req.usuario._id,user,{ new: true},(err, userDB)=>{
        if (err) throw err;

        if (!userDB){
            return res.json({
                ok:false,
                mensaje:'No existe usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id:userDB._id,
            nombre:userDB.nombre,
            email:userDB.email,
            avatar:userDB.avatar,
            edad: userDB.edad,
            genero: userDB.genero,
            pais: userDB.pais,
            ciudad: userDB.ciudad,
            intereses: userDB.intereses
        });

        res.json({
            ok:true,
            token: tokenUser
        });

    });
});

userRoutes.get('/',[verificaToken],(req :any, res: Response) => {

    const usuario = req.usuario;

    res.json({
        ok:true,
        usuario    
    });
});


export default userRoutes;
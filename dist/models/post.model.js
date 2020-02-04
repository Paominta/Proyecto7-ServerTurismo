"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del lugar es necesario']
    },
    mensaje: {
        type: String
    },
    categoria: {
        type: String
    },
    direccion: {
        type: String
    },
    horario: {
        type: String
    },
    costo: {
        type: String
    },
    contactos: {
        type: String
    },
    imgs: [{
            type: String
        }],
    coords: {
        type: String // Latitud y longitud
    },
    recorrido: {
        type: String
    },
    estado: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir un relacion a un usuario']
    }
});
postSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Post = mongoose_1.model('Post', postSchema);

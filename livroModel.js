import {Schema, model} from "mongoose"; 

const livroSchema = new Schema({
    titulo:{
        type: String,
        required: true,
    },
    autor:{
        type: String,
        required: true,
    },
    ano:{
        type: String,
        required: true,
    },
    genero:{
        type: String,
        required: true,
    },
    preco:{
        type: Number,
        required: true,
        min: 0,
        default: 0,
    }
});
export default model("Livro", livroSchema);
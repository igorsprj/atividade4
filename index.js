import express, { request } from "express"
import mongoose from "mongoose"
import livroModel from "./models/livroModel.js";   

const app = express();
app.use(express.json());
mongoose.connect("mongodb+srv://admin:<password>@cluster0.i1kxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.listen(3334, () => console.log('servidor iniciado!!'));

//primeira rota para testar a app
app.get("/ping", (request,response)=>{
   console.log("entrou no get")
   return response.json({message: "pong"});
})

//metodo para cadastrar um novo livro
app.post("/livros", async (request, response)=>{      
    try{
     console.log("entou post");
     const body = request.body;
     console.log(body);
     await livroModel.create({titulo:body.titulo,autor:body.autor,ano:body.ano,genero:body.genero,preco:body.preco});    
     return response.status(201).json({message: "ok"});
    }catch (error){
     return response.status(500).json({message: "erro ao cadastrar o livro" + error});
    }  
 })
 
//metodo para listar todos os livros
app.get("/livros", async (request, response)=>{
     try{
         const resp = await livroModel.find();
 
         return response.json(resp);
     }catch(error){
         return response.status(500).json({message:" erro ao buscar os livros"+error})
     }    
})

//metodo para pegar os dados de um livro especifico
app.get("/livros/:id", async (request, response)=>{
    const id = request.params.id;
        try{
            const codigo = await livroModel.findById(id);
            if(!codigo){
                return response.status(404).json({message: "livro nao existente"});
            }else{
                return response.json(codigo);
            }    
        }catch(error){
            return response.status(500).json({message: "erro ao buscar livro"+ error});
        }
})

//metodo para realizar edicao dos dados de um livro
app.put("/livros/:id", async(request,response)=>{
        try{
        const body = request.body;
        const id = request.params.id;
        const time = await livroModel.findOneAndUpdate({_id: id},{titulo:body.titulo,autor:body.autor,ano:body.ano,genero:body.genero,preco:body.preco});
            
            if(!time){
                return response.status(404).json({message: "livro nao existente"});
            }
            
            return response.json({message:"ok"});
        }catch(error){
            return response.status(500).json({message: "erro ao editar livro"+ error});
        } 
})

//metodo para realizar a exclusão de um livro
app.delete("/livros/:id", async(request,response)=>{
        try{
     
        const id = request.params.id;
        const time = await livroModel.findOneAndDelete({_id: id});
            
            if(!time){
                return response.status(404).json({message: "livro nao existente"});
            }
            
            return response.json({message:"ok"});
        }catch(error){
            return response.status(500).json({message: "erro ao deletar livro"+ error});
        }
     
})

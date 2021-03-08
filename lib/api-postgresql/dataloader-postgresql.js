const {pgsql }=require('../../db/db')
const errores = require('../errors')
const DataLoader = require('dataloader')
let db = pgsql
const { Op } = db.Sequelize
const findBy = async (model,mensaje,...values) => { 
 
    try {
        return  await model.then(res=>
            res.findAll({
                where: {id:{[Op.in]:values}}} // conditions
              )
              )
    } catch (error) {
        console.log("Error al realizar el types de ", mensaje)
        errores(error)
        
    }
  }

const findComentarioPost = async(model,mensaje,...values)=>{
    try {
        return  await model.then(res=>
            res.findAll({where:{postsid:values}}
            // conditions
              )
              ).catch(err => JSON.stringify(err))
              
              
    } catch (error) {
        console.log("Error al realizar el types de ", mensaje)
        errores(JSON.stringify(error))
        
    }
}
const loaderUsuarios = new DataLoader(values => 
  findBy(db.usuarios,"usuariosid",...values)
    );
const loaderCategorias = new DataLoader(values => 
        findBy(db.categorias,"categoriasid",...values)
          );
const loaderPosts = new DataLoader(values => 
    findBy(db.posts,"postsid",...values)
      );
const loaderComentarios = new DataLoader(values => 
    findComentarioPost(db.comentarios,"comentarios",...values)
      );

module.exports={
dataloaderUsuarios:loaderUsuarios,
dataloaderCategoria:loaderCategorias,
dataloaderPosts: loaderPosts,
dataloaderComentarios: loaderComentarios
}

// const findBy = async (...values) => { 
 
//     try {
//         return  await db.usuarios.then(res=>
//             res.findAll({
//                 where: {id:{[Op.in]:values}}} // conditions
//               )
//               )
//     } catch (error) {
//         console.log("Error al realizar el types de", mensaje)
//         errores(error)
        
//     }

    
    
//   }
//   const loaderListaDatos = new DataLoader(model => 
//   findBy(...model)
//     );
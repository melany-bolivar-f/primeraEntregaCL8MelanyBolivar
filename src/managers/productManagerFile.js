const fs=require('node:fs')

//crear  elproductos.json en la carpeta src
const path='./src/mockDB/Productos.json'

class ProductManagerFile{
    constructor(){
        this.path=path
    }
    readFile=async()=>{
        try{
            const data=await fs.promises.readFile(this.path,'utf-8')
            console.log(data)
            return JSON.parse(data)
        }catch(error){
            return []
        }
    }
    getProducts= async(id)=>{
        try{
            return await this.readFile()
        }catch(error){
            return 'no hay productos'
        }
    }
    getProductById= async(id)=>{
        try{
            const products=await this.readFile()
            if (!products) return 'no hay productos'
            return products.find(product=>product.id===id)
        }catch(error){
            return new Error(error)
        }
    }
    addProduct= async(newItem)=>{
        try{
            let products=await this.readFile()
            const productDb=products.find(product=>product.code===newItem.code)
            console.log(productDb)
            if (productDb){
                return 'ya se encuentra el producto'
            }
            if(products.length===0){
                //creando propiedad id
                newItem.id=1
                products.push(newItem)
            }else{
                //products=[...products,{...newItem,id:products[products.length-1 ].id+1}]
                products=[...products,{...newItem,id:products.length+1}]
            }
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,2),'utf-8')
            return 'producto agregado'

        }catch(error){
            return new Error(error)
        }
    }
    updateProduct=async(pid,undateToProduct)=>{
        try{
            //leo todos los productos 
            let products=await this.readFile()
            const productIndex=products.findIndex(product=> pid ===product.id)
            if (productIndex!==-1){
                products[productIndex]=undateToProduct
            }
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,2),'utf-8')
            return 'producto actualizado'

        }catch(error){
            return 'ese id no se encuentra'
        }
    }
    deleteProduct=async(pid)=>{
        try{
            let products=await this.readFile()
            if(!products.some(product=>product.pid===pid)){
                return 'el producto que quiere borrar no existe.'
            }
            const productsfiltered=products.filter(product=>product.pid!==pid)
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,2),'utf-8')
            return 'producto eliminado'

        }catch(error){
            return new Error(error)
        }
    }


}

module.exports= ProductManagerFile
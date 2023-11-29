
const fs= require ('node:fs')
const { pid } = require('node:process')
//Daos Data Access Object
class CartsManagerFile{
    constructor(){
        this.path='./src/mockDB/Carts.json'
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
    getCartById=async(cid)=>{
        const carts=await this.readFile() 
        const cart= carts.find(cart=>cart.id===cid)
        if (!cart){
            return 'no se encuentra el carrito'
        }
        return cart
    }
    createCart=async()=>{
        const carts=this.readFile()
        let newCart
        if (carts.length===0){ 
            newCart= {id:1, products:[]}
        }else{
            newCart={id: carts.length+1, products:[]}
        }
        carts.push(newCart)
        const results= await fs.promises.writeFile(this.path, JSON.stringify(carts,null,2),'utf-8')
        return results
    }
    //ver cambio pid por product
    addProductToCart=async(cid,pid)=>{
        const carts=await this.readFile()
        const cartIndex= carts.findIndex((cart)=>cart.id===cid)
        if (cartIndex===-1){
            return 'no se encuentra el carrito'
        }
        const productIndex= carts[cartIndex].products.findIndex((product)=>product.productId===pid)
        if (productIndex!==-1){
            carts[cartIndex].products[productIndex].quantity +=1
        }else{
            carts[cartIndex].products.push({productId:pid,quantity: 1})
        }
        const results= await fs.promises.writeFile(this.path, JSON.stringify(carts,null,2),'utf-8')
        return results
    }   
    getCars(){
        return this.carts
    }
}

module.exports= CartsManagerFile
const {Router}=require('express')
const ProductManagerFile = require('../managers/productManagerFile.js')
//const { all } = require('./products.router')
const router= Router()
const productService=new ProductManagerFile()

router
    .get('/',async(req,res)=>{
        try{
            await productService.readFromFile()
            const limit = parseInt(req.query.limit)
            const allProducts= await productService.getProducts()

            if (!isNaN(limit)){
                const limitedProducts= allProducts.slice(0,limit)
                res.json(allProducts)
            }else{
                res.json(allProducts)
            }
        }catch(error){
            console.error(error)
            res.status(500).send('error delservidor')
        }
    })
    .get('/:pid',async(req,res)=>{
        const id=parseInt(req.params.pid)
        try{
            await productService.readFromFile()
            const producto= productService.getProductById(id)
            if(producto){
                res.json(producto)
            }else{
                res.status(400).send('producto no encontrado')
            }
        }catch(error){
            console.error(error)
            res.status(500).send('error del servidor')
        }
    })
    .post('/',(req,res)=>{
        const {title,description,price,thumbnail,code,stock,status,category}= req.body
        productService.addProduct(title,description,price,thumbnail,code,stock,status,category)
        res.json({message: 'productoagregadocon exito'})
    
    })
    .put('/:id',(req,res)=>{
        const productId=parseInt(req.params.id)
        if (isNaN(productId)){
            return res.status(400).json({error:'id invalido'})
        }
        const updateProductData=req.body
        productService.updateProduct(productId,updateProductData)
        res.json({message: `producto con ID ${productId} actualizado con exito.`})
    })
    .delete('/:id',(req,res)=>{
        const productId=this.param(req.params.id)
        if (isNaN(productId)){
            return res.status(400).json({error:'id no valido.'})
        }
        res.json(productService.deleteProduct(productId))
    })

module.exports=router
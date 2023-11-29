const express=require("express")
const productsRouter=require('./routes/products.router.js')
const cartsRouter=require('./routes/carts.router.js')

const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//   http://localhost:8080/
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)

app.listen(8080,()=>{
    console.log('corriendo en el puerto 8080')
})
const express=require('express')
const morgan=require('morgan')
const cors=require('cors')


const router=require('./router/index')
const errorHandler=require('./middleware/errorHandler')
require('./model')

const app=express()

app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(morgan('dev'))
app.use(cors())


app.use('/api',router)

app.use(errorHandler())

app.listen(5000,()=>{
    console.log("server is listening at http://localhost:5000/")
})
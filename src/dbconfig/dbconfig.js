import configDotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '@/models/userModel'

const db=async()=>{
   await mongoose.connect(process.env.DATABASE_URL,{
      dbName:'blogapp'
   })
   .then(()=>console.log('DB CONNECTED SUCCESSFULLY'))
   .catch((error)=>console.log(error.message))
}

export default db;
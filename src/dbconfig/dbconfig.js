import mongoose from 'mongoose'

const db=async()=>{
   await mongoose.connect(process.env.DATABASE_URL,{
      dbName:'blogapp'
   })
   .then(()=>console.log('DB CONNECTED SUCCESSFULLY'))
   .catch((error)=>console.log(error.message))
}

export default db;
'use server'
import React from 'react'
import { signIn } from '@/auth'
import { Button } from '../components/ui/button'
const GithubHandler = async() => {  
  try{  
       await signIn('github')    
}
catch(error:any)
{
  return error.message
}
}

export default GithubHandler
'use client'
import Header from '@/components/header'
import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import ProfileUpload from '@/components/profilePicture'
const page = () => {

   const session=useSession()


   return session.status==='loading'?<h2>Loading...</h2>:
   <>
      <Header/>
    <div className='flex flex-col items-center'>
      <h2 className='bg-zinc-900 rounded-md px-3 py-2 text-white w-fit mt-2'>Profile Page</h2>
       {!session.data?.user?.image ? (
                  <Image
                    src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1310.jpg?semt=ais_hybrid&w=740"
                    width={10}
                    height={10}
                    alt="profileImage"
                    className="w-10 h-10 rounded-full"
              
                  />
                ):
                 <Image
                    src={session.data.user.image}
                    width={100}
                    height={100}
                    alt="profileImage"
                    className="w-10 h-10 rounded-full object-cover border border-zinc-600"
            
                  />
                }
      <h2>{session.data?.user?.email}</h2>
      <h2>{session.data?.user?.name}</h2>
      <ProfileUpload/>
      <h2>Upload Image Here</h2>
    </div>
    </>
}

export default page
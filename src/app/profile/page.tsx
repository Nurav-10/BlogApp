'use client'
import Header from '@/components/header'
import Image from 'next/image'
import ProfileUpload from '@/components/profilePicture'
import { useAuth } from '../../../context/authContext'
import Loader from '@/components/loader'
const Page = () => {
  const {loading,user}=useAuth()

   return loading? <Loader/> :
   <>
      <Header/>
    <div className='flex flex-col items-center'>
      <h2 className='bg-zinc-900 rounded-md px-3 py-2 text-white w-fit mt-2'>Profile Page</h2>
       {!user?.profilePicture ? (
                  <Image
                    src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1310.jpg?semt=ais_hybrid&w=740"
                    width={100}
                    height={100}
                    alt="profileImage"
                    className="w-10 h-10 rounded-full"
              
                  />
                ):
                 <Image
                    src={user?.profilePicture}
                    width={100}
                    height={100}
                    alt="profileImage"
                    className="w-10 h-10 rounded-full object-cover border border-zinc-600"
            
                  />
                }
      <h2>{user?.email}</h2>
      <h2>{user?.username}</h2>
      <ProfileUpload/>
      <h2>Upload Image Here</h2>
    </div>
    </>
}

export default Page
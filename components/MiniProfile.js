import { getAuth, signOut } from 'firebase/auth';
import React from 'react'
import { useRecoilState } from 'recoil'
import userState from '../atom/userAtom'
import { app } from '../firebase';

function MiniProfile() {

  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const auth = getAuth(app);

  const onSignOut = () => {
    signOut(auth);
    setCurrentUser(null);
  }

  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
        <img src={currentUser?.userImg} className='h-16 rounded-full border p-[2px]' alt='user-image' />
        <div className='flex-1 ml-4'>
            <h2 className='font-bold'>{currentUser?.username}</h2>
            <h3 className='text-gray-400 text-sm'>Welcome to instagram!</h3>
        </div>
        <button onClick={onSignOut} className='font-semibold text-blue-400 text-sm'>Sign out</button>
    </div>
  )
}

export default MiniProfile
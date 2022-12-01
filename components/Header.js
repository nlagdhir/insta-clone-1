import Image from "next/image";
import { useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import {useRecoilState} from 'recoil';
import modalState from "../atom/modalAtom";
import { useRouter } from 'next/router';
import { doc, getDoc } from "firebase/firestore";
import { db, app } from '../firebase';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import userState from '../atom/userAtom'; 

function Header() {
  const router = useRouter();
  const auth = getAuth(app);
  const [open, setOpen] = useRecoilState(modalState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      
      if(user) {
        const fetchUser = async () => {
          const docRef = doc(db, 'users', user.auth.currentUser.providerData[0].uid);
          const docSnap = await getDoc(docRef);
          if(docSnap.exists) {
            setCurrentUser(docSnap.data());
          }
        }
        fetchUser();
      }
      
    })
    
  }, [])

  const onSignOut = () => {
    signOut(auth);
    setCurrentUser(null);
  }


  return (
    <>
      {/* // Left */}
      <div className="shadow-sm border-b sticky top-0 z-30 bg-white">
        <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
          <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
              alt="logo"
              layout="fill"
              className="object-contain"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="cursor-pointer h-24 w-10 relative lg:hidden">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
              alt="logo"
              layout="fill"
              className="object-contain"
              onClick={() => router.push('/')}
            />
          </div>

          <div className="relative">
            <div className="absolute top-2 left-2">
              <MagnifyingGlassIcon className="h-5" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 text-sm pl-10 border-gray-500 focus:ring-black focus:border-black rounded-md"
            />
          </div>

          {/* Right Side */}

          {currentUser ? 
            <div className="flex space-x-4 items-center">
            <HomeIcon onClick={() => router.push('/')} className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out hidden md:inline-flex" />
            <PlusCircleIcon onClick={() => setOpen(true)} className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out" />

            <img
              onClick={onSignOut}
              src={currentUser.userImg}
              alt="user-image"
              className="h-10 rounded-full cursor-pointer"
            />
          </div>
          : 
          <div onClick={() => router.push('/auth/signin')} className="cursor-pointer">Sign In</div>
          }
          
        </div>
      </div>
    </>
  );
}

export default Header;

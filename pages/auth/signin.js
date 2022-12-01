import Header from "../../components/Header";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db, app } from "../../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

function SignIn() {
  const router = useRouter();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      const user = auth.currentUser.providerData[0];

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
        });
        router.push("/"); 
      }else{
        router.push("/"); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center space-x-7 mt-20">
        <img
          src="https://superviral.com.au/wp-content/uploads/2021/08/instagix-banner-graphic.png"
          alt="instagram-img"
          className="rotate-6 hidden object-cover md:inline-flex md:w-48 "
        />

        <div className="">
          <div className="flex flex-col items-center">
            <img
              src="https://socodigital.com/wp-content/uploads/2021/03/Instagram.png"
              alt="instagram-logo"
              className="w-32 object-cover"
            />
            <p className="my-10 italic text-sm text-center">
              This app is created for learning purpose.
            </p>
            <buttons
              onClick={onGoogleClick}
              className="bg-red-400 hover:bg-red-500 text-white p-3 rounded-lg cursor-pointer"
            >
              Sign in with Google
            </buttons>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

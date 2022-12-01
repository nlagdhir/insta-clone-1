import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useRecoilState } from "recoil";
import userState from "../atom/userAtom";

function Feed() {
  const [currentUser] = useRecoilState(userState);
 
  return (
    <main className={`grid ${currentUser ? 'grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto' : 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' } `}>
      <section className="md:col-span-2">
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>
      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-[380px]">
          {/* Mini profile */}
          <MiniProfile />

          {/* Suggestions  */}
          <Suggestions />
        </div>
      </section>
    </main>
  );
}

export default Feed;

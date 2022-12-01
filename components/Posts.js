import Post from "./Post";
import { useState, useEffect } from "react";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { db } from '../firebase';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "posts"), orderBy('timestamp','desc')), (spapshot) => {
      setPosts(spapshot.docs);
    });
    return unsub;
  },[db]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          profileImg={post.data().profileImg}
          postImage={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;

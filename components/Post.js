import { useEffect, useState } from "react";
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import userState from "../atom/userAtom";

function Post({ username, id, profileImg, postImage, caption }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [currentUser] = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === currentUser?.uid) !== -1
    );
  }, [likes]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);

  const handleLikeClick = async () => {
    if (!hasLiked) {
      await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
        username: currentUser?.username,
      });
    } else {
      await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
    }
  };

  const handlePostClicked = async (event) => {
    event.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: currentUser?.username,
      userImage: currentUser?.userImg,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Post Header Section */}
      <div className="flex items-center p-5">
        <img
          src={profileImg}
          alt={username}
          className="h-12 rounded-full border p-[1.5px] cursor-pointer mr-4"
        />
        <p className="font-bold flex-1">{username}</p>

        <EllipsisHorizontalIcon className="h-5" />
      </div>

      {/* Post Image Section */}
      <img src={postImage} alt="post image" className="object-cover w-full" />

      {/* Post buttons */}

      {currentUser && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={handleLikeClick}
                className="text-red-400 btn"
              />
            ) : (
              <HeartIcon onClick={handleLikeClick} className="btn" />
            )}

            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Post caption */}
      <p className="px-4 pt-4 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-2">{likes.length} likes</p>
        )}
      </p>

      <p className="px-4 pt-0 pb-4 truncate">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="mx-7 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment) => (
            <div className="flex items-center space-x-2 mb-2" key={comment.id}>
              <img
                src={comment.data().userImage}
                alt="user-image"
                className="h-7 rounded-full object-cover"
              />
              <p className="font-semibold">{comment.data().username}</p>
              <p className="flex-1 truncate">{comment.data().comment}</p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}

      {/* Post comment form */}
      {currentUser && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            placeholder="Enter your comment..."
            className="flex-1 focus:ring-0 border-0"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button
            disabled={!comment.trim()}
            type="submit"
            onClick={handlePostClicked}
            className="font-bold text-blue-400 disabled:text-blue-200"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;

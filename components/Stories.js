import { useEffect, useState } from 'react';
import Story from './Story';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { useRecoilState } from 'recoil';
import userState from '../atom/userAtom';


function Stories() {

    const [storyUsers, setStoryUsers] = useState([]);
    const [currentUser] = useRecoilState(userState);

    useEffect(() => {
        const storyUsersData = minifaker.array(20, (i) => (
            {
                id: i,
                username: minifaker.username().toLocaleLowerCase(),
                img: `https://i.pravatar.cc/150?img=${i}`,
            }
        ));
        setStoryUsers(storyUsersData);
    },[])

  return (
    <div className='flex bg-white border p-6 space-x-2 mt-8 border-gray-200 overflow-x-scroll scrollbar-none'>
        { currentUser &&  <Story username={currentUser?.username} img={currentUser?.userImg} isUser="true" />}
        {storyUsers.map(user => (
            <Story key={user.id} username={user.username} img={user.img}/>
        ))}
    </div>
  )
}

export default Stories
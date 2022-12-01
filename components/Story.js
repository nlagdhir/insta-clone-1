import { PlusIcon } from '@heroicons/react/24/solid';

function Story({img, username, isUser}) {
  return (
    <div className='relative group cursor-pointer'>
        <img src={img} alt={username} className="h-12 rounded-full p-[1.5px] border-2 border-red-500 group-hover:scale-110 transition-transform duration-200 ease-out" />
        {isUser && <PlusIcon className='h-6 absolute top-3 left-3 text-white' />}
        <p className='text-xs w-14 truncate'>{username}</p>
    </div>
  )
}

export default Story
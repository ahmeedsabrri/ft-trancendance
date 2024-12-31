import searchIcon from '../../../../public/FriendSide/Search.png'
import Image from 'next/image'

const Search = () => {

    return (
        <div className="w-11/12 min-h-[80px] flex justify-center items-center">
            <div className='w-full h-4/6 rounded-2xl bg-search_blur backdrop-blur-2xl flex justify-end shadow-search_inner'>
                <input className="bg-transparent w-11/12 font-bold placeholder:text-search_color outline-none color-search_color" placeholder='Search...'/>
            </div>
        </div>
    );
}

export default Search;
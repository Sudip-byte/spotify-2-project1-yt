import {
    HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, RssIcon
} from "@heroicons/react/outline"
import {
    HeartIcon
} from "@heroicons/react/solid"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {

    const spotifyApi = useSpotify();
    const { data : session, status} = useSession();
    const [ playlists, setPlaylists ] = useState([]);
    const [ playlistId, setPlaylistId ] = useRecoilState(playlistIdState);

    console.log("PICKED PLAYLIST", playlistId);

    useEffect(() => {
        if(spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    } , [session, spotifyApi]);

    return (
        <div className="text-gray-500 p-5 text-xs 
        lg:text-sm border-r border-gray-800 overflow-y-scroll scrollbar-hide  h-screen 
        sm:max-w-[12rem] lg:max-w-[20rem] hidden md:inline-flex pb-36" >

            <div className="space-y-4">

                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Home</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5"/>
                    <p>Search</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5"/>
                    <p>Your Library</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900"/>

                <button className="flex items-center text-yellow-300 space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5"/>
                    <p className="text-green-600">Create Playlist</p>
                </button>

                <button className="flex items-center text-pink-700 space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5"/>
                    <p className="text-green-600">Liked Songs</p>
                </button>

                <button className="flex items-center text-blue-500 space-x-2 tex hover:text-white">
                    <RssIcon className="h-5 w-5"/>
                    <p className="text-green-600">Your Episodes</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900"/>

                {/* PLAYLISTS */}
                
                {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">{playlist.name}</p>
                ))}

            </div>
            
        </div>
    )
}

export default Sidebar

/* eslint-disable react/no-unescaped-entities */
import TopPost from './TopPost'
import { FaRegStar } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { SlReload } from "react-icons/sl";

const RightSide = () => {
    const navigate = useNavigate();
    const handProfile = () => {
        navigate("/profile");
    };
    return (
        <>
        <div className="hidden md:block w-1/4 p-4">
            <div className="mb-4 border-2 border-slate-600 p-3 rounded flex gap-4">
                <FaRegStar className="mt-1 text-xl text-yellow-500 max-h-90%" />
                <div className="text-lg text-white font-semibold">Don't forget to star the <a href="https://github.com/adesai1000/Convoz" target=" _blank" className="text-[#1976D2] underline font-semibold"> Repo!</a>
                </div>
            </div>
            <div className="mb-4 border-2 border-slate-600 p-3 rounded flex gap-4">
                <BsGraphUpArrow className="mt-2 text-lg text-white max-h-90%" />
                <div className="text-lg text-white font-semibold">Top Posts</div>
            </div>
            <TopPost />
            <div className="mb-3 border-2 border-slate-600 p-3 rounded ">
                <div className="border-b-2 border-slate-600 flex justify-between">
                    <div className="text-lg  p-2 mb-1 rounded text-white font-semibold ">Find Others</div>
                    <SlReload className="mt-4 text-lg text-white max-h-90% cursor-pointer hover:text-slate-600 hover:animate-spin"  /></div>
                <div className="flex justify-between">
                    <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-3">
                        <img src="https://robohash.org/ayush" />
                        <p className="ml-4 text-white justify-center">ayush</p>
                    </div>
                    <p className="text-[#1976D2] mt-3 justify-center underline cursor-pointer" onClick={handProfile}>View</p>
                </div>
                <div className="flex justify-between">
                    <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-3">
                        <img src="https://robohash.org/emma" />
                        <p className="ml-4 text-white justify-center">emma</p>
                    </div>
                    <p className="text-[#1976D2] mt-3 justify-center underline cursor-pointer" onClick={handProfile}>View</p>
                </div>
                <div className="flex justify-between">
                    <div className="relative flex rounded-full bg-[#E8E8E8] h-8 w-8 mt-3">
                        <img src="https://robohash.org/jack" />
                        <p className="ml-4 text-white justify-center">jack</p>
                    </div>
                    <p className="text-[#1976D2] mt-3 justify-center underline cursor-pointer" onClick={handProfile}>View</p>
                </div>
            </div>

        </div >
        </>
    )
}

export default RightSide
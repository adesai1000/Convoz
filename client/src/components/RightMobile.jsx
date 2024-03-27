import React from 'react'
import { FaRegStar } from "react-icons/fa";
const RightMobile = () => {
  return (

    <div className="mb-4 border-2 border-slate-600 p-3 rounded flex gap-4 md:hidden ">
    <FaRegStar className="mt-1 text-4xl text-yellow-500 max-h-90%" />
    <div className="text-2xl text-white font-bold">Don't forget to star the <a href="https://github.com/adesai1000/Convoz" target=" _blank" className="text-[#1976D2] hover:text-[#1976d2e2] underline font-semibold"> Repo!</a>
    </div>
    </div>
  )
}

export default RightMobile
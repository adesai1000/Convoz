import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import { MdOutlineVerified } from "react-icons/md";
import { RiVipCrownLine } from "react-icons/ri";
import Confetti from "react-confetti";

const Vip = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [vip, setVip] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  function goHome() {
    navigate("/home");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!cookies.token) {
          navigate("/login");
          return;
        }
        const response = await axios.post(
          "http://localhost:5000",
          {},
          { withCredentials: true }
        );
        const { status, user } = response.data;
        if (status) {
          setUsername(user.username);
          localStorage.setItem("currentUser", user._id);
          setVip(user.isVip);
          if (user.isVip) {
            setConfettiActive(true);
            setTimeout(() => {
              setConfettiActive(false);
            }, 5000);
          }
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    fetchData();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cookies, navigate, removeCookie]);

  return (
    <>
      <Navbar username={username} />
      {vip && confettiActive && (
        <Confetti
          width={screenDimensions.width}
          height={screenDimensions.height}
        />
      )}
      {vip ? (
        <div className="mt-8 bg-black flex justify-center items-center">
          <div className="bg-black h-auto w-96 rounded-lg shadow-lg p-2 border-2 border-slate-600">
            <MdOutlineVerified className="text-5xl text-[#eab308] mt-2 mb-1 ml-4" />
            <h1 className="text-4xl font-bold font-poppins text-white ml-4">
              You are a VIP!
            </h1>
            <div className="flex flex-row items-center justify-center mt-2">
              <RiVipCrownLine className="text-[#D4AF37] text-4xl mr-4" />
              <div className="mt-2 h-20 w-52 mb-2 bg-white p-2 rounded-3xl border-4 border-[#eab308] shadow-md">
                <div className="flex flex-row items-center">
                  <img
                    className="h-12 w-12 mt-1 rounded-full overflow-hidden border-2 border-black shadow-md"
                    src={`https://robohash.org/${username}`}
                    alt={username}
                  />
                  <p className="ml-2 mr-2 text-blue-500 text-2xl font-bold">
                    {username}
                  </p>
                  <MdOutlineVerified className="text-4xl text-[#eab308] mt-2 mb-1" />
                </div>
              </div>
              <RiVipCrownLine className="text-[#D4AF37] text-4xl ml-4" />
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-[#D4AF37] hover:bg-[#1976D2] text-white py-3 px-6 rounded-xl text-2xl font-bold shadow-xl"
                onClick={goHome}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 bg-black flex justify-center items-center">
          <div className="bg-black h-auto w-96 rounded-lg shadow-lg p-2 border-2 border-slate-600">
            <MdOutlineVerified className="text-5xl text-[#eab308] mt-2 mb-1 ml-4" />
            <h1 className="text-4xl font-bold font-poppins text-white ml-4">
              Become a VIP
            </h1>
            <div className="flex flex-row items-center justify-center mt-2 w-auto">
              <RiVipCrownLine className="text-[#D4AF37] text-4xl mr-4" />
              <div className="mt-2 h-20 mb-2 bg-white p-2 rounded-3xl border-4 border-[#eab308] shadow-md w-auto">
                <div className="flex flex-row items-center">
                  <img
                    className="h-12 w-12 mt-1 rounded-full overflow-hidden border-2 border-black shadow-md"
                    src={`https://robohash.org/${username}`}
                    alt={username}
                  />
                  <p className="ml-2 mr-2 text-blue-500 text-2xl font-bold">
                    {username}
                  </p>
                  <MdOutlineVerified className="text-4xl text-[#eab308] mt-2 mb-1" />
                </div>
              </div>
              <RiVipCrownLine className="text-[#D4AF37] text-4xl ml-4" />
            </div>
            <div className="text-white flex mt-5 flex-col">
              <div className="flex flex-row mb-2 ml-3">
                <div className="mr-4">
                  <p className="text-4xl">
                    <MdOutlineVerified /> One-time Payment
                  </p>
                  <p className="text-4xl mt-5 mb-5">
                    <MdOutlineVerified /> No Adverts{" "}
                    <span className="font-bold">EVER</span>
                  </p>
                </div>
                <div>
                  <p className="text-4xl">
                    <MdOutlineVerified /> Forever verified
                  </p>
                  <p className="text-4xl mt-5">
                    <MdOutlineVerified /> Prevent Fakes
                  </p>
                </div>
              </div>
              <button className="bg-[#1976D2] hover:bg-[#D4AF37] text-white py-3 px-6  rounded-xl text-2xl font-bold shadow-xl">
                Pay $5
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Vip;
import Fetch from '../components/Fetch';
import Navbar from '../components/Navbar'
import { useUser } from '../context/UserContext';
export default function Messenger() {
    const { user } = useUser();

    return (
        <>
            <Fetch />
            <Navbar />
            <div className=" min-h-screen bg-black">
                <h1 className="text-white">
                    Messenger {user}
                </h1>
            </div>
        </>

    )
}

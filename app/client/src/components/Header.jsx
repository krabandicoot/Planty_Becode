import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from "../lotties/logo-Planty.json";
import { AiOutlineUser } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const PLAYER_URL = "/api/account/username/";

export function Header() {
    const { auth } = useAuth();
    const { player, setPlayer } = useAuth();

    useEffect(() => {
        let isMounted = true; // mounted true = the component is loaded to the site
        const controller = new AbortController();

        const getPlayer = async () => {
            try {
                const { data: response } = await axios.get(PLAYER_URL + auth);
                isMounted && setPlayer(response);
            } catch (err) {
                console.log(err);
            }
        };
        getPlayer();
        return () => {
            // we clean up function of the useEffect
            isMounted = false; // means we don't mount the component and
            controller.abort();
        };
    }, []);

    return (
        <header className="header text-xs flex justify-between mb-4 ml-8 mr-8">
            {/* Logo + redirects*/}
            <div className="header__logo flex">
                <Link to="/map">
                    <p>Plant</p>
                    <Lottie
                        className="container__title-logo absolute w-[45px] left-[35px] top-[10px]"
                        animationData={animationData}
                        loop={false}
                    />
                </Link>
            </div>

            {/* User */}
            <div className="header__user flex gap-3">
                {/* Username + redirect */}
                <div className="header__user--name">
                    <Link
                        to={`/account/${player.username}`}
                        className="items-center flex gap-1"
                    >
                        <p>
                            <AiOutlineUser />
                        </p>
                        <p>{auth || ""}</p>
                    </Link>
                </div>
                {/* Score */}
                <div className="header__user--score flex gap-1">
                    <img
                        src="/icon-leaf.png"
                        alt="Leaf score icon"
                        className="h-[15px]"
                    />
                    <p>{player.leafs}</p>
                </div>
            </div>
        </header>
    );
}

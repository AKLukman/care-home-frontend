import { Link } from "react-router";
import logo from "../../../assets/logo.png";

const Logo = () => {
    return (
        <div>
            <Link to="/" className="flex items-center gap-1">
                <img
                    src={logo}
                    alt="Delivery Logo"
                    className="h-10 w-auto"
                />
                <p className="text-2xl sm:text-3xl font-extrabold">
                    Delivery
                </p>
            </Link>
        </div>
    );
};

export default Logo;

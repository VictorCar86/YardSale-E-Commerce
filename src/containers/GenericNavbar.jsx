import { Link, useNavigate } from "react-router-dom";
import IconLittleArrow from "../assets/icons/IconLittleArrow";
import IconYardSale from "../assets/icons/IconYardSale";

const GenericNavbar = () => {
    const navigator = useNavigate();

    return (
        <nav className="flex gap-4 py-6 text-very-light-pink font-bold">
            <button className="flex items-center py-1 px-2 rounded-md border-2 border-very-light-pink" type="button" onClick={() => navigator(-1)}>
                <IconLittleArrow className="inline-block w-2.5 h-max mr-2 rotate-180"/>
                <span>Go Back</span>
            </button>
            <Link to={'/'} className="flex items-center py-1 px-2 rounded-md border-2 border-very-light-pink">
                <IconYardSale className="inline-block mr-2"/>
                <span>Go Home</span>
            </Link>
        </nav>
    )
}

export default GenericNavbar;
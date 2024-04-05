import {FaBars} from "react-icons/fa";
import Language from "../common/language";
import Theme from "../common/theme";

const Header = ({}) => {
    return (
        <header className="header">
            <div className="flex justify-between items-center h-full p-4">
                <div className="">
                    <FaBars
                        className="md:hidden"
                        role="button"
                        onClick={() => {
                            window.document.querySelector('.sidebar').classList.toggle('open')
                            window.document.querySelector('.sidebar-overlay').classList.toggle('open')
                        }}
                    />
                </div>
                <div className="flex items-center gap-2 md:hidden">
                    <Language/>
                    <Theme/>
                </div>
            </div>
        </header>
    )
}

export default Header
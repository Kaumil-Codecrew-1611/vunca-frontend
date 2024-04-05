import {MdBrightness2, MdOutlineWbSunny} from "react-icons/md";
import {useTheme} from "../../contexts/theme";

const Theme = () => {
    const {theme, setTheme} = useTheme()
    return (
        <button
            onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
            }}
            className="border rounded w-8 h-8 flex justify-center items-center">
            {theme === 'dark' ? <MdOutlineWbSunny/> : <MdBrightness2/>}
        </button>
    )
}


export default Theme
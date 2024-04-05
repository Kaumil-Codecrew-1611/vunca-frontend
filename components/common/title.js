import Language from "./language";
import Theme from "./theme";
import {useI18n} from "../../contexts/i18n";
import {FaBars} from "react-icons/fa";

const PageTitle = ({ title }) => {
    const i18n = useI18n()

    return (
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-2 mb-6">
            <div className="flex items-center gap-4">
                <FaBars
                    role="button"
                    className="text-gray-700"
                    onClick={() => {
                        window.document.querySelector('.sidebar').classList.toggle('open')
                        window.document.querySelector('.sidebar-overlay').classList.toggle('open')
                    }}
                />
                <h1 className="text-base sm:text-lg md:text-3xl text-primary uppercase font-[900]">{i18n.t(title)}</h1>
            </div>

            <div className="flex items-center gap-2">
                <Language/>
                <Theme/>
            </div>
        </div>
    )
}

export default PageTitle
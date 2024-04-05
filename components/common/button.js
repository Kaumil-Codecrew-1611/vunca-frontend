import {useI18n} from "../../contexts/i18n";

const Button = ({children, className, ...props}) => {
    const i18n = useI18n()
    return (
        <button
            {...props}
            className={'bg-primary text-sm text-white px-4 py-2.5 font-semibold rounded-md ' + (className || '')}>
            {i18n.t(children)}
        </button>
    )
}

export default Button;
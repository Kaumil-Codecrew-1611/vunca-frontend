import {Dropdown} from "antd";
import {useI18n} from "../../contexts/i18n";

const Language = () => {

    const i18n = useI18n()

    let selected = i18n.languages.find(d => d.code === i18n.locale)

    let items = i18n.languages.map((d, i) => {
        return {
            key: i,
            label: (
                <div className="flex items-center gap-2 px-2 py-1">
                    <img src={`/flags/${d.flag}.svg`} className="h-4" alt=""/>
                    <span>{d.name}</span>
                </div>
            ),
            onClick: () => {
                i18n.changeLocale(d.code)
            }
        }
    })

    return (
        <>
            <Dropdown
                placement="bottomRight"
                menu={{items}}
                trigger={['click']}>
                <a
                    role="button"
                    onClick={(e) => e.preventDefault()}
                    className="border border-gray-200 dark:border-gray-700 w-8 h-8 flex justify-center items-center rounded-md">
                    <img src={`/flags/${selected?.flag}.svg`} className="h-4" alt=""/>
                </a>
            </Dropdown>
        </>
    )
}

export default Language;
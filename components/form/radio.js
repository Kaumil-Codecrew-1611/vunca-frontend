import {Form, Radio} from 'antd';
import {useI18n} from "../../contexts/i18n";


const FormRadio = ({label, name, required, initialValue, onChange, rules = [], options}) => {
    const i18n = useI18n()

    return (
        <Form.Item
            name={name}
            label={label}
            rules={[...rules]}
            className="mb-5"
            initialValue={true}
        >
            <Radio.Group
                onChange={onChange}
                className="flex gap-4">
                <div
                    style={{height: '45.56px'}}
                    className="w-1/2 bg-gray-900 bg-opacity-5 px-2.5 border border-gray-200 dark:border-gray-700 py-2.5">
                    <Radio value={true} className="!text-base text-text dark:text-gray-100">{i18n.t("Yes")}</Radio>
                </div>
                <div
                    style={{height: '45.56px'}}
                    className="w-1/2 bg-gray-900 bg-opacity-5 px-2.5 border border-gray-200 dark:border-gray-700 py-2.5">
                    <Radio value={false} className="!text-base text-text dark:text-gray-100">{i18n.t("No")}</Radio>
                </div>
            </Radio.Group>
        </Form.Item>
    )
}


export default FormRadio;
import {Form, Select} from "antd";
import {useI18n} from "../../contexts/i18n";

const FormSelect = ({label, name, required, initialValue, onChange, rules = [], options, placeholder, clearable}) => {
    const i18n = useI18n()
    let initRules = [
        {
            required: required,
            message: `Please provide ${typeof label === 'string' && label?.toLowerCase() || 'a value'}`
        },
    ]

    return (
        <Form.Item
            name={name}
            label={i18n.t(label)}
            rules={[...initRules, ...rules]}
            className="mb-4"
            initialValue={initialValue}
        >
            <Select
                onChange={onChange}
                placeholder={i18n.t(placeholder)}
                allowClear={clearable}
                bordered={false}>
                {options?.map((option, index) => (
                    <Select.Option
                        key={index}
                        value={option?.value || option?._id}>
                        {option?.label || option?.name}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default FormSelect;
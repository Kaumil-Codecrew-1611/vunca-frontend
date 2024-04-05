import {Form, TimePicker} from 'antd';
import {useI18n} from "../../contexts/i18n";
import {useState} from "react";

const FormInput = ({label, name, required, isEmail, initialValue, rules = [], type, placeholder, textArea, step}) => {
    const i18n = useI18n()


    let initRules = [
        {
            required: required,
            message: `Please provide ${typeof label === 'string' && label?.toLowerCase() || 'a value'}`
        },
    ]
    if (isEmail) {
        initRules.push({type: 'email', message: 'Please enter a valid email address'})
    }

    const Input = ({value, onChange}) => {

        const [key, setKey] = useState(0)

        if(type === 'time') {
            return (
                <TimePicker
                    bordered={false}
                    value={value}
                    key={key}
                    onChange={onChange}
                    onOpenChange={(value) => {
                        if(!value) {
                            setKey(key => key + 1)
                        }
                    }}
                    format="HH:mm"
                    minuteStep={5}
                />
            )
        }

        if(textArea) {
            return (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={i18n.t(placeholder)}
                    className="form-input"/>
            )
        }

        return (
            <input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={i18n.t(placeholder)}
                className="form-input"/>
        )
    }


    return (
        <Form.Item
            name={name}
            label={i18n.t(label)}
            rules={[...initRules, ...rules]}
            className="mb-4"
            initialValue={initialValue || ''}
        >
            <Input/>
        </Form.Item>
    )
}

export default FormInput;


export const HiddenInput = ({name, initialValue,}) => {
    return (
        <Form.Item
            name={name}
            initialValue={initialValue || ''}
            hidden
        >
            <input className="form-input"/>
        </Form.Item>
    )
}
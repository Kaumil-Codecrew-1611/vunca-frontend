import PageTitle from "../../components/common/title";
import AdminLayout from "../../layouts/admin";
import {Form} from "antd";
import FormInput, {HiddenInput} from "../../components/form/input";
import Button from "../../components/common/button";
import {useAction} from "../../helpers/hooks";
import {patchBox, postBox} from "../../helpers/backend";
import {useRouter} from "next/router";
import {showLoader} from "../../components/common/loader";
import {FiPlus} from "react-icons/fi";

const AddBox = () => {
    const [form] = Form.useForm()

    return (
        <>
            <PageTitle title="Add Ribbon"/>
            <BoxForm form={form}/>
        </>
    )
}


AddBox.layout = AdminLayout
export default AddBox


export const BoxForm = ({form, update}) => {
    const router = useRouter()
    return (
        <div className="max-w-4xl md:px-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={async (values) => {
                    values.type = 'ribbon'
                    showLoader()
                    return useAction(values?.uid ? patchBox : postBox, values, () => {
                        router.push('/ribbon')
                    })
                }}>
                <HiddenInput name="uid"/>
                <FormInput label="Name" name="name" required/>
                <FormInput label="Price" name="price" type="number" required/>
                <Button>
                    {update ? 'Update Ribbon' : 'Add Ribbon'}
                </Button>
            </Form>
        </div>
    )
}
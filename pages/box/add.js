import PageTitle from "../../components/common/title";
import AdminLayout from "../../layouts/admin";
import {Form} from "antd";
import FormInput, {HiddenInput} from "../../components/form/input";
import Button from "../../components/common/button";
import {useAction} from "../../helpers/hooks";
import {patchBox, postBox} from "../../helpers/backend";
import {useRouter} from "next/router";
import {showLoader} from "../../components/common/loader";
import {FiPlus, FiX} from "react-icons/fi";
import FormSelect from "../../components/form/select";
import {useState} from "react";
import Swal from "sweetalert2";
import {useI18n} from "../../contexts/i18n";

const AddBox = () => {
    const [form] = Form.useForm()

    return (
        <>
            <PageTitle title="Create a Box"/>
            <BoxForm form={form}/>
        </>
    )
}


AddBox.layout = AdminLayout
export default AddBox


export const BoxForm = ({form, update}) => {
    const router = useRouter()
    const i18n = useI18n()
    const sale2 = form.getFieldValue('type') === 'sale2'
    const [_, setReload] = useState(false)

    return (
        <div className="max-w-4xl md:px-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={async (values) => {
                    showLoader()
                    return useAction(values?.uid ? patchBox : postBox, values, () => {
                        router.push('/box')
                    })
                }}>
                <HiddenInput name="uid"/>
                <FormSelect
                    name="type"
                    label="Order"
                    options={[
                        {label: 'Funeral floristry', value: 'sale1'},
                        {label: 'Stonemason', value: 'sale2'},
                    ]}
                    initialValue="sale1"
                    onChange={() => setReload(e => !e)}
                    required/>
                <FormInput label="Name" name="name" required/>
                {sale2 && (
                    <FormInput label="Price" name="price" type="number" required/>
                )}
                <Form.List name="sizes" initialValue={[{}]}>
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map((field, index) => (
                                <div className="grid grid-cols-2 gap-4 relative" key={index}>
                                    <HiddenInput name={[field.name, '_id']}/>
                                    <FormInput label="Size" name={[field.name, 'size']} required/>
                                    <FormInput label="Price" name={[field.name, 'price']} type="number" required/>
                                    <div className="absolute top-0 right-0 z-10">
                                        <FiX
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: i18n.t('Are you sure?'),
                                                    text: i18n.t("You won't be able to revert this!"),
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: i18n.t('Yes, Remove it!'),
                                                    cancelButtonText: i18n.t('Cancel')
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        remove(field.name)
                                                    }
                                                })
                                            }}
                                            role="button"
                                            size={24}/>
                                    </div>
                                </div>
                            ))}

                            <div className="flex gap-4 items-center mt-2">
                                <FiPlus
                                    className="text-primary"
                                    onClick={() => add()}
                                    role="button"
                                    size={24}/>
                                <Button>
                                    {update ? 'Update the Box' : 'Create a Box'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form.List>
            </Form>
        </div>
    )
}
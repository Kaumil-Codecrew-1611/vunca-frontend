import PageTitle from "../../components/common/title";
import AdminLayout from "../../layouts/admin";
import {Form, Modal} from "antd";
import FormInput, {HiddenInput} from "../../components/form/input";
import FormPassword from "../../components/form/password";
import FormSelect from "../../components/form/select";
import Button from "../../components/common/button";
import {useAction} from "../../helpers/hooks";
import {patchUser, postPasswordToken, postUser} from "../../helpers/backend";
import {useRouter} from "next/router";
import {useI18n} from "../../contexts/i18n";
import Swal from "sweetalert2";
import {useState} from "react";

const AddUser = () => {
    return (
        <>
            <PageTitle title="Add a user"/>
            <UserForm/>
        </>
    )
}


AddUser.layout = AdminLayout
export default AddUser


export const UserForm = ({form, update}) => {
    const router = useRouter()
    const i18n = useI18n()

    const [token, setToken] = useState(null)


    return (
        <div className="md:px-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    values.password = values.password || undefined
                    return useAction(values?.uid ? patchUser : postUser, values, () => {
                        router.push('/users')
                    })
                }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <HiddenInput name="uid"/>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="First Name" name="first_name" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Last Name" name="last_name" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Email" name="email" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Username" name="username" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Phone" name="phone" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormPassword label="Password" name="password" required={!update}/>
                    </div>
                    <div className="col-span-2">
                        <FormInput label="Address" name="address"/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Zip" name="zip"/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="City" name="city"/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Country" name="country"/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormSelect
                            label="Role"
                            name="role"
                            initialValue={'employee'}
                            options={[
                                {label: i18n.t('Admin'), value: 'admin'},
                                {label: i18n.t('Employee'), value: 'employee'},
                            ]}
                            required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Commission Funeral floristry" name="commission1" type="number" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Commission Stonemason" name="commission2" type="number" required/>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button className="mt-2">
                        {update ? 'Update user' : 'Add a new user'}
                    </Button>
                    {update && (
                        <Button
                            className="mt-2"
                            type="button"
                            onClick={async () => {
                                const {isConfirmed} = await Swal.fire({
                                    title: i18n.t('Reset Password'),
                                    text: i18n.t("This will generate a reset password link"),
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: i18n.t('Reset Password'),
                                    cancelButtonText: i18n.t('Cancel'),
                                })
                                if (isConfirmed) {
                                    let _id = form.getFieldValue('_id')
                                    return useAction(postPasswordToken, {_id}, (d) => {
                                        setToken(d.token)
                                    })
                                }
                            }}
                        >
                            {i18n.t('Reset Password')}
                        </Button>
                    )}

                </div>
            </Form>

            <Modal open={!!token} onCancel={() => setToken(null)} footer={null}>
               <div className="flex flex-col gap-4">
                   <p className="text-lg font-semibold">{i18n.t('Reset password link')}:</p>
                   <p className="bg-gray-100 px-4 py-2 rounded">{window.location.host}/reset-password?token={token}</p>
                   <Button
                       onClick={() => {
                           navigator.clipboard.writeText(`${window.location.host}/reset-password?token=${token}`)
                           setToken(null)
                       }}
                   >Copy</Button>
               </div>
            </Modal>

        </div>
    )

}
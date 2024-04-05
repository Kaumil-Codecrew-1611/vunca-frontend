import AdminLayout from "../layouts/admin";
import PageTitle from "../components/common/title";
import {useUser} from "../contexts/user";
import {Form} from "antd";
import FormPassword from "../components/form/password";
import Button from "../components/common/button";
import {useAction} from "../helpers/hooks";
import {patchPassword, patchUserProfile} from "../helpers/backend";
import {useI18n} from "../contexts/i18n";
import {showLoader} from "../components/common/loader";
import {uploadImage} from "../helpers/image";

const Profile = () => {
    const user = useUser()
    const [form] = Form.useForm()
    const i18n = useI18n()

    return (
        <>
            <PageTitle title="Profile Settings"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-850 p-4">
                    <div className="flex justify-between flex-wrap">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block font-semibold mb-1">{i18n.t("Your Name")}</label>
                                <p>{user?.name}</p>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">{i18n.t("Username")}</label>
                                <p>{user?.username}</p>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">{i18n.t("E-Mail")}</label>
                                <p>{user?.email}</p>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">{i18n.t("Phone Number")}</label>
                                <p>{user?.phone}</p>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">{i18n.t("Address")}</label>
                                <p>{user?.address}</p>
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">{i18n.t("ZIP")}</label>
                                <p>{user?.zip}</p>
                            </div>
                        </div>
                        <div>
                            <img
                                src={user?.logo || "/logo.svg"}
                                onClick={() => {
                                    let image = document.createElement('input')
                                    image.type = 'file'
                                    image.accept = 'image/*'
                                    image.onchange = async (e) => {
                                        let file = e.target.files[0]
                                        showLoader()
                                        let logo = await uploadImage(file)
                                        return useAction(patchUserProfile, {logo}, () => {
                                           user.getUser()
                                        })
                                    }
                                    image.click()

                                }}
                                role="button"
                                className="w-32 h-32 rounded-full bg-gray-100"
                                alt="Logo"/>
                        </div>
                    </div>


                </div>
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-50 dark:bg-gray-850 px-8 py-4">
                        <Form
                            form={form}
                            layout="vertical" onFinish={values => {
                            return useAction(patchPassword, values, () => {
                                form.resetFields()
                            })
                        }}>
                            <FormPassword label="Old Password" name="old_password" required/>
                            <FormPassword label="New Password" name="password" required/>
                            <FormPassword label="Confirm Password" name="confirm_password" confirm required/>
                            <Button type="submit">Update Password</Button>
                        </Form>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-850 p-4">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block font-semibold">{i18n.t("Your Role")}</label>
                                <p className="capitalize">{i18n.t(user?.role)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-850 p-4">
                    <p className="font-semibold">
                        {i18n.t("Commission Funeral floristry")}
                        &nbsp;{user?.commission1}%: {(user?.sales?.find(d => d._id === 'sale1')?.commission || 0)?.toFixed(2)} €
                    </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-850 p-4">
                    <p className="font-semibold">
                        {i18n.t("Commission Funeral floristry")}
                        &nbsp;{user?.commission2}%: {(user?.sales?.find(d => d._id === 'sale2')?.commission || 0)?.toFixed(2)} €
                    </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-850 col-span-2 p-4">
                   Version 1.1
                </div>
            </div>

        </>
    )
}


Profile.layout = AdminLayout
export default Profile
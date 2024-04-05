import PageTitle from "../../components/common/title";
import AdminLayout from "../../layouts/admin";
import {UserForm} from "./add";
import {useRouter} from "next/router";
import {Form} from "antd";
import {useEffect} from "react";
import {fetchUser} from "../../helpers/backend";

const UpdateUser = () => {
    const [form] = Form.useForm()
    const {query} = useRouter()

    useEffect(() => {
        if (query?.uid) {
            fetchUser({uid: query.uid}).then(({error, data}) => {
                if (error) return
                form.setFieldsValue(data)
            })
        }
    }, [query])


    return (
        <>
            <PageTitle title="Update user"/>
            <UserForm form={form} update/>
        </>
    )
}


UpdateUser.layout = AdminLayout
export default UpdateUser
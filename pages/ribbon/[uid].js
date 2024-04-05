import PageTitle from "../../components/common/title";
import AdminLayout from "../../layouts/admin";
import {BoxForm} from "./add";
import {useRouter} from "next/router";
import {Form} from "antd";
import {useEffect} from "react";
import {fetchBox, fetchSale} from "../../helpers/backend";
import {useI18n} from "../../contexts/i18n";

const UpdateBox = () => {
    const i18n = useI18n()
    const [form] = Form.useForm()
    const {query} = useRouter()

    useEffect(() => {
        if (query?.uid) {
            fetchBox({uid: query.uid}).then(({error, data}) => {
                if (error) return
                form.setFieldsValue(data)
            })
        }
    }, [query])


    return (
        <>
            <PageTitle title="Update Ribbon"/>
            <BoxForm form={form} update/>
        </>
    )
}


UpdateBox.layout = AdminLayout
export default UpdateBox
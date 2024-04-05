import PageTitle from "../../components/common/title";
import AdminLayout from "../../layouts/admin";
import {Form, Radio} from "antd";
import FormInput, {HiddenInput} from "../../components/form/input";
import Button from "../../components/common/button";
import {useAction, useFetch} from "../../helpers/hooks";
import {fetchSaleElements, patchSale, postSale} from "../../helpers/backend";
import {useRouter} from "next/router";
import moment from "moment";
import {useI18n} from "../../contexts/i18n";
import FormImage from "../../components/form/file";
import {getUploadImageUrl} from "../../helpers/image";
import {showLoader} from "../../components/common/loader";
import FormSelect from "../../components/form/select";
import {useState} from "react";
import {useUser} from "../../contexts/user";

const AddSale = () => {
    const [form] = Form.useForm()

    return (
        <>
            <PageTitle title="Create Order"/>
            <SaleForm form={form}/>
        </>
    )
}


AddSale.layout = AdminLayout
export default AddSale


export const SaleForm = ({form, update}) => {
    const i18n = useI18n()
    const router = useRouter()

    const user = useUser()

    const [elements] = useFetch(fetchSaleElements, {type: 'sale2'})
    let sizes = elements?.boxes?.reduce((acc, cur) => {
        return [...acc, ...(cur?.sizes || [])]
    }, [])

    return (
        <div className="max-w-7xl md:px-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={async (values) => {
                    showLoader()
                    values.type = 'sale2'
                    values.date = moment(values.date, "YYYY-MM-DD").toISOString()
                    values.file = await getUploadImageUrl(values.file)
                    values.total = (!!values.work1 ? 1 : 0) + (!!values.work2 ? 1 : 0)
                    return useAction(values?.uid ? patchSale : postSale, values, () => {
                        router.push('/sales2')
                    })
                }}>
                <HiddenInput name="uid"/>
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="col-span-2 md:col-span-1">
                        <FormInput
                            label="Arranger"
                            name="arranger"
                            initialValue={`${user?.name}`}
                            required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput
                            label="Date"
                            name="date"
                            type="date"
                            initialValue={moment().format('YYYY-MM-DD')}
                            required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Kommission" name="for" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Place" name="place" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Grave Address" name="address" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Grave Name" name="name" required/>
                    </div>
                    <div className="col-span-2">
                        <FormInput label="Dimensions" name="dimensions" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormSelect
                            label="Arbeiten 1"
                            name="box"
                            options={elements?.boxes?.map((d, index) => (
                                {
                                    label: (
                                        <div className="flex justify-between">
                                            <p>{d?.name}</p>
                                            <p>{d?.price} €</p>
                                        </div>
                                    ), value: d._id
                                }
                            ))}
                            required
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormSelect
                            label="Arbeiten 2"
                            name="size"
                            options={sizes?.map((d, index) => (
                                {
                                    label: (
                                        <div className="flex justify-between">
                                            <p>{d?.size}</p>
                                            <p>{d?.price} €</p>
                                        </div>
                                    ), value: d._id
                                }
                            ))}
                            clearable
                        />
                    </div>
                </div>
                <FormInput label="Information" name="information" required/>
                <FormImage label="Add a attachment" name="file"/>
                <Button>
                    {i18n.t(update ? 'Update Order' : 'Create Order')}
                </Button>
            </Form>
        </div>
    )
}
import PageTitle from "../../components/common/title";
import AdminLayout from "../../layouts/admin";
import {useRouter} from "next/router";
import {Form} from "antd";
import {useEffect} from "react";
import {fetchSale, fetchSaleElements} from "../../helpers/backend";
import {useI18n} from "../../contexts/i18n";
import moment from "moment";
import {useUser} from "../../contexts/user";
import {useFetch} from "../../helpers/hooks";
import FormInput, {HiddenInput} from "../../components/form/input";
import FormSelect from "../../components/form/select";
import FormImage from "../../components/form/file";

const UpdateSale = () => {
    const i18n = useI18n()
    const [form] = Form.useForm()
    const {query} = useRouter()

    useEffect(() => {
        if (query?.uid) {
            fetchSale({uid: query.uid}).then(({error, data}) => {
                if (error) return
                form.setFieldsValue({
                    ...data,
                    date: moment(data.date).format('YYYY-MM-DD'),
                    box: data.boxes[0]?.box,
                    size: data.boxes[0]?.size,
                    file: data.file ? [{
                        uid: `-1`,
                        name: data.file.substring(data.file.lastIndexOf('/') + 1),
                        status: 'done',
                        url: data.file,
                    }] : []
                })
            })
        }
    }, [query])


    return (
        <>
            <PageTitle title="Update Order"/>
            <SaleForm form={form} update/>
        </>
    )
}


UpdateSale.layout = AdminLayout
export default UpdateSale


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
                layout="vertical">
                <HiddenInput name="uid"/>
                <div className="grid grid-cols-2 gap-x-4 pointer-events-none">
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
                            label="Box"
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
                            label="Size of Box"
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
            </Form>
        </div>
    )
}
import PageTitle from "../../components/common/title";
import AdminLayout from "../../layouts/admin";
import {useRouter} from "next/router";
import {Form} from "antd";
import {useEffect, useState} from "react";
import {fetchSale, fetchSaleElements, patchSale, postSale} from "../../helpers/backend";
import moment from "moment";
import {useI18n} from "../../contexts/i18n";
import {useAction, useFetch} from "../../helpers/hooks";
import FormInput, {HiddenInput} from "../../components/form/input";
import {FiPlus, FiX} from "react-icons/fi";
import Button from "../../components/common/button";
import FormSelect from "../../components/form/select";
import Swal from "sweetalert2";
import FormRadio from "../../components/form/radio";

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
                    time: moment(data.date)
                })
            })
        }
    }, [query])


    return (
        <>
            <PageTitle title="Update the sale"/>
            <SaleForm form={form} update/>
        </>
    )
}


UpdateSale.layout = AdminLayout
export default UpdateSale


export const SaleForm = ({form, update}) => {
    const [elements] = useFetch(fetchSaleElements, {type: 'sale1'})

    return (
        <div className="md:px-4">
            <Form
                form={form}
                layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-4 pointer-events-none">
                    <HiddenInput name="uid"/>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput
                            label="Date"
                            name="date"
                            type="date"
                            initialValue={moment().format('YYYY-MM-DD')}
                            required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput
                            label="Time"
                            name="time"
                            type="time"
                            format="HH:mm"
                            initialValue={moment()}
                            required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Place" name="place" required/>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <FormInput label="Room Number" name="room" required/>
                    </div>
                    <div className="col-span-2">
                        <FormInput
                            label="For Who?"
                            name="for"
                            placeholder="Name of the receiver"
                            required/>
                    </div>
                    <div className="col-span-2">

                        <Form.List name="boxes" initialValue={[{}]}>
                            {(fields, {add, remove}) => (
                                <>
                                    {fields.map((field, index) => (
                                        <BoxSelect
                                            name={field.name}
                                            key={index}
                                            form={form}
                                            remove={() => remove(field.name)}
                                            elements={elements}/>
                                    ))}
                                </>
                            )}
                        </Form.List>
                    </div>
                </div>
            </Form>
        </div>
    )

}


const BoxSelect = ({name, form, elements, remove}) => {
    const i18n = useI18n()
    const [ribbon, setRibbon] = useState(true)
    const boxes = form.getFieldValue('boxes')
    const box = boxes[name]?.box
    let sizes = elements?.boxes?.find(d => d._id === box)?.sizes || []

    const [_, setKey] = useState(0)

    useEffect(() => {
        setRibbon(boxes[name]?.ribbon)
    }, [box])


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 relative">
            <div className="col-span-2 md:col-span-1">
                <FormSelect
                    label={`${i18n.t("Type of Box")} ${name + 1}`}
                    name={[name, 'box']}
                    placeholder="Select the type"
                    options={elements?.boxes}
                    initialValue={null}
                    onChange={() => {
                        let boxes = form.getFieldValue('boxes')
                        boxes[name].size = null
                        form.setFieldsValue({boxes})
                        setKey(key => key + 1)
                    }}
                    required/>
            </div>
            <div className="col-span-2 md:col-span-1 relative">
                <FormSelect
                    label={`${i18n.t("Size of Box")} ${name + 1}`}
                    placeholder="Select the size"
                    name={[name, 'size']}
                    initialValue={null}
                    options={sizes?.map(d => ({
                        label: (
                            <div className="flex justify-between">
                                <p>{d?.size}</p>
                                <p>{d?.price} €</p>
                            </div>
                        ), value: d._id
                    })) || []}
                    required/>
            </div>

            <div className="col-span-2">
                <FormRadio
                    name={[name, 'ribbon']}
                    onChange={e => setRibbon(e.target.value)}
                    label={`${i18n.t("Do you want ribbon for Box")} ${name + 1}`}/>
                {ribbon && (
                    <>
                        <FormSelect
                            label={"Ribbon Type"}
                            name={[name, 'ribbon_type']}
                            placeholder={"Select the type"}
                            options={elements?.ribbons?.map(d => ({
                                label: (
                                    <div className="flex justify-between">
                                        <p>{d?.name}</p>
                                        <p>{d?.price} €</p>
                                    </div>
                                ), value: d._id
                            })) || []}
                            required
                        />
                        <FormInput name={[name, 'ribbon_text']} label="Ribbon Text 1" required/>
                        <FormInput name={[name, 'ribbon_text_2']} label="Ribbon Text 2"/>
                    </>
                )}
            </div>

        </div>
    )
}
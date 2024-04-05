import PageTitle from "../../components/common/title";
import AdminLayout from "../../layouts/admin";
import {Form} from "antd";
import FormInput, {HiddenInput} from "../../components/form/input";
import FormPassword from "../../components/form/password";
import FormSelect from "../../components/form/select";
import Button from "../../components/common/button";
import {useAction, useFetch} from "../../helpers/hooks";
import {fetchSaleElements, patchSale, patchUser, postSale, postUser} from "../../helpers/backend";
import {useRouter} from "next/router";
import moment from "moment";
import {useEffect, useState} from "react";
import FormRadio from "../../components/form/radio";
import {FiPlus, FiX} from "react-icons/fi";
import {useI18n} from "../../contexts/i18n";
import Swal from "sweetalert2";

const AddSale = () => {
    const [form] = Form.useForm()


    useEffect(() => {
        function makeNew(value1, value2) {
            let option = document.createElement('option');
            option.text = value2;
            option.value = value1;
            return option;
        }
        let minutesSelectionBox = document.getElementById('minutebox');
        for(let j = 0; j < 60; j += 5) {
            minutesSelectionBox?.add(makeNew(j, j));
        }

    }, [])

    return (
        <>
            <PageTitle title="Create a sale"/>
            <SaleForm form={form}/>
        </>
    )
}


AddSale.layout = AdminLayout
export default AddSale


export const SaleForm = ({form, update}) => {
    const router = useRouter()
    const i18n = useI18n()
    const [elements] = useFetch(fetchSaleElements, {type: 'sale1'})

    return (
        <div className="md:px-4">
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    values.type = 'sale1'
                    values.date = moment(values.date + " " + values.time.format('HH:mm'), "YYYY-MM-DD HH:mm").toISOString()
                    return useAction(values?.uid ? patchSale : postSale, values, () => {
                        router.push('/sales')
                    })
                }}>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-4">
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
                            placeholder=""
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

                                    <div className="flex gap-4 items-center mt-2">
                                        <FiPlus
                                            className="text-primary"
                                            onClick={() => add()}
                                            role="button"
                                            size={24}/>
                                        <Button>
                                            {i18n.t(update ? 'Update the sale' : 'Create a sale')}
                                        </Button>
                                    </div>
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
                                    remove()
                                }
                            })
                        }}
                        role="button"
                        size={24}/>
                </div>
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
import {Form, Upload} from "antd";
import {FiTrash, FiUpload} from "react-icons/fi";
import Image from "next/image";
import {useI18n} from "../../contexts/i18n";

const FormImage = ({name, label, required, multi}) => {
    const i18n = useI18n()
    const Input = ({value, onChange}) => {
        return (
            <>
                <Upload.Dragger
                    accept="image/*"
                    fileList={value}
                    beforeUpload={() => false}
                    itemRender={(originNode, file, _, {remove}) => {
                        let url = +file.uid < 0 ? file.url : URL.createObjectURL(file?.originFileObj)
                        return (
                            <div className="flex justify-between items-center gap-2 pt-2">
                                <div className="flex items-center gap-2" style={{width: 'calc(100% - 30px)'}}>
                                    <div
                                        className="h-12 aspect-square rounded-sm relative">
                                        <Image
                                            src={url}
                                            fill
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                            placeholder="blur"
                                            blurDataURL="/images/blur.png"
                                            preview="false"
                                            alt=""/>
                                    </div>
                                    <p className="text-sm truncate">{file?.name}</p>
                                </div>
                                <div>
                                    <FiTrash
                                        role="button"
                                        className="text-error-700"
                                        onClick={remove}/>
                                </div>
                            </div>
                        )
                    }}
                    onChange={e => {
                        onChange(multi ? e.fileList : e.fileList.length ? [e.fileList[e?.fileList?.length - 1]] : [])
                    }}>
                    <div className="w-full z-0 h-16 flex justify-center gap-2.5 items-center">
                        <FiUpload/>
                        <p className="text-sm font-Inter">
                            {i18n.t("Upload files")}
                        </p>
                    </div>
                </Upload.Dragger>
            </>
        )
    }


    return (
        <>
            <Form.Item
                name={name}
                label={i18n.t(label)}
                className="image-input"
                initialValue={[]}
                rules={[
                    {required: required, message: 'Bitte laden Sie ein Bild hoch'}
                ]}>
                <Input/>
            </Form.Item>
        </>
    )
}

export default FormImage;
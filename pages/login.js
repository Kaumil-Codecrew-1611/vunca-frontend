import {Form} from "antd";
import FormInput from "../components/form/input";
import FormPassword from "../components/form/password";
import Button from "../components/common/button";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {hideLoader, showLoader} from "../components/common/loader";
import {postLogin} from "../helpers/backend";
import Language from "../components/common/language";
import Theme from "../components/common/theme";
import {useI18n} from "../contexts/i18n";

const Login = () => {
    const i18n = useI18n()
    const router = useRouter()
    const [error, setError] = useState(null)

    useEffect(() => {
        hideLoader()
    }, [])
    const handleSubmit = async (values) => {
        setError(null)
        showLoader()
        const {error, msg, data} = await postLogin(values)
        hideLoader()
        if(error) {
            setError(msg)
        } else {
            localStorage.setItem('token', data.token)
            return router.push('/')
        }
    }

    return (
        <div className="relative">
            <div className="absolute left-12 top-4">
                <img src="/logo.svg" className="h-20" alt=""/>
            </div>
            <div className="items-center gap-2 flex absolute right-4 top-4">
                <Language/>
                <Theme/>
            </div>
            <div className="flex w-full h-screen pt-28 sm:py-[8%] justify-center">
                <div className="max-w-lg w-full p-4 flex flex-col gap-10 md:gap-16">
                    <div className="flex flex-col gap-2">
                        <h3 className="uppercase text-center text-32 font-bold text-primary">{i18n.t("Log In")}</h3>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </div>
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <FormInput label="Email" name="email" required isEmail/>
                        <FormPassword label="Password" name="password"  required/>
                        <Button className="mt-12 w-full uppercase">Login</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;
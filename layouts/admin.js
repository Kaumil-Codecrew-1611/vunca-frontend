import Sidebar from "../components/layout/sidebar";
import MainLoader, {hideLoader} from "../components/common/loader";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {fetchUserProfile} from "../helpers/backend";
import UserContext from "../contexts/user";
import Header from "../components/layout/header";
import moment from "moment/moment";

const AdminLayout = ({children}) => {
    const router = useRouter()
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        fetchUserProfile({
            start: moment().startOf('month').add('months', -1).toISOString(),
            end: moment().endOf('month').add('months', -1).toISOString(),
        }).then(({error, data}) => {
            if (error === false) {
                hideLoader()
                setUser(data)
            } else {
                router.push('/login')
            }
        })
    }


    if (!user) {
        return (
            <>
                <MainLoader/>
            </>
        )
    }

    return (
        <UserContext.Provider value={{...(user || {}), getUser}}>
            <div className="min-h-screen">
                {!!user && (
                    <>
                        <Sidebar/>
                        <div className="content">
                            <div className="px-8 py-4">
                                {children}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </UserContext.Provider>
    )
}

export default AdminLayout;
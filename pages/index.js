import {useRouter} from "next/router";
import {useFetch} from "../helpers/hooks";
import {fetchSales} from "../helpers/backend";
import moment from "moment/moment";
import PageTitle from "../components/common/title";
import Table from "../components/common/table";
import AdminLayout from "../layouts/admin";
import {useI18n} from "../contexts/i18n";
import {useUser} from "../contexts/user";
import {FaPrint} from "react-icons/fa";
import Link from "next/link";

export const Sales = () => {
    const {push} = useRouter()
    const i18n = useI18n()
    const user = useUser()
    const [data, getData, {loading}] = useFetch(fetchSales)

    const columns = [
        {text: 'Sale ID', dataField: 'uid'},
        {text: 'Order', dataField: 'type', formatter: d => i18n.t(d === 'sale1' ? 'Funeral floristry' : 'Stonemason')},
        {text: 'Seller', dataField: "user", formatter: d => `${d?.first_name} ${d?.last_name}`},
        {text: 'Date', dataField: 'date', formatter: d => moment(d).format('DD/MM/YYYY')},
        {
            text: 'Time',
            dataField: 'date',
            formatter: (d, dd) => dd?.type === 'sale1' ? moment(d).format('hh:mm A') : '-'
        },
        {text: 'Total Price', dataField: 'total', formatter: d => `${d} €`, className: 'text-right'},
    ]


    return (
        <>
            <PageTitle title="Orders"/>
            <Table
                columns={columns}
                data={data}
                onReload={getData}
                loading={loading}
                actions={({uid, type}) => {
                    return (
                       <>
                           {user?.role === 'admin' && (
                               <Link
                                   href={`/${type === 'sale2' ? 'sales2' : 'sales'}/${uid}`}
                                   className="border border-primary text-primary p-2 rounded hover:bg-primary hover:text-white focus:shadow-none"
                                   title="View">
                                   <FaPrint size={12}/>
                               </Link>
                           )}
                       </>
                    )
                }}
                indexed
                pagination
            />
        </>
    )
}

Sales.layout = AdminLayout
export default Sales
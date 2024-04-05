import AdminLayout from "../../layouts/admin";
import PageTitle from "../../components/common/title";
import {useFetch} from "../../helpers/hooks";
import {fetchSales} from "../../helpers/backend";
import Table from "../../components/common/table";
import moment from "moment";
import {useUser} from "../../contexts/user";
import Link from "next/link";
import {FaPrint} from "react-icons/fa";

export const Sales = () => {
    const user = useUser()
    const [data, getData, {loading}] = useFetch(fetchSales, {type: 'sale1'})

    const columns = [
        {text: 'Sale ID', dataField: 'uid'},
        {text: 'Seller', dataField: "user", formatter: d => `${d?.first_name} ${d?.last_name}`},
        {text: 'Date', dataField: 'date', formatter: d => moment(d).format('DD/MM/YYYY')},
        {text: 'Time', dataField: 'date', formatter: d => moment(d).format('hh:mm A')},
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
                actions={({uid}) => {
                    return (
                        <>
                            {user?.role === 'admin' && (
                                <Link
                                    href={`/sales/${uid}`}
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
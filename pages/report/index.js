import AdminLayout from "../../layouts/admin";
import PageTitle from "../../components/common/title";
import {useEffect, useState} from "react";
import moment from "moment";
import {FiPrinter} from "react-icons/fi";
import Table from "../../components/common/table";
import {fetchSalesReport} from "../../helpers/backend";

const Report = () => {

    const [month, setMonth] = useState(moment().format('YYYY-MM'))

    const columns = [
        {text: 'Name', dataField: "name"},
        {text: 'Email', dataField: 'email'},
        {text: 'Funeral floristry', dataField: 'total1', className: 'text-right', formatter: d => `${d?.toFixed(2)} €`},
        {text: 'Stonemason', dataField: 'total2', className: 'text-right', formatter: d => `${d?.toFixed(2)} €`},
        {text: 'Commission Funeral floristry', dataField: 'commission1', className: 'text-right', formatter: d => `${d?.toFixed(2)} €`},
        {text: 'Commission Stonemason', dataField: 'commission2', className: 'text-right', formatter: d => `${d?.toFixed(2)} €`},
    ]


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetchSalesReport({
            start: moment(month, 'YYYY-MM').startOf('month').toISOString(),
            end: moment(month, 'YYYY-MM').endOf('month').toISOString()
        }).then(({error, data}) => {
            if (error === false) {
                setData(data)
                setLoading(false)
            }
        })
    }, [month])


    return (
        <>
            <PageTitle title="Report"/>
            <div className="flex justify-between">
                <div className="w-60">
                    <input
                        value={month}
                        onChange={(e) => {
                            setMonth(e.target.value)
                        }}
                        className="form-input" type="month"/>
                </div>

                <FiPrinter
                    role="button"
                    onClick={() => window.print()}
                    size={24}
                    className="text-text"/>
            </div>
            <div className="print-content">
                <p className="text-text mb-2 hidden print:block">Month: {moment(month, 'YYYY-MM').format('MMM, YYYY')}</p>
                <Table
                    columns={columns}
                    data={data}
                    extras={(
                        <tr>
                            <td colSpan={3} className="text-right p-3.5">
                                Total
                            </td>
                            <td className="text-right p-3.5">
                                {data?.reduce((a, b) => a + b.total1, 0).toFixed(2)} €
                            </td>
                            <td className="text-right p-3.5">
                                {data?.reduce((a, b) => a + b.total2, 0).toFixed(2)} €
                            </td>
                            <td className="text-right p-3.5">
                                {data?.reduce((a, b) => a + b.commission1, 0).toFixed(2)} €
                            </td>
                            <td className="text-right p-3.5">
                                {data?.reduce((a, b) => a + b.commission2, 0).toFixed(2)} €
                            </td>
                        </tr>
                    )}
                    indexed
                    noActions
                />
            </div>


        </>
    )
}

Report.layout = AdminLayout
export default Report;
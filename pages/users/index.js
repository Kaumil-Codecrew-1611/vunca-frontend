import AdminLayout from "../../layouts/admin";
import PageTitle from "../../components/common/title";
import {useFetch} from "../../helpers/hooks";
import {fetchUsers} from "../../helpers/backend";
import Table from "../../components/common/table";
import {useRouter} from "next/router";
import {useI18n} from "../../contexts/i18n";
import Button from "../../components/common/button";
import moment from "moment";

export const Users = () => {
    const i18n = useI18n()
    const {push} = useRouter()
    const [data, getData, {loading}] = useFetch(fetchUsers, {
        start: moment().startOf('month').toISOString(),
        end: moment().endOf('month').toISOString(),
    })

    const columns = [
        {text: 'Name', dataField: "name"},
        {text: 'Email', dataField: 'email'},
        {text: 'Role', dataField: 'role', formatter: d => i18n.t(d)},
        {
            text: 'Commission Funeral floristry',
            dataField: 'commission1',
            formatter: (d, dd) => `${(dd?.sales?.find(d => d._id === 'sale1')?.commission || 0).toFixed(2)} € (${d || 0}%)`
        },
        {
            text: 'Commission Stonemason',
            dataField: 'commission2',
            formatter: (d, dd) => `${(dd?.sales?.find(d => d._id === 'sale2')?.commission || 0).toFixed(2)} € (${d || 0}%)`
        },
        {
            text: 'Commission Collected',
            dataField: 'sales',
            formatter: d => `${d?.reduce((acc, d) => acc + (d.commission || 0), 0)?.toFixed(2)} €`,
            className: 'text-right'
        }
    ]


    return (
        <>
            <PageTitle title="See All Users"/>
            <div className="flex justify-end">
                <Button
                    onClick={() => push('/users/add')}>
                    {i18n.t("Add a User")}
                </Button>
            </div>
            <Table
                columns={columns}
                data={data}
                onReload={getData}
                loading={loading}
                onView={({uid}) => push('/users/' + uid)}
                indexed
                pagination

            />
        </>
    )
}

Users.layout = AdminLayout
export default Users
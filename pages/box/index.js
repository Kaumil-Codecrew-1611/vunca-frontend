import AdminLayout from "../../layouts/admin";
import PageTitle from "../../components/common/title";
import {useFetch} from "../../helpers/hooks";
import {fetchBoxes, fetchSales} from "../../helpers/backend";
import Table from "../../components/common/table";
import {useRouter} from "next/router";
import moment from "moment";
import {useI18n} from "../../contexts/i18n";
import Button from "../../components/common/button";

export const Boxes = () => {
    const {push} = useRouter()
    const i18n = useI18n()
    const [data, getData, {loading}] = useFetch(fetchBoxes)

    const columns = [
        {text: 'Order', dataField: 'type', formatter: d => i18n.t(d === 'sale1' ? 'Funeral floristry' : 'Stonemason')},
        {text: 'Name', dataField: 'name'},
        {text: 'Sizes', dataField: "sizes", formatter: d => d?.map(({size}) => size).join(', ')},
    ]


    return (
        <>
            <PageTitle title="Boxes"/>
            <div className="flex justify-end">
                <Button
                    onClick={() => push('/box/add')}>
                    {i18n.t("Add a Box")}
                </Button>
            </div>

            <Table
                columns={columns}
                data={data}
                onReload={getData}
                loading={loading}
                onView={({uid}) => push('/box/' + uid)}
                indexed
                pagination
            />
        </>
    )
}

Boxes.layout = AdminLayout
export default Boxes
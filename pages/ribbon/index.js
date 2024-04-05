import AdminLayout from "../../layouts/admin";
import PageTitle from "../../components/common/title";
import {useFetch} from "../../helpers/hooks";
import {fetchBoxes, fetchSales} from "../../helpers/backend";
import Table from "../../components/common/table";
import {useRouter} from "next/router";
import moment from "moment";
import Button from "../../components/common/button";
import {useI18n} from "../../contexts/i18n";

export const Boxes = () => {
    const {push} = useRouter()
    const i18n = useI18n()
    const [data, getData, {loading}] = useFetch(fetchBoxes, {type: 'ribbon'})

    const columns = [
        {text: 'Name', dataField: 'name'},
        {text: 'Price', dataField: "price", formatter: d => `${d} €`},
    ]


    return (
        <>
            <PageTitle title="Ribbons"/>
            <div className="flex justify-end">
                <Button
                    onClick={() => push('/ribbon/add')}>
                    {i18n.t("Add Ribbon")}
                </Button>
            </div>
            <Table
                columns={columns}
                data={data}
                onReload={getData}
                loading={loading}
                onView={({uid}) => push('/ribbon/' + uid)}
                indexed
                pagination
            />
        </>
    )
}

Boxes.layout = AdminLayout
export default Boxes
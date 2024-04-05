import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import {useActionConfirm} from "../../helpers/hooks";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {Loader} from "./loader";
import {useI18n} from "../../contexts/i18n";

const Table = ({
                   columns,
                   data,
                   indexed,
                   loading = false,
                   noActions,
                   actions,
                   onView,
                   onEdit,
                   onDelete,
                   onReload,
                   pagination = false,
                   extras,
               }) => {

    const i18n = useI18n()

    let cols = noActions ? columns : [...columns, {
        text: 'Details',
        dataField: 'no_actions',
        className: 'w-44 text-right',
        formatter: (noActions, data) => {
            return (
                <div className="flex justify-end gap-2.5">
                    {actions && actions(data)}
                    {onView && (
                        <button className="bg-primary px-2 py-2 rounded text-white"
                                title="View" onClick={() => onView(data)}>
                            <FaEye/>
                        </button>
                    )}
                    {data.disableEdit === 1 && !onView && data.disableDelete === 1 && !actions && '-'}
                    {onEdit && (data?.disableEdit !== 1) && (
                        <button
                            className="border border-indigo-500 text-indigo-500 p-2 rounded hover:bg-indigo-500 hover:text-white focus:shadow-none"
                            title="Edit" onClick={() => onEdit(data)}>
                            <FaPencilAlt size={12}/>
                        </button>
                    )}
                    {onDelete && (data?.disableDelete !== 1) && (
                        <button
                            className="border border-red-500 text-red-500 p-2 rounded hover:bg-red-500 hover:text-white focus:shadow-none"
                            title="Delete" onClick={async () => {
                            await useActionConfirm(
                                onDelete,
                                {uid: data.uid},
                                onReload, 'Are you sure you want to delete this item?', 'Yes, Delete')
                        }}>
                            <FaTrashAlt size={12}/>
                        </button>
                    )}
                </div>
            )
        }
    }]


    return (
        <>
            <div className="p-3 relative">
                <div className="overflow-x-auto slim-scroll">
                    <table className="table-auto w-full">
                        <thead className="text-[15px] font-light text-text dark:text-gray-100 text-opacity-90">
                        <tr className="border-b border-gray-200 dark:border-gray-700 w-full">
                            {indexed && (
                                <th className="p-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">#</div>
                                </th>
                            )}
                            {cols?.map((column, index) => (
                                <th className="p-3 whitespace-nowrap text-left" key={index}>
                                    <div
                                        className={`font-semibold ${column?.className || ''}`}>
                                        {i18n.t(column.text)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody
                            className="text-[15px] font-light text-text dark:text-gray-100 divide-y divide-gray-200 dark:divide-gray-700">
                        {loading ? (
                            <tr>
                                <td className="h-96 pb-16">
                                    <div className='absolute w-full flex justify-center'>
                                        <Loader/>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {(pagination ? data?.docs : data)?.map((row, index) => (
                                    <tr key={index}>
                                        {indexed && (
                                            <td className="p-3.5 whitespace-nowrap">
                                                {(pagination ? (data?.page - 1) * data.limit : 0) + index + 1}
                                            </td>
                                        )}
                                        {cols?.map((column, index) => (
                                            <td className={`p-3.5 whitespace-nowrap ${column?.className || ''}`}
                                                key={index}>
                                                {column.formatter ? column.formatter(row[column.dataField], row) : (row[column.dataField] || '-')}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        )}
                        {loading || extras}
                        </tbody>
                    </table>
                </div>
                {(!!data && pagination) && (
                    <div
                        className="pt-6  border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <FiChevronLeft
                            role={data?.page > 1 ? "button" : ""}
                            size={15}
                            onClick={() => {
                                if (data?.page > 1) {
                                    onReload({
                                        page: data?.page - 1,
                                    })
                                }
                            }}
                            className={data?.page > 1 ? "opacity-50" : "opacity-30"}/>
                        <FiChevronRight
                            onClick={() => {
                                if (data?.page < data?.totalPages) {
                                    onReload({
                                        page: data?.page + 1,
                                    })
                                }
                            }}
                            role={data?.page < data?.totalPages ? "button" : ""}
                            className={data?.page < data?.totalPages ? "opacity-50" : "opacity-30"}
                            size={15}/>
                    </div>
                )}
            </div>
        </>
    )
}
export default Table
'use client'

import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdCached, MdClose, MdDelete, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";


interface OrderClientProps {
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const OrderClient: React.FC<OrderClientProps> = ({
    orders
}) => {


    const router = useRouter()

    let rows: any = []

    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createdDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            }
        })
    }

    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', width: 220
        },
        {
            field: 'customer', headerName: 'Customer', width: 220
        },
        {
            field: 'amount', headerName: 'Amount(USD)', width: 220, renderCell:
                (params) => {
                    return (<div className="font-bold text-slate-800">
                        {params.row.amount}
                    </div>)
                }
        },
        {
            field: 'paymentStatus', headerName: 'Payment Status', width: 150, 
            renderCell:
                (params) => {
                    return (<div>
                        {params.row.paymentStatus === 'pending' ? (<Status
                            text="pending"
                            icon={MdAccessTimeFilled}
                            bg="bg-slate-200"
                            color="text-slate-700"
                        />) : params.row.paymentStatus === 'complete' ? (
                            <Status
                                text="complete"
                                icon={MdDone}
                                bg="bg-green-200"
                                color="text-green-700"
                            />) : <></>}
                    </div>)
                }
        },
        {
            field: 'date', headerName: 'Date', width: 100
        },
        {
            field: 'deliveryStatus', headerName: 'Delivery Status', width: 120, renderCell:
                (params) => {
                    return (<div>
                        {params.row.deliveryStatus === 'pending' ? (<Status
                            text="pending"
                            icon={MdAccessTimeFilled}
                            bg="bg-slate-200"
                            color="text-slate-700"
                        />) : params.row.deliveryStatus === 'dispatched' ? (
                            <Status
                                text="dispatched"
                                icon={MdDeliveryDining}
                                bg="bg-purple-200"
                                color="text-purple-700"
                            />) : params.row.deliveryStatus === 'delivered' ? (
                                <Status
                                    text="delivered"
                                    icon={MdDone}
                                    bg="bg-green-200"
                                    color="text-green-700"
                                />) : <></>}
                    </div>)
                }
        },


        {
            field: 'action', headerName: 'Actions', width: 200, renderCell:
                (params) => {
                    return (<div className="flex justify-between gap-4 w-full">
                        <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                            router.push(`/order/${params.row.id}`)
                        }} />
                    </div>)
                },

        },
    ]

    


    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Your Orders" center />
            </div>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 5
                            },
                        }
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    )
}

export default OrderClient;
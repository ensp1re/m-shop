'use client'

import { SafeUser } from "@/types";
import { Order, Product, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";


interface SummaryProps {

    products: Product[];
    orders: Order[];
    users : any;
}

type SummaryDataType = {
    [key: string]: {
        label: string;
        digit: number;
    }
}

const Summary: React.FC<SummaryProps> = ({
    products, orders, users
}) => {

    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: {
            label: 'Total Sale',
            digit: 0,
        },
        products: {
            label: 'Total Products',
            digit: 0,
        },
        orders: {
            label: 'Total Orders',
            digit: 0,
        },
        paidOrders: {
            label: 'Total Paid Orders',
            digit: 0,
        },
        unpaidOrders: {
            label: 'Total  Unpaind Orders',
            digit: 0,
        },
        users: {
            label: 'Total Users',
            digit: 0,
        }
    })


    useEffect(() => {
        setSummaryData((prev) => {
            let tempData = { ...prev }

            const totalSale = orders.reduce((acc, item) => {
                if (item.status === 'complete') {
                    return item.amount + acc
                } else {
                    return acc
                }

            }, 0)

            const paidOrders = orders.filter((order) => {
                return order.status === 'complete'
            })

            const unpaidOrders = orders.filter((order) => {
                return order.status === 'pending'
            })

            tempData.sale.digit = totalSale;
            tempData.orders.digit = orders.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unpaidOrders.digit = unpaidOrders.length;
            tempData.products.digit = products.length;
            tempData.users.digit = users.length;

            return tempData
        })
    }, [users, orders, products])

    const summaryKeys = Object.keys(summaryData)

    return (
        <div className="max-w-[1150px] m-auto">
            <div className="mb-4 mt-4">
                <Heading title="Stats" center />
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
                {
                    summaryKeys && summaryKeys.map((key) => {
                        return <div key={key} className="rounded border-2 p-4 flex flex-col items-center
                        gap-2 transition">
                            <div className="text-xl md:text-4xl font-bold">
                                {
                                    summaryData[key].label === "Total Sale" ? <>{formatPrice(summaryData[key].digit)}</> : <>{formatNumber(summaryData[key].digit)}</>
                                }
                            </div>
                            <div>
                                {summaryData[key].label}
                            </div>
                        </div>
                    })
                }                
            </div>
        </div>
    )
}

export default Summary;
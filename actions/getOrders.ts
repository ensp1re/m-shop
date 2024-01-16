import prisma from "@/libs/prismadb"

export default async function getOrders() {
    try {

        const orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createdDate: "desc"
            }
        })

        return new Promise((resolve) =>
        setTimeout(() => {
            resolve(orders)
        }, 1000))    } catch (error: any) {
        throw new Error(error)
    }
}
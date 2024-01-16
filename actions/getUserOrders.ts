import prisma from '@/libs/prismadb'



export default async function getOrderById(userId: string) {
    try {


        if (!userId) {
            throw new Error("orderId is required");
        }

        const order = await prisma.order.findMany({
            include: {
                user: true,
            },
            orderBy: {
                createdDate: 'desc'
            },
            where: {
                userId: userId
            }
        });

        if (!order) return null;

        return order;
    } catch (error:  any) {
        throw new Error(error);
    }
}

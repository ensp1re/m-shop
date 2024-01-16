import prisma from "@/libs/prismadb"


export interface IProductParams {
    category?: string | null;
    searchTerm?: string | null;
}


export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm } = params;

        let searchString = searchTerm;

        console.log("log", searchTerm)

        if (!searchTerm) {
            searchString = ''
        }

        let query: any = {}

        if (category) {
            query.category = category
        }
       

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive'

                        },
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include: {
                reviews: {
                    include:{
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        }
        )
        return new Promise((resolve) =>
        setTimeout(() => {
            resolve(products)
        }, 1000))

    } catch (error: any) {
        throw new Error(error)
    }
}
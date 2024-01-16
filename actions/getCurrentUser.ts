import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb"

export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            console.log("not session")

            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            },
            include: {
                orders: true
            }
        });

        if (!currentUser) {
            console.log("not user")
            return null
        }

        return new Promise((resolve) =>
            setTimeout(() => {
                resolve({
                    ...currentUser,
                    createdAt: currentUser.createdAt.toISOString(),
                    updatedAt: currentUser.updatedAt.toISOString(),
                    emailVerified: currentUser.emailVerified?.toISOString() || null,
                })
            }, 1000))


    } catch (error: any) {
        console.log(error)
        return null
    }
}
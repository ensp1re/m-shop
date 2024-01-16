import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"




export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== "ADMIN") {
        return NextResponse.error()
    }
    console.log(params.id)

    const product = await prisma?.product.delete({
        where: {id : params.id}
    })

    return NextResponse.json(product)
}
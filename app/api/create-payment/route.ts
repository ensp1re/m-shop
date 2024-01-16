import Stripe from "stripe";
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productid]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { useCart } from "@/hooks/useCart";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,
    {
        apiVersion: "2023-10-16"
    }
)

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity
        return acc + itemTotal
    }, 0)

    const price: any = Math.floor(totalPrice)

    return price
}


export async function POST(request: Request) {

    try {
        const currentUser = await getCurrentUser()


        if (!currentUser) {
            return NextResponse.error()
        }

        const body = await request.json()
        const { items, payment_intent_id } = body
        const total = calculateOrderAmount(items) * 100
        const orderData = {
            user: { connect: { id: currentUser.id } },
            amount: total,
            currency: "usd",
            status: "pending",
            deliveryStatus: "pending",
            paymentIntentId: payment_intent_id,
            products: items
        }




        if (payment_intent_id) {
            // update the order
            const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)



            if (current_intent) {

                const updated_intent = await stripe.paymentIntents.update(
                    payment_intent_id, { amount: total }
                )


                const [existing_order, update_order] = await Promise.all([
                    prisma.order.findFirst({ where: { paymentIntentId: payment_intent_id } }),
                    prisma.order.update({
                        where: { paymentIntentId: payment_intent_id },
                        data: {
                            amount: total,
                            products: items,
                        }
                    })
                ])

                if (!existing_order) {
                    return NextResponse.error();
                }



                return NextResponse.json({ paymentIntent: updated_intent })

            }

        } else {
            // create the intent and create the order
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "usd",
                automatic_payment_methods: { enabled: true }
            });

            // console.log("payment_intent", paymentIntent.client_secret)

            orderData.paymentIntentId = paymentIntent.id

            await prisma.order.create({
                data: orderData,
            })

            return NextResponse.json({ paymentIntent })

        }
    } catch (error) {
        console.log(error)
        return NextResponse.error();

    }
}
import Container from "@/app/components/container";
import getOrders from "@/actions/getOrders";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrderClient from "./OrderClient";
import getUserOrders from "@/actions/getUserOrders";


const Orders = async () => {

    const currentUser = await getCurrentUser()

    
    if (!currentUser) {
        return <NullData title="Error!"/>
    }


    const orders = await getUserOrders(currentUser.id)



    if (!orders) {
        return <NullData title="Something went wrong" />
    }


    return (
        <div className="pt-8">
            <Container>
                <OrderClient orders={orders} />
            </Container>
        </div>
    )
}

export default Orders;
import Container from "@/app/components/container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface OrderProps {
    orderId?: string;
}

const Order = async ({ params }: { params: { 'order-id'?: string } }) => {
    const orderId = params['order-id'];

    if (!orderId) {
        return <NullData title="orderId is required" />;
    }

    const order = await getOrderById({ orderId });

    if (!order) {
        return <NullData title="Something went wrong" />;
    }

    return (
        <div className="p-8">
            <Container>
                <OrderDetails order={order} />
            </Container>
        </div>
    );
}

export default Order;

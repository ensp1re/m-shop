import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import getUSers from "@/actions/getUsers";
import Container from "../components/container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";


const Admin = async () => {


    const products = await getProducts({ category: null })
    const orders = await getOrders()
    const users = await getUSers()
    const data = await getGraphData()




    return (
        <div className="pt-8">
            <Container>
                <Summary
                    products={products}
                    users={users}
                    orders={orders}
                />
                <div className="mt-4 mx-auto max-w-[1150px]">
                    <BarGraph data={data} />
                </div>

            </Container>
        </div>
    )
}

export default Admin;
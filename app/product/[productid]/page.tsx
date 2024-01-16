import Container from "@/app/components/container";
import ProductDetails from "@/app/product/[productid]/ProductDetails";
import ListRating from "@/app/product/[productid]/ListRating";
import { products } from "@/utils/products";
import getProductsById from "@/actions/getProductById";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

interface ProductProps {
    productId: any
}


const Product = async ({ params }: { params: { 'productid'?: string } }) => {
    console.log("params", params);

    const productId = params['productid']

    if (!productId) return null

    let product: any;

    product = products.find((item) => item.id === productId);

    if (!product) {
        product = await getProductsById({productId})
    } 



    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return <NullData title="OOpse! No user!"/>
    }
    





    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product} />
                <div className="flex flex-col mt-20 gap-4">
                    <AddRating product={product} user={currentUser}/>
                    <ListRating product={product} />
                </div>
            </Container>
        </div>
    );
}

export default Product;
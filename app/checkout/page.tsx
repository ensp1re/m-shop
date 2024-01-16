import FormWrap from "../components/FormWrap";
import Heading from "../components/Heading";
import CheckoutClient from "./CheckoutClient";
import Container from "@/app/components/container";


const Checkout = () => {

    return (
        <div className="p-8">
            <Container>
                <FormWrap>
                    <CheckoutClient />
                </FormWrap>
            </Container>
        </div>
    )
}

export default Checkout;
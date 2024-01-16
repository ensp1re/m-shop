import FormWrap from "@/app/components/FormWrap";
import Container from "@/app/components/container";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";


const AddProducts = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title="Oops! Access denied!"/>
    }

    return (
        <div>
            <Container>
                <FormWrap>
                    <AddProductForm />
                </FormWrap>
            </Container>
        </div>
    )
}

export default AddProducts;
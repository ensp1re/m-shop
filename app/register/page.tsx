import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/container";
import FormWrap from "@/app/components/FormWrap";
import RegisterForm from "@/app/register/RegisterForm";

const Register = async () => {

    const currentUser = await getCurrentUser()

    return (
        <Container>
            <FormWrap>
                <RegisterForm currentUser={currentUser}/>
            </FormWrap>
        </Container>
    )
}

export default Register;
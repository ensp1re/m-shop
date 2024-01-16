import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/container";
import FormWrap from "@/app/components/FormWrap";
import LoginForm from "@/app/login/LoginForm";

const Login = async () => {
    const currentUser = await getCurrentUser()

    return (
        <Container>
            <FormWrap>
                <LoginForm currentUser={currentUser}/>
            </FormWrap>
        </Container>
    )
}

export default Login;
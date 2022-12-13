import LayoutRegisterAndLogin from "../components/LayoutRegisterAndLogin";
import FormRegisterAndLogin from "../components/FormRegisterAndLogin";
function Login() {
    return (
        <LayoutRegisterAndLogin>
            <FormRegisterAndLogin url={"/login"} title='Login' name={false} link='/register' textLink='Register' message="You don't have account?" />
        </LayoutRegisterAndLogin>
    )
}
export default Login;
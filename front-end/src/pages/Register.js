import LayoutRegisterAndLogin from "../components/LayoutRegisterAndLogin";
import FormRegisterAndLogin from "../components/FormRegisterAndLogin";

function Register() {

    return (
        <LayoutRegisterAndLogin>
            <FormRegisterAndLogin title='Register' name={true} link='/login' textLink='Login' message="You have account?" />
        </LayoutRegisterAndLogin>
    )
}
export default Register;
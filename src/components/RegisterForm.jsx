import useForm from "../hooks/FormHooks.js";
import {useAuthentication} from "../hooks/ApiHooks.js";
import Button from "./UI/Button.jsx";

const RegisterForm = () => {
  const {register} = useAuthentication();
  const initValues = {
    username: "",
    password: "",
    email: "",
  };
  const doRegister = async () => {
    console.log('doRegister', inputs)
    try {
      const userData = await register(inputs);
      console.log('userData', userData);
    } catch (error) {
      alert(error.message);
    }
  }
  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues
  );
  console.log(inputs)
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <Button text={"Register"} />
      </form>
    </>
  );
};

export default RegisterForm;

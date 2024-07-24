import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import  useForm  from "../hooks/useForm";

const LoginFormKeys ={
  Email:'email',
  Password : 'password',
}
export default function Login () {
  const {loginSubmitHandler} = useContext(AuthContext);
  const {values, onChange, onSubmit} = useForm(loginSubmitHandler,{
    [LoginFormKeys.Email]: '', 
    [LoginFormKeys.Password] : '',
  });
    return (
        <div>
      <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Login</h2>
          </div>
          <div className="col-12">
            <a href="">Home</a>
            <a href="">Login</a>
          </div>
        </div>
      </div>
    </div>
        <div className="contact">
        <div className="container-fluid">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4" />
              <div className="col-md-8">
                <div className="contact-form">
                  <div id="success" />
                  <form name="sentMessage" id="contactForm" onSubmit={onSubmit} noValidate="novalidate">
                    <div className="control-group">
                      <input
                        type="email"
                        className="form-control"
                        name={LoginFormKeys.Email}
                        id="email"
                        placeholder="Email"
                        required="required"
                        data-validation-required-message="Please enter your email"
                        onChange={onChange}
                        value={values[LoginFormKeys.Email]}
                      />
                      <p className="help-block text-danger" />
                    </div>
                    <div className="control-group">
                      <input
                        type="password"
                        className="form-control"
                        name={LoginFormKeys.Password}
                        id="password"
                        placeholder="Password"
                        required="required"
                        data-validation-required-message="Please enter a password"
                        onChange={onChange}
                        value={values[LoginFormKeys.Password]}
                      />
                      <p className="help-block text-danger" />
                    </div>
                    <div>
                      <button className="btn" type="submit" id="sendMessageButton">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );

}
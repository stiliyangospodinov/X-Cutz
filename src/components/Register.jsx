import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import useForm from "../hooks/useForm";

export default function Register () {

  const RegisterFormKeys = {
    Email: "email",
    Username: "username",
    Password: "password",
    ConfirmPassword: "re-password", 
  }

  const {registerSubmitHandler} = useContext(AuthContext)

  const {values, onChange, onSubmit} = useForm(registerSubmitHandler,{
    [RegisterFormKeys.Email]:'',
    [RegisterFormKeys.Password]:'',
    [RegisterFormKeys.ConfirmPassword]:'',

  })
    return (
<div>
    <div className="page-header">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Register</h2>
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
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        required="required"
                                        data-validation-required-message="Please enter your name"
                                        onChange={onChange}
                                        values={values[RegisterFormKeys.Username]}
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        required="required"
                                        data-validation-required-message="Please enter your email"
                                        onChange={onChange}
                                        values={values[RegisterFormKeys.Email]}
                                        />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        required="required"
                                        data-validation-required-message="Please enter a password"
                                        onChange={onChange}
                                        values={values[RegisterFormKeys.Password]}
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="re-password"
                                        name="re-password"
                                        placeholder="Repeat Password"
                                        required="required"
                                        data-validation-required-message="Passwords don't match"
                                        onChange={onChange}
                                        values={values[RegisterFormKeys.ConfirmPassword]}
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div>
                                    <button className="btn" type="submit" id="sendMessageButton">
                                        Register
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
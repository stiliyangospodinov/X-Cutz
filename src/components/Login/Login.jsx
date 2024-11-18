import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import validateForm from "../../utils/loginValidations";
import { Link } from "react-router-dom";

const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
};
const initialValues = {
    [LoginFormKeys.Email]: '',
    [LoginFormKeys.Password]: '',
}

export default function Login() {
    const { loginSubmitHandler, authError } = useContext(AuthContext);
    const { values, onChange } = useForm(loginSubmitHandler,initialValues );

    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(values);
        setValidationErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            loginSubmitHandler(values);
        }
    };

    return (
        <div>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Login</h2>
                        </div>
                        <div className="col-12">
                            <Link to="/">Home</Link>
                            <Link to="/register">Register</Link>
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
                                    <form name="sentMessage" id="contactForm" onSubmit={handleSubmit} noValidate="novalidate">
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
                                            {validationErrors.email && <p className="help-block text-danger">{validationErrors.email}</p>}
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
                                            {validationErrors.password && <p className="help-block text-danger">{validationErrors.password}</p>}
                                        </div>
                                        <div>
                                            <button className="btn" type="submit" id="sendMessageButton">
                                                Login
                                            </button>
                                        </div>
                                        {authError && <p className="help-block text-danger">{authError}</p>}
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

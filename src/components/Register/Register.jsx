import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import validateForm from "../../utils/registerValidations";
import useForm from "../../hooks/useForm";
import PageHeader from "../Shared/PageHeader/PageHeader";

export default function Register() {
    const RegisterFormKeys = {
        Email: "email",
        Username: "username",
        Password: "password",
        ConfirmPassword: "re-password",
    };
    const initialValues = {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: ''
    };

    const { registerSubmitHandler, authError } = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const submitHandler = (values) => {
        const validationErrors = validateForm(values);
        if (Object.keys(validationErrors).length === 0) {
            registerSubmitHandler(values);
        } else {
            setErrors(validationErrors);
        }
    };

    const { values, onChange, onSubmit } = useForm(submitHandler, initialValues);
    
    return (
        <div>
  <PageHeader name="Register" endpoint="register" />
            <div className="contact">
                <div className="container-fluid">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-4" />
                            <div className="col-md-8">
                                <div className="contact-form">
                                    <form onSubmit={onSubmit} noValidate>
                                        <div className="control-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name={RegisterFormKeys.Username}
                                                placeholder="Username"
                                                required
                                                onChange={onChange}
                                                value={values[RegisterFormKeys.Username]}
                                            />
                                            {errors.username && <p className="help-block text-danger">{errors.username}</p>}
                                        </div>
                                        <div className="control-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name={RegisterFormKeys.Email}
                                                placeholder="Email"
                                                required
                                                onChange={onChange}
                                                value={values[RegisterFormKeys.Email]}
                                            />
                                            {errors.email && <p className="help-block text-danger">{errors.email}</p>}
                                        </div>
                                        <div className="control-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name={RegisterFormKeys.Password}
                                                placeholder="Password"
                                                required
                                                onChange={onChange}
                                                value={values[RegisterFormKeys.Password]}
                                            />
                                            {errors.password && <p className="help-block text-danger">{errors.password}</p>}
                                        </div>
                                        <div className="control-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="re-password"
                                                name={RegisterFormKeys.ConfirmPassword}
                                                placeholder="Repeat Password"
                                                required
                                                onChange={onChange}
                                                value={values[RegisterFormKeys.ConfirmPassword]}
                                            />
                                            {errors[RegisterFormKeys.ConfirmPassword] && <p className="help-block text-danger">{errors[RegisterFormKeys.ConfirmPassword]}</p>}
                                        </div>
                                        <div>
                                            <button className="btn" type="submit">
                                                Register
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

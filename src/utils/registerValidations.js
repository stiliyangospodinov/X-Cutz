const validateForm = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = "Please enter your name.";
    }

    if (!values.email) {
        errors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid.";
    }

    if (!values.password) {
        errors.password = "Please enter a password.";
    } else if (values.password.length < 5) {
        errors.password = "Password must be at least 5 characters.";
    }

    if (!values["re-password"]) {
        errors["re-password"] = "Please confirm your password.";
    } else if (values["re-password"] !== values.password) {
        errors["re-password"] = "Passwords do not match.";
    }

    return errors;
};

export default validateForm;
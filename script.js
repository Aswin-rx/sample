$(document).ready(function() {
    const form = $('#form');
    const fullname = $('#fullname');
    const email = $('#email');
    const phoneNumber = $('#phonenumber');
    const birthdate = $('#birthdate');
    const address1 = $('#address1');
    const address2 = $('#address2');
    const country = $('#country');
    const city = $('#city');
    const region = $('#region');
    const postalcode = $('#postalcode');
    const createpassword = $('#createpassword');
    const confirmpassword = $('#confirmpassword');
    const submitButton = form.find('button[type="submit"]');
    const togglePasswordCreate = $('#togglePasswordCreate');
    const togglePasswordConfirm = $('#togglePasswordConfirm');

    togglePasswordCreate.click(function() {
        const type = createpassword.attr('type') === 'password' ? 'text' : 'password';
        createpassword.attr('type', type);
        $(this).toggleClass('fa-eye-slash fa-eye');
    });

    togglePasswordConfirm.click(function() {
        const type = confirmpassword.attr('type') === 'password' ? 'text' : 'password';
        confirmpassword.attr('type', type);
        $(this).toggleClass('fa-eye-slash fa-eye');
    });

    submitButton.prop('disabled', true);

    fullname.on('blur', validateFullName);
    email.on('blur', validateEmail);
    phoneNumber.on('blur', validatePhoneNumber);
    birthdate.on('blur', validateBirthdate);
    address1.on('blur', validateAddress1);
    address2.on('blur', validateAddress2);
    country.on('blur', validateCountry);
    city.on('blur', validateCity);
    region.on('blur', validateRegion);
    postalcode.on('blur', validatePostalCode);
    createpassword.on('blur', validateCreatePassword);
    confirmpassword.on('blur', validateConfirmPassword);

    form.on('submit', function(event) {
        event.preventDefault();
        if (!submitButton.prop('disabled')) {
            form.submit();
        }
    });

    function validateFullName() {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (fullname.val().trim() === '') {
            setError(fullname, 'Full Name is required');
        } else if (!nameRegex.test(fullname.val().trim())) {
            setError(fullname, 'Full Name must contain only alphabets');
        } else {
            setSuccess(fullname);
        }
        toggleSubmitButton();
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.val().trim() === '') {
            setError(email, 'Email is required');
        } else if (!emailRegex.test(email.val().trim())) {
            setError(email, 'Email is not valid');
        } else {
            setSuccess(email);
        }
        toggleSubmitButton();
    }

    function validatePhoneNumber() {
        const phoneRegex = /^\d{10}$/;
        if (phoneNumber.val().trim() === '') {
            setError(phoneNumber, 'Phone Number is required');
        } else if (!phoneRegex.test(phoneNumber.val().trim())) {
            setError(phoneNumber, 'Phone Number must be 10 digits');
        } else {
            setSuccess(phoneNumber);
        }
        toggleSubmitButton();
    }

    function validateBirthdate() {
        const today = new Date();
        const dob = new Date(birthdate.val().trim());
        if (birthdate.val().trim() === '') {
            setError(birthdate, 'DOB is required');
        } else if (dob > today) {
            setError(birthdate, 'Enter a valid DOB');
        } else {
            setSuccess(birthdate);
        }
        toggleSubmitButton();
    }

    function validateAddress1() {
        if (address1.val().trim() === '') {
            setError(address1, 'Address Line 1 is required');
        } else {
            setSuccess(address1);
        }
        toggleSubmitButton();
    }

    function validateAddress2() {
        if (address2.val().trim() === '') {
            setError(address2, 'Address Line 2 is required');
        } else {
            setSuccess(address2);
        }
        toggleSubmitButton();
    }

    function validateCountry() {
        const countryValue = country.val().trim();
        if (countryValue === '' || countryValue === 'Country') {
            setError(country, 'Country is required');
        } else {
            setSuccess(country);
        }
        toggleSubmitButton();
    }

    function validateCity() {
        if (city.val().trim() === '') {
            setError(city, 'City is required');
        } else {
            setSuccess(city);
        }
        toggleSubmitButton();
    }

    function validateRegion() {
        if (region.val().trim() === '') {
            setError(region, 'Region is required');
        } else {
            setSuccess(region);
        }
        toggleSubmitButton();
    }

    function validatePostalCode() {
        const postalCodeRegex = /^\d+$/;
        if (postalcode.val().trim() === '') {
            setError(postalcode, 'Postal Code is required');
        } else if (!postalCodeRegex.test(postalcode.val().trim())) {
            setError(postalcode, 'Postal Code must contain only numbers');
        } else {
            setSuccess(postalcode);
        }
        toggleSubmitButton();
    }

    function validateCreatePassword() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        if (createpassword.val().trim() === '') {
            setError(createpassword, 'Password is required');
        } else if (!passwordRegex.test(createpassword.val().trim())) {
            setError(createpassword, 'Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character');
        } else {
            setSuccess(createpassword);
        }
        toggleSubmitButton();
    }

    function validateConfirmPassword() {
        if (confirmpassword.val().trim() === '') {
            setError(confirmpassword, 'Confirm Password is required');
        } else if (confirmpassword.val() !== createpassword.val()) {
            setError(confirmpassword, 'Passwords do not match');
        } else {
            setSuccess(confirmpassword);
        }
        toggleSubmitButton();
    }

    function setError(input, message) {
        const inputBox = input.parent();
        const small = inputBox.find('small');
        small.text(message);
        inputBox.addClass('error').removeClass('success');
    }

    function setSuccess(input) {
        const inputBox = input.parent();
        const small = inputBox.find('small');
        small.text('')
        inputBox.addClass('success').removeClass('error');
    }

    function toggleSubmitButton() {
        const allValid = [fullname, email, phoneNumber, birthdate, address1, address2, country, city, region, postalcode, createpassword, confirmpassword]
            .every(field => field.parent().hasClass('success'));
        submitButton.prop('disabled', !allValid);
    }
});

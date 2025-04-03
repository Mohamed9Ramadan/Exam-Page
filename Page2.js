document.addEventListener("DOMContentLoaded", function () {
        const registrationForm = document.getElementById("registrationForm");
        const repeatEmailInput = document.getElementById("rmail");
        const passwordInput = document.getElementById("pass");
        const confirmPasswordInput = document.getElementById("confirmPass");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        const storedEmail = sessionStorage.getItem("email");

        if (!storedEmail) {
                window.location.href = "Page1.html";
        }

        registrationForm.addEventListener("submit", function (event) {
                event.preventDefault();

                let valid = true;

                emailError.textContent = '';
                passwordError.textContent = '';
                confirmPasswordError.textContent = '';

                const repeatEmail = repeatEmailInput.value.trim();
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;

                if (repeatEmail !== storedEmail) {
                        emailError.textContent = "Email does not match the one provided.";
                        valid = false;
                }

                if (password.length < 6) {
                        passwordError.textContent = "Password must be at least 6 characters long.";
                        valid = false;
                }

                const passwordPattern = /^(?=.*[A-Z])(?=.*\d).*$/;
                if (!passwordPattern.test(password)) {
                        passwordError.textContent = "Password must include at least one uppercase letter and one number.";
                        valid = false;
                }


                if (password !== confirmPassword) {
                        confirmPasswordError.textContent = "Passwords do not match.";
                        valid = false;
                }


                if (valid) {
                        window.location.href = "Exam.html";
                }
        });
});
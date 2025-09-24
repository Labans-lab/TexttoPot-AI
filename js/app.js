// Interactive payment method for subscription
document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.getElementById('subscribe-form');
    const paymentMethod = document.getElementById('payment-method');
    const paymentDetails = document.getElementById('payment-details');
    const subscribeMsg = document.getElementById('subscribe-message');
    if (subscribeForm && paymentMethod && paymentDetails && subscribeMsg) {
        paymentMethod.addEventListener('change', function() {
            const method = paymentMethod.value;
            let html = '';
            if (method === 'mpesa') {
                html = '<label for="mpesa-number">M-Pesa Number:</label><br><input type="text" id="mpesa-number" required placeholder="07XXXXXXXX"><br>';
            } else if (method === 'paypal') {
                html = '<label for="paypal-email">PayPal Email:</label><br><input type="email" id="paypal-email" required placeholder="your@email.com"><br>';
            } else if (method === 'card') {
                html = '<label for="card-number">Card Number:</label><br><input type="text" id="card-number" required placeholder="1234 5678 9012 3456"><br>';
                html += '<label for="card-expiry">Expiry:</label><br><input type="text" id="card-expiry" required placeholder="MM/YY"><br>';
                html += '<label for="card-cvc">CVC:</label><br><input type="text" id="card-cvc" required placeholder="123"><br>';
            }
            paymentDetails.innerHTML = html;
        });
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const method = paymentMethod.value;
            let valid = false;
            if (method === 'mpesa') {
                const num = document.getElementById('mpesa-number').value;
                valid = num && /^07\d{8}$/.test(num);
            } else if (method === 'paypal') {
                const email = document.getElementById('paypal-email').value;
                valid = email && email.includes('@');
            } else if (method === 'card') {
                const card = document.getElementById('card-number').value;
                const expiry = document.getElementById('card-expiry').value;
                const cvc = document.getElementById('card-cvc').value;
                valid = card && expiry && cvc;
            }
            if (method && valid) {
                subscribeMsg.textContent = 'Subscription successful! Thank you for supporting Text2Pot AI.';
                subscribeForm.reset();
                paymentDetails.innerHTML = '';
            } else {
                subscribeMsg.textContent = 'Please fill in all required payment details.';
            }
        });
    }
    // Auto-restart video every 10 seconds on planner.html
    var video = document.getElementById('autoVideo');
    if (video) {
        setInterval(function() {
            video.currentTime = 0;
            video.play();
        }, 10000); // 10 seconds
    }
});
function getSuggestions() {
  const input = document.getElementById('ingredients').value.toLowerCase();
  let suggestion = "";
  if (input.includes("beans") && input.includes("maize")) {
      suggestion = "Try Ugali & Beans with Sukuma Wiki (High in protein & fiber)";
  } else if (input.includes("milk") && input.includes("flour")) {
      suggestion = "Make Porridge with banana for a nutrient-packed breakfast.";
  } else {
      suggestion = "Add more ingredients for better suggestions!";
  }
  document.getElementById('results').innerHTML = `<p>${suggestion}</p>`;
}
// Simple login/logout logic
document.addEventListener('DOMContentLoaded', function() {
    // Login logic
    const loginForm = document.getElementById('login-form');
    const loginMsg = document.getElementById('login-message');
    const logoutBtn = document.getElementById('logout-btn');
    if (loginForm && loginMsg && logoutBtn) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            loginForm.style.display = 'none';
            logoutBtn.style.display = 'block';
            loginMsg.textContent = 'You are already logged in.';
        }
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const gmail = document.getElementById('gmail').value;
            const password = document.getElementById('password').value;
            // Check if user exists in localStorage
            const userData = JSON.parse(localStorage.getItem('users') || '{}');
            if (gmail && password && userData[gmail] && userData[gmail] === password) {
                localStorage.setItem('isLoggedIn', 'true');
                loginForm.style.display = 'none';
                logoutBtn.style.display = 'block';
                loginMsg.textContent = `Welcome, ${gmail}! You are now logged in.`;
            } else {
                loginMsg.textContent = 'Invalid Gmail or password.';
            }
        });
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            loginForm.style.display = 'block';
            logoutBtn.style.display = 'none';
            loginMsg.textContent = 'You have been logged out.';
        });
    }

    // Sign up logic
    const signupForm = document.getElementById('signup-form');
    const signupMsg = document.getElementById('signup-message');
    if (signupForm && signupMsg) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const gmail = document.getElementById('signup-gmail').value;
            const password = document.getElementById('signup-password').value;
            let userData = JSON.parse(localStorage.getItem('users') || '{}');
            if (gmail && password) {
                if (userData[gmail]) {
                    signupMsg.textContent = 'This Gmail is already registered.';
                } else {
                    userData[gmail] = password;
                    localStorage.setItem('users', JSON.stringify(userData));
                    signupMsg.textContent = 'Sign up successful! You can now log in.';
                    signupForm.reset();
                }
            } else {
                signupMsg.textContent = 'Please enter both Gmail and password.';
            }
        });
    }
});

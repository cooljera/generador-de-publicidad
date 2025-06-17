document.getElementById('showRegister').onclick = function(e) {
  e.preventDefault();
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
};
document.getElementById('showLogin').onclick = function(e) {
  e.preventDefault();
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
};

const auth = firebase.auth();

document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "app.html";
    })
    .catch(err => {
      document.getElementById('authMessage').innerText = "Error: " + err.message;
    });
};

document.getElementById('registerForm').onsubmit = function(e) {
  e.preventDefault();
  // Demo: solo simula registro
  document.getElementById('authMessage').innerText = "Registro exitoso. Ahora puedes iniciar sesión.";
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
};
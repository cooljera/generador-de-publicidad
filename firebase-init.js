// Inicializa Firebase con tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyAqWZFGWQgnYlTAtmLiEHxkqQFW3JYC7-I",
  authDomain: "generador-de-publicidad.firebaseapp.com",
  projectId: "generador-de-publicidad",
  storageBucket: "generador-de-publicidad.firebasestorage.app",
  messagingSenderId: "546115048965",
  appId: "1:546115048965:web:86453a88a5df3527dfae6c",
  measurementId: "G-CYNJNYVJC5"
};

firebase.initializeApp(firebaseConfig);
if (typeof firebase.analytics === "function") {
  firebase.analytics();
}
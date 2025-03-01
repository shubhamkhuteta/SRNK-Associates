// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB9aamikPRI-98-Tv9IG65vvk4qkO-qTnE",
  authDomain: "srnk-associates.firebaseapp.com",
  projectId: "srnk-associates",
  storageBucket: "srnk-associates.firebasestorage.app",
  messagingSenderId: "138345212232",
  appId: "1:138345212232:web:68746eb7b305a16da86b7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Firebase Authentication Logic
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const uploadButton = document.getElementById('upload-button');
    const uploadStatus = document.getElementById('upload-status');
    const fileInput = document.getElementById('file-upload');
    const documentsList = document.getElementById('documents-list');

    // Handle login button click
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const email = emailInput.value;
            const password = passwordInput.value;

            if (email && password) {
                // Sign in the user using Firebase Authentication
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(`Logged in as: ${user.email}`);
                        window.location.href = 'upload.html'; // Redirect to upload page after login
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert(`Error: ${errorMessage}`);
                    });
            } else {
                alert('Please enter a valid email and password.');
            }
        });
    }

    // Handle file upload button
    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            const file = fileInput.files[0];
            if (file) {
                uploadStatus.innerHTML = 'Uploading...';

                // Simulate file upload (you can replace this with actual file upload logic)
                setTimeout(() => {
                    uploadStatus.innerHTML = 'Document uploaded successfully!';
                }, 2000);
            } else {
                uploadStatus.innerHTML = 'Please select a file.';
            }
        });
    }

    // Handle authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById('user-status').innerText = `Logged in as: ${user.email}`;
        } else {
            document.getElementById('user-status').innerText = "Not logged in";
        }
    });

    // Populate the document list for download (simulated)
    if (documentsList) {
        const documents = [
            { name: 'Tax_Return_2022.pdf', url: '/documents/Tax_Return_2022.pdf' },
            { name: 'Account_Statement_2021.pdf', url: '/documents/Account_Statement_2021.pdf' },
            { name: 'Invoice_2023.pdf', url: '/documents/Invoice_2023.pdf' }
        ];

        documents.forEach(doc => {
            const listItem = document.createElement('a');
            listItem.href = doc.url;
            listItem.classList.add('list-group-item');
            listItem.target = '_blank'; // Open in a new tab
            listItem.innerHTML = doc.name;
            documentsList.appendChild(listItem);
        });
    }
});

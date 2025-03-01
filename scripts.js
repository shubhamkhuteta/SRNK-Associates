document.addEventListener('DOMContentLoaded', () => {

    // Get references to DOM elements
    const uploadButton = document.getElementById('upload-button');
    const uploadStatus = document.getElementById('upload-status');
    const loginButton = document.getElementById('login-button');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Handle the document upload
    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            const file = document.getElementById('file-upload').files[0];

            if (file) {
                uploadStatus.innerHTML = 'Uploading...';

                // Simulate a delay for document upload
                setTimeout(() => {
                    uploadStatus.innerHTML = 'Document uploaded successfully!';
                }, 2000);
            } else {
                uploadStatus.innerHTML = 'Please select a file.';
            }
        });
    }

    // Handle login functionality (In practice, integrate with Firebase or your backend)
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const email = emailInput.value;
            const password = passwordInput.value;

            if (email && password) {
                // This would normally be where you authenticate with Firebase or backend
                console.log(`Logged in with email: ${email}`);
                
                // Redirect to the upload page after successful login (this is a placeholder)
                window.location.href = 'upload.html'; 
            } else {
                alert('Please enter valid credentials.');
            }
        });
    }

    // Example functionality for document download (in a real-world case, this would connect to a server)
    const documentsList = document.getElementById('documents-list');
    if (documentsList) {
        // Simulate a list of documents available for download
        const documents = [
            { name: 'Tax_Return_2022.pdf', url: '/documents/Tax_Return_2022.pdf' },
            { name: 'Account_Statement_2021.pdf', url: '/documents/Account_Statement_2021.pdf' },
            { name: 'Invoice_2023.pdf', url: '/documents/Invoice_2023.pdf' }
        ];

        // Populate the document list dynamically
        documents.forEach(doc => {
            const listItem = document.createElement('a');
            listItem.href = doc.url;
            listItem.classList.add('list-group-item');
            listItem.target = '_blank'; // Open the document in a new tab
            listItem.innerHTML = doc.name;
            documentsList.appendChild(listItem);
        });
    }

});

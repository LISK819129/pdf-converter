document.getElementById('convertToPDF').addEventListener('click', () => {
    const fileInput = document.getElementById('wordInput');
  
    // Check if a file is selected
    if (!fileInput.files[0]) {
        alert('Please select a Word file to convert.');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
  
    fetch('https://sandbox.zamzar.com/v1/job', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('ef5b777ce1d75f3401df515b7f94708b5a2f803c' + ':'),
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // File converted successfully, download URL available
            const downloadUrl = data.target_files[0].url;
            window.location.href = downloadUrl;  // Trigger file download
        } else {
            alert('Conversion failed! Please check the file and try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Conversion failed! Please try again.');
    });
});

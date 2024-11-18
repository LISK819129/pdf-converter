// Word to PDF Conversion
document.getElementById('convertToPDF').addEventListener('click', () => {
  const fileInput = document.getElementById('wordInput');
  
  // Check if a file is selected
  if (!fileInput.files[0]) {
    alert('Please select a Word file to convert.');
    return;
  }

  const reader = new FileReader();

  // Read the file as an array buffer
  reader.onload = function (event) {
    const arrayBuffer = event.target.result;

    // Convert DOCX to HTML using Mammoth.js
    mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
      .then((result) => {
        const htmlContent = result.value; // Extracted HTML from the DOCX file

        // Create a PDF using jsPDF
        const pdf = new jsPDF();
        pdf.html(htmlContent, {
          callback: function (doc) {
            doc.save('converted.pdf'); // Save the PDF file
          },
          x: 10,
          y: 10,
        });
      })
      .catch((error) => {
        console.error('Error converting Word to PDF:', error);
        alert('Failed to convert Word file. Ensure the file is a valid .docx.');
      });
  };

  reader.readAsArrayBuffer(fileInput.files[0]);
});

// Disable PDF to Word Conversion
document.getElementById('convertToWord').addEventListener('click', () => {
  alert('PDF to Word conversion is not supported in this version. Please use external tools for this functionality.');
});

  

document.getElementById('convertToPDF').addEventListener('click', () => {
    const fileInput = document.getElementById('wordInput');
    if (!fileInput.files[0]) {
      alert('Please select a Word file first.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function (event) {
      const arrayBuffer = event.target.result;
  
      // Use Mammoth.js to extract clean HTML content
      mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then((result) => {
          const pdf = new jsPDF();
          pdf.html(result.value, {
            callback: function (doc) {
              doc.save('converted.pdf');
            },
          });
        })
        .catch((error) => {
          console.error('Error converting Word to PDF:', error);
          alert('Failed to convert Word file.');
        });
    };
    reader.readAsArrayBuffer(fileInput.files[0]);
  });
  
  document.getElementById('convertToWord').addEventListener('click', () => {
    const fileInput = document.getElementById('pdfInput');
    if (!fileInput.files[0]) {
      alert('Please select a PDF file first.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function (event) {
      const pdfContent = event.target.result;
      const blob = new Blob([pdfContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'converted.docx';
      link.click();
    };
    reader.readAsArrayBuffer(fileInput.files[0]);
  });
  
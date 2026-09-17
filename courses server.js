const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Admission forms metadata (example for 10 forms, extend to 40+ as needed)
const admissionForms = [
  { filename: 'admission-form-1.pdf', course: 'Tailoring and Dressmaking' },
  { filename: 'admission-form-2.pdf', course: 'Hairdressing and Beauty Therapy' },
  { filename: 'admission-form-3.pdf', course: 'Plumbing' },
  { filename: 'admission-form-4.pdf', course: 'Masonry' },
  { filename: 'admission-form-5.pdf', course: 'Electrical Installation' },
  { filename: 'admission-form-6.pdf', course: 'Carpentry and Joinery' },
  { filename: 'admission-form-7.pdf', course: 'Motor Vehicle Mechanics' },
  { filename: 'admission-form-8.pdf', course: 'Welding and Fabrication' },
  { filename: 'admission-form-9.pdf', course: 'Food and Beverage' },
  { filename: 'admission-form-10.pdf', course: 'Computer Packages' },
  // Add more entries up to admission-form-40.pdf here...
];

// Serve admission PDFs statically from 'admission_pdfs' folder
app.use('/admission_pdfs', express.static(path.join(__dirname, 'admission_pdfs')));

// Serve other static files (like CSS, JS, images) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get admission forms list, optionally filtered by course
app.get('/api/admission-forms', (req, res) => {
  const courseQuery = req.query.course ? req.query.course.toLowerCase() : null;

  let filteredForms = admissionForms;

  if (courseQuery) {
    filteredForms = admissionForms.filter(form =>
      form.course.toLowerCase().includes(courseQuery)
    );
  }

  res.json(filteredForms);
});

// Serve the frontend HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
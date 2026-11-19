# JobHunt - Modern Online Job Portal (React + Vite)

A modern, responsive, and feature-rich Job Portal web application built with **React 19**, **JSX**, **Vite**, and **Vanilla CSS**.

---

## 🚀 Features

- **Dynamic Homepage**: Hero search bar (title & location), trending tags, job categories, flexible work modes, verified platform stats, and featured job cards.
- **Advanced Job Filtering**: Filter jobs by keyword, location, date posted, salary range, employment type (Full-time, Part-time, Internship, etc.), and shift timings.
- **Dynamic Job Details (`JobDetailPage.jsx`)**: Comprehensive breakdown of requirements, qualifications, salary, perks, schedule, company overview, and hiring count.
- **Interactive 1-Click Application (`ApplyModal.jsx`)**: Candidate application modal with resume upload, details validation, and live submission feedback.
- **Save / Bookmark Jobs (`SavedJobsPage.jsx`)**: Save jobs to personal wishlist with real-time badge count and quick access.
- **Real-Time Job Posting (`PostJobPage.jsx`)**: Recruiters can post vacancies with live preview card and instant publishing into the portal state.
- **Company Showcase (`CompanyDetailPage.jsx`)**: Detailed company profiles, employee count, established date, and open vacancies by company.
- **Authentication (`LoginPage.jsx` & `RegisterPage.jsx`)**: Role-based access (Job Seeker / Employer), 1-click Demo Logins, and persistent `localStorage` session.
- **Responsive Aesthetics**: Modern glassmorphism, responsive navigation drawer, smooth animations, and clean color palette.

---

## 📁 React Project Structure

```
job-online-portal/
├── index.html                    # Vite entry point with Google Fonts & icons
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite build configuration
├── legacy_backup/                # Safely preserved backup of original static files
├── public/                       # Static assets (Company logos, photos, icons)
│   ├── html-img.jpg
│   ├── css-img.jpg
│   ├── js-img.jpg
│   ├── react-imh.jpg
│   ├── php-img.jpg
│   ├── mysql-img.jpg
│   ├── ruby-img.jpg
│   ├── java-img.jpg
│   ├── image-python.jpg
│   ├── job-offers-concept.jpg
│   └── image-1.jpg ... image-6.jpg
└── src/
    ├── main.jsx                  # React DOM root mounting
    ├── App.jsx                   # Central page router & layout controller
    ├── index.css                 # Global CSS variables & design system
    ├── App.css                   # Custom responsive styling & glassmorphism
    ├── data/
    │   ├── jobsData.js           # Comprehensive job openings dataset
    │   ├── categoriesData.js     # Categories & working mode categories
    │   └── reviewsData.js        # Testimonials, reviews, & platform stats
    ├── context/
    │   ├── AuthContext.jsx       # User authentication & role management
    │   └── JobContext.jsx        # Job listings, filters, saved jobs, & applications
    ├── components/
    │   ├── Navbar.jsx            # Sticky navbar with mobile drawer & user badge
    │   ├── Footer.jsx            # Modern footer with newsletter & social links
    │   ├── JobCard.jsx           # Modern card with save heart & quick apply
    │   ├── JobFilter.jsx         # Multi-criteria filter controls
    │   └── ApplyModal.jsx        # Job application popup dialog
    └── pages/
        ├── HomePage.jsx          # Hero search, categories, & latest jobs
        ├── JobsPage.jsx          # Searchable, filterable all jobs listing
        ├── JobDetailPage.jsx     # Full job specifications & company info
        ├── CompanyDetailPage.jsx # Company profile & company-specific jobs
        ├── PostJobPage.jsx       # Post job form with real-time card preview
        ├── AboutPage.jsx         # Mission, core pillars, & testimonials
        ├── ContactPage.jsx       # Contact cards, inquiry form, & FAQs
        ├── LoginPage.jsx         # Sign in with 1-click demo accounts
        ├── RegisterPage.jsx      # Sign up with seeker/employer selector
        └── SavedJobsPage.jsx     # Bookmarked positions management
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized bundle will be created in the `dist/` directory.

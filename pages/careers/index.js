// pages/careers/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Replaces useNavigate
import Head from 'next/head'; // For SEO
import { Search } from 'lucide-react';
import HRContactSection from '../../components/careers/HrContactSection';
import JobsByDepartment from '../../components/careers/JobsByDepartment';
import AnimateOnScroll from '../../components/AnimateonScroll'; 
import { fetchJobsFromAPI } from '../../lib/JobUtils';
import '../../styles/Careers.css'; // Import CSS


export async function getStaticProps() {
  try {
    const jobs = await fetchJobsFromAPI();
    return {
      props: { jobs },
      revalidate: 3600, // Optional: Re-generates the page every hour
    };
  } catch (error) {
    return { props: { jobs: [], error: 'Failed to load job listings.' } };
  }
}

const CareersPage = ({ jobs: initialJobs, error: initialError }) => {
  const [jobs, setJobs] = useState(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [loading, setLoading] = useState(false); // Loading is false initially
  const [error, setError] = useState(initialError);
  const [locationSearch, setLocationSearch] = useState('');
  const router = useRouter(); // Next.js router hook

  useEffect(() => {
    // Client-side filtering logic remains the same
    if (!locationSearch) {
      setFilteredJobs(jobs);
      return;
    }
    const lowercasedSearch = locationSearch.toLowerCase();
    const filtered = jobs.filter(job =>
      job.location.toLowerCase().includes(lowercasedSearch) ||
      job.title.toLowerCase().includes(lowercasedSearch) ||
      job.department.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredJobs(filtered);
  }, [locationSearch, jobs]);

  const handleViewDetails = (job) => {
    // Navigate using the Next.js router. We no longer pass state.
    // The details page will fetch its own data based on the URL parameter.
    router.push(`/careers/job/${job.juid}`);
  };

  return (
    <>
      <Head>
        <title>Careers - Join Our Team</title>
        <meta name="description" content="Explore open job positions and build the future with us." />
      </Head>
      <div className="careers-main-page">
        {/* Top Banner Section (No changes here) */}
        <div className="careers-top-banner">
          <img
            src="/images/careers.webp"
            alt="Illustration representing career opportunities"
            className="careers-bg-img" loading='eager' />
          <div className="franchise-hero-circles" />
          <div className="careers-banner-content">
            <AnimateOnScroll className="careers-fade-in-up">
              <h1 className="careers-banner-title">Join Our Team</h1>
              <div className='text-overlay'>
              <p className="careers-banner-subtitle">
                Build the future with us.
                We're looking for talented individuals who share our passion.
              </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Positions Section */}
        <div className="careers-positions-section">
          <div className="careers-section-container">
            <h2 className="careers-section-title">Open Positions</h2>

            {/* Search (No changes here) */}
            <div className="careers-search-container">
              <div className="careers-search-input-wrapper">
                <Search className="careers-search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search by location, title, or department..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="careers-location-search-input"
                />
              </div>
            </div>

            {/* Error State */}
            {error && <div className="careers-error-container"><p>{error}</p></div>}

            {/* Jobs Grid */}
            {!error && filteredJobs.length > 0 && (
              <JobsByDepartment jobs={filteredJobs} onViewDetails={handleViewDetails} />
            )}

            {/* No Jobs Found */}
            {!error && filteredJobs.length === 0 && (
              <div className="careers-no-jobs-container">
                <p className="careers-no-jobs-text">No job positions found for your search.</p>
              </div>
            )}
          </div>
        </div>

        <HRContactSection />
      </div>
    </>
  );
};

export default CareersPage;
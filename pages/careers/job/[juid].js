// pages/careers/job/[juid].js
import { useRouter } from 'next/router'; // Replaces useNavigate, useParams
import Head from 'next/head';
import { ArrowLeft, Building, MapPin } from 'lucide-react';
import { fetchJobsFromAPI, parseListField } from '../../../lib/JobUtils';
import ApplicationForm from '../../../components/careers/ApplicationForm';
import '../../../styles/JobDetails.css';

export async function getStaticPaths() {
  const jobs = await fetchJobsFromAPI();
  const paths = jobs.map(job => ({
    params: { juid: job.juid },
  }));

  // 'blocking' ensures that if a new job is added, Next.js will
  // generate the page on the first request, preventing a 404.
  return { paths, fallback: 'blocking' };
}

// 🧠 2. This function fetches the data for a SINGLE job page.
export async function getStaticProps({ params }) {
  const jobs = await fetchJobsFromAPI();
  const job = jobs.find(j => j.juid === params.juid);

  // If the job ID from the URL doesn't exist, return a 404 page.
  if (!job) {
    return { notFound: true };
  }

  // The 'job' object is passed as a prop to your component.
  return {
    props: { job },
    revalidate: 60 * 60, // Optional: Re-fetches data every hour
  };
}

// 🧠 3. Your component is now much simpler. It just receives the 'job' prop.
const JobDetail = ({ job }) => {
  const router = useRouter();
  const requirements = parseListField(job.requirements || '');

  const handleSubmitSuccess = () => {
    router.push('/careers');
  };

  // No more useState or useEffect for data fetching is needed!
  // If the page is loading (due to fallback), Next.js handles it.
  if (router.isFallback) {
    return <div>Loading job details…</div>;
  }

  return (
    <>
      <Head>
        <title>{`${job.title} | Careers`}</title>
        <meta name="description" content={job.description.substring(0, 160)} />
      </Head>

      <div className="job-detail-main-page">
        {/* Decorative elements remain the same */}
        <div className="decorative-elements">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="floating-shape"></div>
          ))}
        </div>

        {/* Header */}
        <button onClick={() => router.push('/careers')} className="job-detail-back-button">
          <ArrowLeft size={18}/> Back to Careers
        </button>
        <h1 className="job-detail-main-title">{job.title}</h1>
        <div className="job-detail-meta-info">
          <div><Building size={30}/>{job.department}</div>
          <div><MapPin size={30}/>{job.location}</div>
        </div>

        {/* Description */}
        <section className="job-detail-content-section">
          <h2>Description</h2>
          <p>{job.description}</p>
        </section>

        {/* Requirements */}
        {requirements && requirements.length > 0 && (
          <section className="job-detail-content-section">
            <h2>Requirements</h2>
            <ul className="job-detail-requirements-list">
              {requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Application Form */}
        <ApplicationForm
          jobId={job.juid}
          jobName={job.title}
          onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </>
  );
};

export default JobDetail;
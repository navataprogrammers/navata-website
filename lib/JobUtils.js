export const fetchJobsFromAPI = async () => {
  try {
    const response = await fetch('https://online.navata.com/SENDMAIL/jobopeningstofranchise.jsp?cjflag=J'); 
    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
    const data = await response.json();

    return data.map((job, index) => ({
    id: index + 1,
    juid: job.juid || '',
    title: job.position || '',
    department: job.department || '',
    location: job.location || '',
    description: job.job_desc || '',
    requirements: parseListField(job.cand_prof || ''),
  }));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const parseListField = (field) => {
  if (!field) return [];
  return field.toString().split(/[,\n]/).map(item => item.trim()).filter(item => item);
};

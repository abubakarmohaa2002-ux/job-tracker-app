import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import JobCard from "../components/JobCard";
import JobsNotFound from "../components/JobsNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching jobs", error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load jobs");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {loading && (
          <div className="text-center text-primary py-10">
            Loading jobs...
          </div>
        )}

        {jobs.length === 0 && !isRateLimited && !loading && (
          <JobsNotFound />
        )}

        {jobs.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} setJobs={setJobs} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;
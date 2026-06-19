import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const JobCard = ({ job, setJobs }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j._id !== id));
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  return (
    <Link
      to={`/job/${job._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-primary"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">
          {job.position}
        </h3>

        <p className="text-sm text-base-content/70">
          {job.company}
        </p>

        <p className="text-base-content/60">
          Status: <span className="font-semibold">{job.status}</span>
        </p>

        {job.notes && (
          <p className="text-base-content/70 line-clamp-2">
            {job.notes}
          </p>
        )}

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(job.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4" />

            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, job._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;

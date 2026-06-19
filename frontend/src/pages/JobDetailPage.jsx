import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const JobDetailPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job", error);
        toast.error("Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      toast.success("Job deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  const handleSave = async () => {
    if (!job.company.trim() || !job.position.trim()) {
      toast.error("Company and position are required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/jobs/${id}`, job);
      toast.success("Job updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* Top actions */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Jobs
            </Link>

            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Job
            </button>
          </div>

          {/* Card */}
          <div className="card bg-base-100">
            <div className="card-body">

              {/* Company */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Company</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={job.company}
                  onChange={(e) =>
                    setJob({ ...job, company: e.target.value })
                  }
                />
              </div>

              {/* Position */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Position</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={job.position}
                  onChange={(e) =>
                    setJob({ ...job, position: e.target.value })
                  }
                />
              </div>

              {/* Status */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered"
                  value={job.status}
                  onChange={(e) =>
                    setJob({ ...job, status: e.target.value })
                  }
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              {/* Notes */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Notes</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  value={job.notes || ""}
                  onChange={(e) =>
                    setJob({ ...job, notes: e.target.value })
                  }
                />
              </div>

              {/* Save button */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
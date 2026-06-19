import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreatePage = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company.trim() || !position.trim()) {
      toast.error("Company and position are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/jobs", {
        company,
        position,
        status,
        notes,
      });

      toast.success("Job created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating job", error);

      if (error.response?.status === 429) {
        toast.error("Too many requests. Please slow down.", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to create job");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Jobs
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">

              <h2 className="card-title text-2xl mb-4">
                Add New Job
              </h2>

              <form onSubmit={handleSubmit}>

                {/* Company */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Company</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    className="input input-bordered"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                {/* Position */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Position</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Frontend Developer"
                    className="input input-bordered"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>

                {/* Status */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
                    placeholder="Add notes about the application..."
                    className="textarea textarea-bordered h-32"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Job"}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;
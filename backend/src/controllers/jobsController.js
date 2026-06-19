import Job from "../models/Job.js";

// ✅ GET ALL JOBS
export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ GET JOB BY ID
export async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found!" });

    res.status(200).json(job);
  } catch (error) {
    console.error("Error in getJobById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ CREATE JOB
export async function createJob(req, res) {
  try {
    const { company, position, status, notes } = req.body;

    const job = new Job({
      company,
      position,
      status,
      notes,
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error in createJob:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ UPDATE JOB
export async function updateJob(req, res) {
  try {
    const { company, position, status, notes } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { company, position, status, notes },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error in updateJob:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ DELETE JOB
export async function deleteJob(req, res) {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteJob:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
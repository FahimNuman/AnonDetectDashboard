"use client";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles


const AddProject = ({ data }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleNewProject = async (e) => {
    e.preventDefault();

    if (!projectType) {
      return toast.error("Please select a project type");
    }

    const ProjectData = {
      projectTitle: title,
      description: description,
      projectType: projectType,
    };

    const formData = new FormData();
    for (const key in ProjectData) {
      formData.append(key, ProjectData[key]);
    }

    try {
      setLoading(true);

      const imageUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "fahimnuman");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dutyno5yw/image/upload",
            data
          );

          return uploadRes.data.secure_url;
        })
      );

      imageUrls.forEach((url) => formData.append("projectPicture", url));

      const response = await axios.post(
        "https://anon-cat.vercel.app/api/v1/project",
        formData
      );

      if (response.status === 400) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Some error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <form onSubmit={handleNewProject} className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Blog Post</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Post Category</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="" disabled>
                Select Post Category Type
              </option>
              {data?.data.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Post Picture</label>
            <input
              type="file"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="image"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <Toaster position="top-center" containerStyle={{ marginTop: "100px" }} reverseOrder={false} />
    </>
  );
};

export default AddProject;

"use client";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

// Dynamically import JoditEditor to prevent SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// Function to remove <p> tags from HTML content
const removePTags = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const paragraphs = tempDiv.querySelectorAll("p");
  paragraphs.forEach((p) => {
    const newContent = document.createDocumentFragment();
    while (p.firstChild) {
      newContent.appendChild(p.firstChild);
    }
    p.parentNode.replaceChild(newContent, p);
  });

  return tempDiv.innerHTML;
};

// Custom image handler function
const imageHandler = async (file, editor) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fahimnuman");

  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dutyno5yw/image/upload",
      data
    );
    const url = uploadRes.data.secure_url;
    editor.selection.insertHTML(`<img src="${url}" />`);
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Image upload failed");
  }
};

// Configure JoditEditor options
const config = {
  buttons: [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "ul",
    "ol",
    "|",
    "image",
    "link",
    "clean",
  ],
  uploader: {
    insertImageAsBase64URI: false,
    // Use custom image handler
    upload: (file, progress, success, error) => {
      imageHandler(file, { selection: { insertHTML: success } });
    },
  },
};

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

    // Remove <p> tags from the description
    const cleanedDescription = removePTags(description);

    const ProjectData = {
      projectTitle: title,
      description: cleanedDescription,
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
      <div className="container mx-auto p-4 max-w-3xl">
        <form
          onSubmit={handleNewProject}
          className="rounded-lg bg-white p-4 shadow-md "
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700"
            >
              Title
            </label>
            <br />
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Description
            </label>
            {/* Dynamically loaded JoditEditor */}
            <JoditEditor
              value={description}
              config={config}
              onChange={(content) => setDescription(content)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Post Category
            </label>
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
            <label className="block text-sm font-semibold text-gray-700">
              Post Picture
            </label>
            <br />
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
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-semibold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </>
  );
};

export default AddProject;

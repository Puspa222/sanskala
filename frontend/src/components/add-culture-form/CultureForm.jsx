import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import RTE from "../RTE";
function CultureForm() {
  const { register, handleSubmit, getValues, control } = useForm({
    defaultValues: { title: "", content: "" },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    try {
      const formData = new FormData();
      Array.from(data.images).forEach((image) => {
        formData.append("images[]", image);
      });
      const fileResponse = await fetch(
        "https://your-backend-url.com/upload-multiple",
        {
          method: "POST",
          body: formData,
        }
      );
      const fileResult = await fileResponse.json();
      if (fileResponse.ok) {
        const fileIds = fileResult.fileIds;
        const postData = {
          ...data,
          featuredImages: fileIds,
          userId: userData.id,
        };
        const postResponse = await fetch("https://your-backend-url.com/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
        if (postResponse.ok) {
          const postResult = await postResponse.json();
          alert("Post Added!");
        } else {
          alert("Failed to create post.");
        }
      } else {
        alert("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap max-w-6xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 rounded-lg shadow-lg gap-6"
    >
      {/* Title and Content Section */}
      <div className="w-full lg:w-2/3 px-4">
        <div className="mb-6">
          <Input
            label="Title:"
            placeholder="Enter the title"
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-100 rounded-md"
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-6">
          <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100 rounded-md"
          />
        </div>
      </div>

      {/* Image Upload and Submit Button Section */}
      <div className="w-full lg:w-1/3 px-4">
        <div className="mb-6">
          <Input
            label="Featured Images:"
            type="file"
            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100 rounded-md"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            multiple
            {...register("images", { required: true })}
          />
        </div>
        <Button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
export default CultureForm;

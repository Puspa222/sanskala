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
      className="flex flex-wrap bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg gap-4"
    >
      <div className="w-full md:w-2/3 px-4">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4 bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
          {...register("title", { required: true })}
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className="dark:bg-gray-700 dark:text-gray-100"
        />
      </div>

      <div className="w-full md:w-1/3 px-4">
        <Input
          label="Featured Images:"
          type="file"
          className="mb-4 bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          multiple
          {...register("images", { required: true })}
        />
        <Button
          type="submit"
          bgColor="bg-blue-500"
          className="w-full text-white dark:bg-blue-700 hover:dark:bg-blue-800"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default CultureForm;

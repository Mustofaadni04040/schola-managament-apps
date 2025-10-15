"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { AssignmentInput, assignmentSchema } from "@/lib/formValidationSchemas";
import { createAssignment, updateAssignment } from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AssignmentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentInput>({
    resolver: zodResolver(assignmentSchema),
  });
  //   after react 19 it'l be useactionstate
  const [state, formAction] = useFormState(
    type === "create" ? createAssignment : updateAssignment,
    {
      success: false,
      error: false,
    }
  );
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
    formAction(data);
  });

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Assignment has been ${
          type === "create" ? "created" : "updated"
        } successfully`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, type, router, setOpen]);

  const { lessons } = relatedData;

  return (
    <form
      className="flex flex-col gap-8 overflow-y-scroll max-h-[90vh] pr-2 no-scrollbar"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new assignment" : "Update assignment"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4 mx-3">
        <InputField
          label="Assignment Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
          widthContainer="md:w-full"
        />
        <InputField
          label="Start Date"
          name="startDate"
          defaultValue={data?.startDate?.toISOString().slice(0, 16)}
          register={register}
          error={errors?.startDate}
          widthContainer="md:w-full"
          type="datetime-local"
        />
        <InputField
          label="End Date"
          name="endDate"
          defaultValue={data?.endDate?.toISOString().slice(0, 16)}
          register={register}
          error={errors?.endDate}
          widthContainer="md:w-full"
          type="datetime-local"
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            widthContainer="md:w-full"
            hidden
          />
        )}

        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs text-gray-500">Lesson</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("lessonId")}
            defaultValue={data?.lessonId}
          >
            {lessons?.map((lesson: { id: string; name: string }) => (
              <option value={lesson.id} key={lesson.id} className="p-2">
                {lesson.name}
              </option>
            ))}
          </select>
          {errors.lessonId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonId.message.toString()}
            </p>
          )}
        </div>
      </div>

      {state.error && (
        <span className="text-red-500">Something went wrong</span>
      )}
      <button className="bg-[#FEBA17] text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AssignmentForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { LessonInput, lessonSchema } from "@/lib/formValidationSchemas";
import { createLesson, updateLesson } from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SelectField from "../SelectField";

const LessonForm = ({
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
  } = useForm<LessonInput>({
    resolver: zodResolver(lessonSchema),
  });
  //   after react 19 it'l be useactionstate
  const [state, formAction] = useFormState(
    type === "create" ? createLesson : updateLesson,
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
        `Lesson has been ${
          type === "create" ? "created" : "updated"
        } successfully`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, type, router, setOpen]);

  const { subjects, teachers, classes } = relatedData;

  return (
    <form
      className="flex flex-col gap-8 overflow-y-scroll max-h-[90vh] pr-2 no-scrollbar"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new lesson" : "Update lesson"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4 mx-3">
        <InputField
          label="Lesson Title"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
          widthContainer="md:w-full"
        />
        <SelectField
          label="Day"
          defaultValue={data?.day}
          register={register}
          error={errors?.day}
          widthContainer="md:w-full"
          options={[
            { value: "MONDAY", label: "Monday" },
            { value: "TUESDAY", label: "Tuesday" },
            { value: "WEDNESDAY", label: "Wednesday" },
            { value: "THURSDAY", label: "Thursday" },
            { value: "FRIDAY", label: "Friday" },
          ]}
        />
        <InputField
          label="Start Time"
          name="startTime"
          defaultValue={data?.startTime?.toISOString().slice(0, 16)}
          register={register}
          error={errors?.startTime}
          widthContainer="md:w-full"
          type="datetime-local"
        />
        <InputField
          label="End Time"
          name="endTime"
          defaultValue={data?.endTime?.toISOString().slice(0, 16)}
          register={register}
          error={errors?.endTime}
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
          <label className="text-xs text-gray-500">Subject</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("subjectId")}
            defaultValue={data?.subjectId}
          >
            {subjects?.map((subject: { id: string; name: string }) => (
              <option value={subject.id} key={subject.id} className="p-2">
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjectId?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs text-gray-500">Teacher</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teacherId")}
            defaultValue={data?.teacherId}
          >
            {teachers?.map((teacher: { id: string; name: string }) => (
              <option value={teacher.id} key={teacher.id} className="p-2">
                {teacher.name}
              </option>
            ))}
          </select>
          {errors.teacherId?.message && (
            <p className="text-xs text-red-400">
              {errors.teacherId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes?.map((classItem: { id: string; name: string }) => (
              <option value={classItem.id} key={classItem.id} className="p-2">
                {classItem.name}
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
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

export default LessonForm;

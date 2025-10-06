"use server";

import { SubjectInput } from "./formValidationSchemas";

export const createSubject = async (data: SubjectInput) => {
  console.log(data, "data in the server");
};

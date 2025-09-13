import { auth } from "@clerk/nextjs/server";

export const getRole = async () => {
  const { sessionClaims, userId } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;
  return { role, currentUserId };
};

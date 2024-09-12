import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth";

export default function getSession() {
  const session = getServerSession(authOptions);
  return session;
}

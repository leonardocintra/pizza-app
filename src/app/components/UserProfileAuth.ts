import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function UserProfileAuth() {
  const session = useSession();
  const { status } = session;

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userAdminLoading, setUserAdminLoading] = useState<boolean>(true);

  useEffect(() => {
    setUserAdminLoading(true);
    if (status === "authenticated") {
      const email = session.data.user?.email || "";

      fetch(`/api/profile?email=${email}`).then(response => {
        response.json().then(data => {
          setIsAdmin(data.isAdmin);
          setUserAdminLoading(false);
        })
      });

    } else if (status === "unauthenticated") {
      toast.error('Usuario sem acesso!');
      redirect("/login");
    }
  }, [session, status])

  return { isAdmin, userAdminLoading }
}
"use client";

import { useSession } from "next-auth/react";
import UserTabs from "../components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserDocument } from "../models/User";
import UserForm from "../components/layout/UserForm";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;

  if (status === "unauthenticated") {
    toast.error("Usuario sem acesso!");
    redirect("/login");
  }

  const [user, setUser] = useState<UserDocument>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [profileFetched, setProfileFetched] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {

      const email = session.data.user?.email

      if (email) {
        fetch(`/api/profile?email=${email}`).then((response) => {
          response.json().then((data) => {
            setUser(data);
            setIsAdmin(data.isAdmin);
            setProfileFetched(true);
          });
        });
      }
    }
  }, [session, status]);

  if (status === "loading" || !profileFetched || !user) {
    return "Carregando seus dados ...";
  }

  const userData = session.data?.user;

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-xl mx-auto">
        <UserForm user={user} />
      </div>

      <p className="text-center mt-4 text-2xl">
        https://youtu.be/nGoSP3MBV2E?t=30796
      </p>
    </section>
  );
}

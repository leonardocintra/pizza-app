"use client";

import { useSession } from "next-auth/react";
import PageTitle from "../components/layout/PageTitle";
import { redirect } from "next/navigation";

export default function ProfilePage() {

  const session = useSession();
  const { status } = session;

  if (status === "loading") {
    return "Carregendo seus dados ...";
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="mt-8">
      <PageTitle title="Minha conta" />

      // https://youtu.be/nGoSP3MBV2E?t=10478

    </section>

  )
}
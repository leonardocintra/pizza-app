"use client";

import { useSession } from "next-auth/react";
import PageTitle from "../components/layout/PageTitle";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {

  const session = useSession();
  const { status } = session;

  if (status === "loading") {
    return "Carregendo seus dados ...";
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const userImage = session.data?.user?.image as string;

  return (
    <section className="mt-8">
      <PageTitle title="Minha conta" />

      <form className="max-w-xs mx-auto border">
        <div>
          <Image src={userImage} width={64} height={64} alt="User image" />
        </div>
      </form>

      <p>

        Parei em https://youtu.be/nGoSP3MBV2E?t=10728
      </p>


    </section>

  )
}
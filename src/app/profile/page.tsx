"use client";

import { useSession } from "next-auth/react";
import PageTitle from "../components/layout/PageTitle";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();

  const { status } = session;
  const [saved, setSaved] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  // TODO: em vez de toda vez fazer request no S3 ver opcao de colocar um loading ate a imagem aparecer
  const [userImagem, setUserImagem] = useState<string>("https://leonardo-pizzaapp.s3.sa-east-1.amazonaws.com/sem-foto-pizzaapp.png");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user?.name || "");
      setEmail(session.data.user?.email || "");
      setUserImagem(session.data.user?.image || "");

    }
  }, [session, status])

  async function handleFileChange(ev: any) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData;
      data.set('file', files[0]);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });

      const linkImagem = await response.json();
      setUserImagem(linkImagem);


    }
  }

  async function handleProfileSubmit(ev: any) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);

    const response = await fetch("/api/profile", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
        email: email,
        image: userImagem,
      }),
    })

    setIsSaving(false);

    if (response.ok) {
      setSaved(true);
    }
  }

  if (status === "loading") {
    return "Carregendo seus dados ...";
  }


  if (status === "unauthenticated") {
    redirect("/login");
  }

  const user = session.data?.user;

  return (
    <section className="mt-8">
      <PageTitle title="Minha conta" />


      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center bg-green-200 p-4 rounded-lg border-4 border-green-400 text-green-800">Perfil salvo com sucesso!</h2>
        )}

        {isSaving && (
          <h2 className="text-center bg-blue-200 p-4 rounded-lg border-4 border-blue-400 text-blue-800">Salvando seus dados ...</h2>
        )}

        <div className="flex gap-4 items-center">
          <div>
            <div className=" p-2 rounded-lg relative max-w-[120px]">

              <Image priority={false} className="rounded-lg w-full h-full mb-1" src={userImagem} alt="User image" width={250} height={250} />

              <label>
                <input type="file" name="photo" id="photo" className="hidden" onChange={handleFileChange} />
                <span className="block text-center border border-gray-500 text-sm rounded-lg p-1 cursor-pointer">Editar</span>
              </label>
            </div>
          </div>
          <form onSubmit={handleProfileSubmit} className="grow">
            <input type="text" name="name" id="name" placeholder="Nome completo" value={userName} onChange={(ev) => setUserName(ev.target.value)} />

            <input type="email" name="email" id="email" placeholder="Email" disabled={true} defaultValue={user?.email || ""} />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>

      <p>
        Parei em https://youtu.be/nGoSP3MBV2E?t=14892
      </p>


    </section>

  )
}
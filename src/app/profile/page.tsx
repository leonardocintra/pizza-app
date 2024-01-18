"use client";

import { useSession } from "next-auth/react";
import UserTabs from "../components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditableImage from "../components/layout/EditableImage";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;

  if (status === "unauthenticated") {
    toast.error("Usuario sem acesso!");
    redirect("/login");
  }

  const [userName, setUserName] = useState<string>("");
  // TODO: em vez de toda vez fazer request no S3 ver opcao de colocar um loading ate a imagem aparecer
  const [userImagem, setUserImagem] = useState<string>(
    "https://leonardo-pizzaapp.s3.sa-east-1.amazonaws.com/sem-foto-pizzaapp.png"
  );
  const [email, setEmail] = useState<string>("");
  const [disableViaCep, setDisableViaCep] = useState<boolean>(false);
  const [disableEnderecoViaCep, setDisableEnderecoViaCep] =
    useState<boolean>(false);

  const [cep, setCep] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [numero, setNumero] = useState<number>(0);
  const [telefone, setTelefone] = useState<number>(0);
  const [complemento, setComplemento] = useState<string>("CASA");
  const [referencia, setReferencia] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [profileFetched, setProfileFetched] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user?.name || "");
      setEmail(session.data.user?.email || "");
      setUserImagem(session.data.user?.image || "");

      if (email) {
        fetch(`/api/profile?email=${email}`).then((response) => {
          response.json().then((data) => {
            setCep(data.cep);
            setEndereco(data.endereco);
            setBairro(data.bairro);
            setCidade(data.cidade);
            setEstado(data.uf);
            setNumero(data.numero);
            setTelefone(data.telefone);
            setComplemento(data.complemento);
            setReferencia(data.referencia);
            setIsAdmin(data.isAdmin);
            setProfileFetched(true);
          });
        });
      }
    }
  }, [email, session, status]);

  async function handleProfileSubmit(ev: any) {
    ev.preventDefault();

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: email,
          image: userImagem,
          cep,
          endereco,
          bairro,
          cidade,
          uf: estado,
          numero,
          complemento,
          referencia,
          telefone,
        }),
      });

      response.ok ? resolve() : reject();
    });

    await toast.promise(savingPromise, {
      error: "Erro ao salvar perfil ...",
      success: "Perfil salvo com sucesso!",
      loading: "Salvando perfil...",
    });
  }

  async function handleCEP(cep: string) {
    if (cep.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.ok) {
        const viaCep = await response.json();
        if (viaCep.erro) {
          toast.error("CEP inválido!");
        } else {
          setDisableEnderecoViaCep(false);
          if (viaCep.logradouro !== "") {
            setDisableEnderecoViaCep(true);
          }
          setDisableViaCep(true);
          setEndereco(viaCep.logradouro);
          setBairro(viaCep.bairro);
          setCidade(viaCep.localidade);
          setEstado(viaCep.uf);
          setComplemento(viaCep.complemento);
        }
      }
    }
    setCep(cep);
  }

  if (status === "loading" || !profileFetched) {
    return "Carregando seus dados ...";
  }

  const user = session.data?.user;

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-xl mx-auto">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              <EditableImage link={userImagem} setImage={setUserImagem} />
            </div>
          </div>
          <form onSubmit={handleProfileSubmit} className="grow">
            <label>Nome completo</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nome completo"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              disabled={true}
              defaultValue={user?.email || ""}
            />

            <label>CEP</label>
            <input
              type="text"
              name="cep"
              id="cep"
              placeholder="CEP ..."
              value={cep}
              onChange={(e) => handleCEP(e.target.value)}
              maxLength={8}
              minLength={8}
            />

            <label>Endereço</label>
            <input
              type="text"
              name="endereco"
              id="endereco"
              placeholder="Endereço ..."
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              disabled={disableEnderecoViaCep}
            />

            <label>Bairro</label>
            <input
              type="text"
              name="bairro"
              id="bairro"
              placeholder="Bairro ..."
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              disabled={disableEnderecoViaCep}
            />

            <div className="flex gap-3 mb-2">
              <div>
                <label>Numero</label>
                <input
                  type="number"
                  name="numero"
                  id="numero"
                  placeholder="Numero ..."
                  value={numero}
                  onChange={(e) => setNumero(parseInt(e.target.value))}
                  style={{ margin: 0 }}
                />
              </div>
              <div>
                <label>UF</label>
                <input
                  type="text"
                  name="uf"
                  id="uf"
                  placeholder="Estado ..."
                  value={estado}
                  onChange={(ev) => setEstado(ev.target.value)}
                  style={{ margin: 0 }}
                  disabled={disableViaCep}
                />
              </div>
            </div>
            <label>Cidade</label>
            <input
              type="text"
              name="cidade"
              id="cidade"
              placeholder="Cidade ..."
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              disabled={disableViaCep}
            />

            <label>Complemento</label>
            <input
              type="text"
              name="complemento"
              id="complemento"
              placeholder="Complemento ..."
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <label>Referencia</label>
            <input
              type="text"
              name="referencia"
              id="referencia"
              placeholder="Referencia ..."
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
            />

            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              id="telefone"
              placeholder="telefone"
              value={telefone}
              onChange={(e) => setTelefone(parseInt(e.target.value))}
            />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>

      <p className="text-center mt-4 text-2xl">
        https://youtu.be/nGoSP3MBV2E?t=30392
      </p>
    </section>
  );
}

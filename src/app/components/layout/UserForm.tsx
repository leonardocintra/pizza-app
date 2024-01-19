import { useState } from "react";
import EditableImage from "./EditableImage";
import { UserDocument } from "@/app/models/User";
import toast from "react-hot-toast";

type UserFormProps = {
  user: UserDocument;
};

export default function UserForm(props: UserFormProps) {

  const [disableViaCep, setDisableViaCep] = useState<boolean>(false);
  const [disableEnderecoViaCep, setDisableEnderecoViaCep] =
    useState<boolean>(false);
  const [cep, setCep] = useState<string>(props.user.cep || "");
  const [endereco, setEndereco] = useState<string>(props.user.endereco || "");
  const [bairro, setBairro] = useState<string>(props.user.bairro || "");
  const [cidade, setCidade] = useState<string>(props.user.cidade || "");
  const [estado, setEstado] = useState<string>(props.user.uf || "");
  const [numero, setNumero] = useState<string>(props.user.numero || "");
  const [telefone, setTelefone] = useState<number>(props.user.telefone || 0);
  const [complemento, setComplemento] = useState<string>(
    props.user.complemento || ""
  );
  const [referencia, setReferencia] = useState<string>(
    props.user.referencia || ""
  );
  const [userName, setUserName] = useState<string>(props.user.name || "");
  const [userImagem, setUserImagem] = useState<string>(
    props.user.image || "/sem-foto-pizzaapp.png"
  );

  async function handleProfileSubmit(ev: any) {
    ev.preventDefault();

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: props.user.email,
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

  return (
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
          defaultValue={props.user?.email || ""}
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
              type="text"
              name="numero"
              id="numero"
              placeholder="Numero ..."
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              style={{ margin: 0 }}
            />
          </div>
          <div>
            <label>UF</label>
            <input
              type="text"
              name="uf"
              id="uf"
              maxLength={2}
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
  );
}

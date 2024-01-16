import Image from "next/image";
import toast from "react-hot-toast";

type EditableImageProps = {
  link: string;
  setUserImagem: (value: string) => void;
};

export default function EditableImage(props: EditableImageProps) {
  
  async function handleFileChange(ev: any) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadingPromise = new Promise<void>(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (response.ok) {
          const linkImagem = await response.json();
          props.setUserImagem(linkImagem);
          resolve();
        } else {
          reject(response.statusText);
        }
      });

      toast.promise(uploadingPromise, {
        loading: "Carregando imagem...",
        success: "Imagem carregada com sucesso!",
        error: "Não foi possível carregar a imagem!",
      });
    }
  }
  return (
    <div>
      <Image
        priority={false}
        className="rounded-lg w-full h-full mb-1"
        src={props.link}
        alt="User image"
        width={250}
        height={250}
      />

      <label>
        <input
          type="file"
          name="photo"
          id="photo"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="block text-center border border-gray-500 text-sm rounded-lg p-1 cursor-pointer">
          Editar
        </span>
      </label>
    </div>
  );
}

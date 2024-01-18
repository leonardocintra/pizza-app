import { useState } from "react";
import TrashIcon from "../../icons/TrashIcon";

type DeleteButtonProps = {
  label: string;
  onDelete: any;
};

export default function DeleteButton(props: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div className="text-center my-2 text-red-800 font-semibold">
            Confirma exclusão ?
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="hover:bg-green-700 hover:text-green-200 transition-colors items-center"
              onClick={() => {
                setShowConfirm(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="hover:bg-red-700 hover:text-red-200 transition-colors inline-flex"
              type="button"
              onClick={() => {
                setShowConfirm(false);
                props.onDelete();

              }}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-2">
      <button
        type="button"
        className="button"
        onClick={() => setShowConfirm(true)}
      >
        {props.label}

        <TrashIcon classname="w-6 h-6" />
      </button>
    </div>
  );
}

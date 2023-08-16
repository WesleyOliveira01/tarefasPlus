import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FaShare } from "react-icons/fa";

interface Itarefa {
  titulo: string;
  isPublic?: boolean;
}
const Tarefa = ({ titulo, isPublic = false }: Itarefa) => {
  return (
    <section className="max-w-[839px] w-[50%] border-2 border-slate-400 p-4  rounded-md mb:w-[90%] gap-3 flex flex-col">
      {isPublic && (
        <section className="flex items-center gap-2">
          <h1 className="p-1 w-[15%] text-center bg-blue-600 text-slate-200 font-semibold rounded-md">
            PUBLICO
          </h1>
          <button>
            <FaShare size={25} color={"#2563EB"} />
          </button>
        </section>
      )}
      <section className="flex  justify-between">
        <h1 className="text-2xl font-semibold text-slate-500">{titulo}</h1>
        <button>
          <BiTrashAlt color={"#EF4444"} size={25} />
        </button>
      </section>
    </section>
  );
};

export default Tarefa;

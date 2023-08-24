import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import Link from "next/link";
import {db} from "@/services/firebaseConnection"
import {doc,deleteDoc} from "firebase/firestore";
interface Itarefa {
  titulo: string;
  isPublic?: boolean;
  id: string;
}

const Tarefa = ({ titulo, isPublic = false, id }: Itarefa) => {
  const handleShare = async (id:string) => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/task/${id}`) 
    alert("URL copiada com sucesso")
  }

  const handleDelete = async (id:string) => {
    const docRef = doc(db, "tarefas", id )
    await deleteDoc(docRef)
}

  return (
    <section className="max-w-[839px] w-[50%] border-2 border-slate-400 p-3  rounded-md mb:w-[90%] flex flex-col">
      {isPublic && (
        <section className="flex items-center gap-2">
          <h2 className="max-w-[20%] text-center text-blue-600  font-semibold rounded-md">
            PUBLICO
          </h2>
          <button onClick={() => handleDelete(id)}>
            <FaShare size={20} color={"#2563EB"} />
          </button>
        </section>
      )}

      <section className="flex  justify-between">
        {isPublic ? (
          <Link href={`/tarefa/${id}`}>
            <h1 className="text-2xl font-semibold text-slate-500">{titulo}</h1>
          </Link>
        ) : (
          <h1 className="text-2xl font-semibold text-slate-500">{titulo}</h1>
        )}

        <button onClick={() => handleDelete(id)}>
          <BiTrashAlt color={"#EF4444"} size={25} />
        </button>
      </section>
    </section>
  );
};

export default Tarefa;

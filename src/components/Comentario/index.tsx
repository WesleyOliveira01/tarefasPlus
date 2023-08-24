import React from "react";
import { useSession } from 'next-auth/react';
import {RiCloseCircleLine} from "react-icons/ri"

interface Icomentario {
  nome: string;
  email: string;
  id:string
  comentario: string;
  handleDelete(id:string):void
}

const Comentario = ({ nome, email, comentario,id, handleDelete }: Icomentario) => {
  const {data:session} = useSession();

  
  return (
    <section className="p-3 border border-slate-400 rounded-md flex flex-col gap-4">
      <section className="flex justify-between gap-3">
        <div className="flex gap-3">
          <img className="w-[15%] rounded-full" src={session?.user?.image as string} alt="foto de perfil" />
          <div>
            <h2 className="text-slate-700 font-semibold">{nome}</h2>
            <h3 className="text-slate-400 text-sm">{email}</h3>
          </div>
        </div>
        <button onClick={() => handleDelete(id)}><RiCloseCircleLine color={"#EF4444"} size={20} /></button>
      </section>
      <p className="text-slate-700">{comentario}</p>
    </section>
  );
};

export default Comentario;

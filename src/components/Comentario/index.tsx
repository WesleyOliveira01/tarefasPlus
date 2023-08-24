import React from "react";
import { useSession } from 'next-auth/react';

interface Icomentario {
  nome: string;
  email: string;

  comentario: string;
}

const Comentario = ({ nome, email, comentario }: Icomentario) => {
  const {data:session} = useSession();
  return (
    <section className="p-3 border border-slate-400 rounded-md flex flex-col gap-4">
      <section className="flex gap-3">
        <img className="w-[7%] rounded-full" src={session?.user?.image as string} alt="foto de perfil" />
        <div>
          <h2 className="text-slate-700 font-semibold">{nome}</h2>
          <h3 className="text-slate-400 text-sm">{email}</h3>
        </div>
      </section>
      <p className="text-slate-700">{comentario}</p>
    </section>
  );
};

export default Comentario;

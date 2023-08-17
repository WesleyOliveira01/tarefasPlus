import React from "react";
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";
import {FcGoogle} from "react-icons/fc"

const Cabecalho = () => {
  const { data: session } = useSession();
  return (
    <header className="h-[10vh] p-4 flex justify-evenly items-center bg-slate-950">
      <Link href="/">
        <h1 className="cursor-pointer text-3xl font-bold text-slate-200">
          Tarefas<span className="text-red-700 text-3xl font-bold">+</span>
        </h1>
      </Link>
      
        {!session ? (
            <button className="bg-slate-200 text-slate-950 p-3 rounded-md flex items-center gap-2" onClick={() => signIn('google')}>
                Entrar com google <FcGoogle />
            </button>
        ):(
            <section className="flex gap-2 ">
              <button className="border-2 text-slate-200 hover:bg-slate-200 hover:text-slate-950 duration-300 font-semibold max-h-[3.5rem] p-3 rounded-md flex items-center">
                <Link href="dashboard"> Meu painel </Link>
              </button>
              <button onClick={() => signOut()} className=" border-2 text-slate-200 max-h-[3.5rem] p-3 rounded-md flex items-center hover:bg-red-500 hover:border-red-500 duration-300">
                Sair
              </button>
              <section className="flex items-center gap-3 border-2 rounded-md max-h-[3.5rem] p-3 hover:bg-slate-200 hover:text-slate-950 duration-300 mb:border-none">
                <h1 className="text-xl mb:hidden">Olá {session?.user?.name}</h1>
                <img className=" mb:h-[40px] mb:w-[50px] rounded-full h-[30px]" src={session?.user?.image as string} alt="foto de perfil" />
              </section>
            </section>
        )}
      
    </header>

  );
};

export default Cabecalho;

import Head from "next/head";
import Image from "next/image";

import hero from '../../public/hero.png'
import Botao from './../components/Botao/index';
export default function Home() {
  
  return (
    <>
      <Head>
        <title>Tarefas+</title>
      </Head>
      <main className="bg-slate-950 flex flex-col items-center justify-center h-[90vh]">
        <Image src={hero} alt="hero" />
        <section className="flex gap-5 items-center justify-evenly w-[50%] mt-8">
          <Botao>12 comentarios</Botao>
          <Botao>100 publicações</Botao>
        </section>
      </main>
    </>
  );
}

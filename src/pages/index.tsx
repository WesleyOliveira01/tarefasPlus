import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";
import hero from "../../public/hero.png";
import Botao from "./../components/Botao/index";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

interface IhomeProps{
  posts:string[]
  coments:string[]
}

export default function Home({ posts, coments }:IhomeProps) {
  return (
    <>
      <Head>
        <title>Tarefas+</title>
      </Head>
      <main className="bg-slate-950 flex flex-col items-center justify-center h-[90vh]">
        <Image src={hero} alt="hero" />
        <section className="flex gap-5 items-center justify-evenly w-[50%] mt-8">
          <Botao>+{coments} comentarios</Botao>
          <Botao>+{posts} publicações</Botao>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const comentsRef = collection(db, "comentarios");
  const postRef = collection(db, "tarefas");

  const comentSnapshot = await getDocs(comentsRef);
  const postSnapshot = await getDocs(postRef);
  return {
    props: {
      posts: postSnapshot.size || 0,
      coments: comentSnapshot.size || 0,
    },
    revalidate: 60
  };
};

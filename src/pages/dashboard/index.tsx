import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Formulario from "./../../components/Formulario/index";
import Tarefa from './../../components/Tarefa/index';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Tarefas+ | Dashboard</title>
      </Head>
      <main
        className="h-[90vh] bg-slate-200 text-slate-950 flex flex-col items-center
    "
      >
        <Formulario />

        <section className="text-slate-950 h-full w-full flex flex-col items-center gap-4 p-4">
            <h1 className="text-3xl font-semibold">Minhas tarefas</h1>

            <Tarefa isPublic titulo="estudar java" />
        </section>
      </main>
    </>
  );
};

export default Dashboard;

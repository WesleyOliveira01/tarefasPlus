import React, { useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { doc } from "firebase/firestore";
import { db } from "services/firebaseConnection";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id: string = params?.id as string;
  const docRef = doc(db, "tarefas", id);
  return {
    props: {
      id,
    },
  };
};

const Task = ({ id }) => {
  return (
    <>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>
      <main>
        <h1 className="text-slate-950">tarefa</h1>
      </main>
    </>
  );
};

export default Task;

// untils
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { db } from "@/services/firebaseConnection";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot
} from "firebase/firestore";
// components
import Head from "next/head";
import Formulario from "./../../components/Formulario/index";
import Tarefa from "./../../components/Tarefa/index";
//interface
import { Itarefa } from "../../interface/Itarefa";

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
    props: {
      user: { email: session?.user?.email },
    },
  };
};

interface IdashboardProps {
  user: {
    email: string;
  };
}

const Dashboard = ({ user }: IdashboardProps) => {
  const [input, setInput] = useState("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [tarefas, setTarefas] = useState<Itarefa[]>([]);

  

  useEffect(() => {
    const loadTarefas = async () => {
      const tarefasRef = collection(db, "tarefas");
      const q = query(
        tarefasRef,
        orderBy("created", "desc"),
        where("user", "==", user?.email)
      );

      onSnapshot(q, (snapshot) => {
        let lista: Itarefa[] = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            created: doc.data().created,
            tarefa: doc.data().tarefa,
            public: doc.data().public,
            user: doc.data().user,
          });
        });
        setTarefas(lista)
      });
    };

    loadTarefas();
  }, [user?.email]);
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    }
    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        created: new Date(),
        user: user?.email,
        public: isPublic,
      });
    } catch (e) {
      console.log("error: " + e);
    }


    setInput("");
    setIsPublic(false);
  };
  return (
    <>
      <Head>
        <title>Tarefas+ | Dashboard</title>
      </Head>
      <main
        className="text-slate-950 flex flex-col items-center
    "
      >
        <Formulario
          input={input}
          setInput={setInput}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          onSubmitForm={onSubmitForm}
        />

        <section className="text-slate-950 h-full w-full flex flex-col items-center gap-4 p-4">
          <h1 className="text-3xl font-semibold">Minhas tarefas</h1>

          {tarefas.map(({id,tarefa,public:publico}) => <Tarefa key={id} titulo={tarefa} isPublic={publico} id={id} />)}

        </section>
      </main>
    </>
  );
};

export default Dashboard;

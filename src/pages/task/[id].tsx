import React, { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { db } from "@/services/firebaseConnection";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  where,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import TextArea from "./../../components/TextArea/index";
import { useSession } from "next-auth/react";
import Comentario from "./../../components/Comentario";
export interface Icomentario {
  id: string;
  taskId: string;
  nome: string;
  email: string;
  comentario: string;
}

interface Itarefa {
  tarefa: {
    id: string;
    titulo: string;
    usuario: string;
    data: string;
  };
  comentarios: Icomentario[];
}

const Task = ({ tarefa, comentarios }: Itarefa) => {
  const { data: session } = useSession();
  const [comentario, setComentario] = useState<string>("");
  const [todosComentarios, setTodosComentarios] = useState<Icomentario[]>(
    comentarios || []
  );

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, "comentarios", id);
      await deleteDoc(docRef);

      const deleteComments = todosComentarios.filter(
        (comentario) => comentario.id !== id
      );
      setTodosComentarios(deleteComments);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (comentario.trim() == "") {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "comentarios"), {
        comentario: comentario,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: tarefa.id,
      });
      setComentario("");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>
      <main className="w-full p-5 flex flex-col items-center justify-center gap-3 ">
        <section className="bg-slate-200 w-[50%] p-4 rounded-md flex flex-col gap-3 border-slate-400 border">
          <div className="flex justify-between">
            <h2 className="text-slate-400 font-semibold">{tarefa.usuario}</h2>
            <h2 className="text-slate-400">Data de criação: {tarefa.data}</h2>
          </div>
          <h1 className="text-slate-950 font-semibold text-xl  p-2 rounded-md">
            {tarefa.titulo}
          </h1>
        </section>

        {session && (
          <section className="w-[50%] flex flex-col justify-center ">
            <h2 className="text-slate-950 text-xl font-semibold">
              Deixar comentario
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <TextArea
                placeholder="seu comentario..."
                rows={7}
                value={comentario}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setComentario(e.target.value)
                }
              />

              <button className="bg-blue-500 w-full p-2 rounded-md font-semibold">
                enviar comentario
              </button>
            </form>
          </section>
        )}

        <section className="w-[50%] flex flex-col justify-center ">
          <h2 className="text-slate-950 text-xl font-semibold mb-3">
            Comentarios
          </h2>

          <div className="flex flex-col gap-4">
            {todosComentarios.length === 0 ? (
              <span>Nenhum comentario encontrado</span>
            ) : (
              todosComentarios.map(({ comentario, nome, email, id }) => (
                <Comentario
                  key={id}
                  comentario={comentario}
                  id={id}
                  nome={nome}
                  email={email}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id: string = params?.id as string;
  const docRef = doc(db, "tarefas", id);
  const snapshot = await getDoc(docRef);
  const comentsRef = collection(db, "comentarios");

  const q = query(comentsRef, where("taskId", "==", id));

  const comentsSnapshot = await getDocs(q);

  let lista: Icomentario[] = [];

  comentsSnapshot.forEach((doc) => {
    lista.push({
      id: doc.id,
      taskId: doc.data().taskId,
      comentario: doc.data().comentario,
      nome: doc.data().name,
      email: doc.data().user,
    });
  });
  console.log(lista);

  if (snapshot.data() == undefined || !snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const miliseconds = snapshot.data()?.created?.seconds * 1000;
  return {
    props: {
      tarefa: {
        id: snapshot.id,
        titulo: snapshot.data()?.tarefa,
        usuario: snapshot.data()?.user,
        data: new Date(miliseconds).toLocaleDateString(),
      },
      comentarios: lista,
    },
  };
};

export default Task;

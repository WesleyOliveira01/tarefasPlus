import React, { useState } from "react";
import TextArea from "../TextArea";
import { Itarefa } from "../../interface/Itarefa";
const { v4: uuidv4 } = require("uuid");

const Formulario = () => {
  const [input, setInput] = useState("");
  const [tarefas, setTarefas] = useState<Itarefa[]>([]);
  const id: string = uuidv4();

  console.log(id);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onSubmitForm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (input.trim() === "") {
      return;
    }
    const novaTarefa: Itarefa = { id: id, tarefa: input };
    setTarefas([...tarefas, novaTarefa]);
    setInput("");
  };
  return (
    <form
      action=""
      onSubmit={(e) => e.preventDefault()}
      className="bg-slate-950 w-full p-4 flex justify-center"
    >
      <section className="mb:w-[90%] lg:w-[50%]">
        <h1 className="text-slate-200 font-bold text-4xl text-left mb:text-center my-4">
          Qual sua tarefa?
        </h1>

        <TextArea
          placeholder="Digite sua tarefa..."
          name="tarefa"
          id="tarefa"
          rows={10}
          value={input}
          onChange={handleChange}
        />

        <section className="flex items-center gap-3 mt-4">
          <input
            className="w-[25px] h-[25px] my-[14px] mx-0"
            type="checkbox"
            name="tarefaPublica"
            id="tarefaPublica"
          />
          <label
            className="font-semibold text-slate-200 text-xl"
            htmlFor="tarefaPublica"
          >
            Deixar tarefa publica
          </label>
        </section>
        <button className="bg-blue-600 p-3 rounded-md text-slate-200 font-semibold w-full my-4">
          Registrar
        </button>
      </section>
    </form>
  );
};

export default Formulario;

import React, { useState } from "react";
import { useFormik } from "formik";

import Button from "@/components/Button";
import Input from "@/components/Input";

import { useNavigate } from "react-router-dom";
import { useData } from "@/hooks/useData";

export type HomeFormValues = {
  client: string;
};

const Home: React.FC = () => {
  const [selectedClientLocal, setSelectedClientLocal] = useState<string>("");
  const { clients, setSelectedClient } = useData();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      client: "",
    },
    onSubmit: (values) => {
      setSelectedClient(values.client);
      navigate("/dashboard");
    },
  });

  return (
    <main className="w-[100vw] h-[100vh] flex items-center">
      <section className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-5 justify-center items-center">
          <span className="text-8xl font-bold italic text-blue-500">LUMI</span>
          <h1 className="text-2xl md:text-5xl">Olá, é bom ter você aqui!</h1>
          <p className="text-md">Para começar escolha um cliente:</p>
          <form
            className="flex flex-col items-center gap-2"
            onSubmit={formik.handleSubmit}
          >
            <Input
              id="client"
              placeholder="Selecione um cliente"
              type="select"
              options={[
                { text: "Selecione um cliente", value: "", selected: true },
                ...(clients
                  ? clients.map((clientAPI) => ({
                      text: clientAPI.clientCode,
                      value: clientAPI.id.toString(),
                    }))
                  : []),
              ]}
              selectCallback={setSelectedClientLocal}
              formik={formik}
            />
            <Button
              onClick={formik.handleSubmit}
              disabled={selectedClientLocal === ""}
            >
              Continuar
            </Button>
          </form>
        </div>
        <div className="mt-20 w-full">
          <span className="block italic text-center">
            Não se preocupe, você poderá trocar o cliente a qualquer momento.
          </span>
        </div>
      </section>
    </main>
  );
};

export default Home;

import Button from "@/components/Button";
import EmptyDataMessage from "@/components/EmptyDataMessage";
import Input from "@/components/Input";
import { useData } from "@/hooks/useData";
import { PathData, getInvoicesPathsByClient } from "@/services/Invoices";
import { Colors } from "@/styles/colors";
import { convertFileNameToMonthYear } from "@/utils/dates";
import { FilePdf, User } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

const InvoicesLibrary: React.FC = () => {
  const [invoicesPaths, setInvoicesPaths] = useState<PathData>({} as PathData);
  const { clients, selectedClient, setSelectedClient } = useData();

  useEffect(() => {
    async function refreshInvoicePaths() {
      const { success, data } = await getInvoicesPathsByClient(selectedClient);

      if (success && data) {
        setInvoicesPaths(data);
      }
    }

    refreshInvoicePaths();
  }, [selectedClient]);

  function handleOpenFile(installation: string, filename: string) {
    window.open(
      `${invoicesPaths.baseURL}/${installation}/${filename}`,
      "_blank",
    );
  }

  return (
    <section className="w-full h-auto py-6 px-6 md:py-10 md:px-20 flex flex-col gap-4">
      <div className="w-full h-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl">Biblioteca de Faturas</h1>
        <div className="flex gap-4 items-center">
          <User size={30} />
          <Input
            id="client"
            placeholder="Selecione um cliente"
            type="select"
            options={[
              {
                text: "Selecione um cliente",
                value: "",
                selected: selectedClient === "",
              },
              ...(clients
                ? clients.map((clientAPI) => ({
                    text: clientAPI.clientCode,
                    value: clientAPI.id.toString(),
                    selected: selectedClient === clientAPI.id.toString(),
                  }))
                : []),
            ]}
            selectCallback={setSelectedClient}
          />
        </div>
      </div>
      <div className="w-full mt-10 md:mt-0">
        {invoicesPaths?.data?.length > 0 &&
          selectedClient !== "" &&
          invoicesPaths.data.map((invoice) => (
            <div
              className="flex flex-col gap-4 pt-8"
              key={invoice.installation}
            >
              <h3 className="text-lg font-medium text-center md:text-left">
                Instalação: {invoice.installation}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-32 gap-y-8 self-center">
                {invoice?.files?.length > 0 &&
                  invoice.files.map((file) => (
                    <div
                      className="w-60 h-48 bg-slate-50 rounded shadow-md border-slate-100 border-[1px] flex flex-col items-center p-4 gap-2"
                      key={file}
                    >
                      <FilePdf size={100} color={Colors.primary} />
                      <p>{convertFileNameToMonthYear(file)}</p>
                      <Button
                        onClick={() =>
                          handleOpenFile(invoice.installation, file)
                        }
                      >
                        Baixe agora
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        {(!invoicesPaths?.data ||
          invoicesPaths?.data?.length === 0 ||
          selectedClient === "") && <EmptyDataMessage />}
      </div>
    </section>
  );
};

export default InvoicesLibrary;

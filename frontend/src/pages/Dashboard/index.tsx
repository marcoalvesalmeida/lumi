import BarChartKwh, { KwhData } from '@/components/ChartBarKwh';
import BarChartMoney, { MoneyData } from '@/components/ChartBarMoney';
import EmptyDataMessage from '@/components/EmptyDataMessage';
import Input from '@/components/Input';
import { useData } from '@/hooks/useData';
import { getInvoicesByClient } from '@/services/Invoices';
import { User } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
    const [kwhData, setKwhData] = useState<KwhData[]>([] as KwhData[]);
    const [moneyData, setMoneyData] = useState<MoneyData[]>([] as MoneyData[]);
    const {clients, selectedClient, setSelectedClient} = useData();

    async function getInvoices(clientID: string) {
        const {success, invoices } = await getInvoicesByClient(clientID);

          if (success && invoices) {
            setKwhData(
                invoices.map(invoice => ({
                    kwh: invoice.kwhCount + invoice.sceeKwh,
                    kwhGD: invoice.gdKwh,
                    month: invoice.monthRef
                }))
            );
            setMoneyData(
                invoices.map(invoice => ({
                    cost: parseFloat(invoice.price) + parseFloat(invoice.sceePrice) + parseFloat(invoice.publicContrib),
                    economy: Math.abs(parseFloat(invoice.gdPrice)),
                    month: invoice.monthRef
                }))
            );
        }
    }

    useEffect(() => {
        if(selectedClient !== ''){
            getInvoices(selectedClient);
        }
    }, [selectedClient]);
    

    return (
        <section className='w-full h-auto py-10 px-20'>
            <div className='w-full h-10 flex justify-between items-center'>
                <h1 className='text-2xl'>Dashboard</h1>
                <div className='flex gap-4 items-center'>
                    <User size={30} />
                    <Input 
                        id='client' 
                        placeholder='Selecione um cliente' 
                        type='select' 
                        options={
                            [
                                { text: 'Selecione um cliente', value: '', selected: selectedClient === '' },
                                ...(clients ? clients.map((clientAPI) => ({
                                    text: clientAPI.clientCode,
                                    value: clientAPI.id.toString(),
                                    selected: selectedClient === clientAPI.id.toString()
                                })) : [])
                            ]
                        } 
                        selectCallback={setSelectedClient}
                    />
                </div>
            </div>
            <div className='flex flex-col pt-10'>
                {kwhData.length > 0 && moneyData.length > 0 && selectedClient !== '' && (
                    <>
                        <div className='w-full h-80 flex flex-col items-center'>
                            <h2>Consumo de Energia Elétrica x Energia Compensada por Mês (kWh)</h2>
                            <BarChartKwh data={kwhData} />
                        </div>
                        <div className='w-full h-80 mt-20 flex flex-col items-center'>
                            <h2>Valor Total sem GD x Economia GD por Mês (R$)</h2>
                            <BarChartMoney data={moneyData}/>
                        </div>
                    </>
                )}
                {(!kwhData || kwhData.length === 0 || !moneyData || moneyData.length === 0 || selectedClient === '') && (
                    <EmptyDataMessage />
                )}
            </div>
        </section>
    );
};

export default Dashboard;
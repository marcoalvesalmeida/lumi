import BarChartKwh, { KwhData } from '@/components/ChartBarKwh';
import BarChartMoney, { MoneyData } from '@/components/ChartBarMoney';
import Input from '@/components/Input';
import { useData } from '@/hooks/useData';
import { getInvoicesByClient } from '@/services/Invoices';
import { User } from '@phosphor-icons/react';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [kwhData, setKwhData] = useState<KwhData[]>([] as KwhData[]);
    const [moneyData, setMoneyData] = useState<MoneyData[]>([] as MoneyData[]);
    const {clients, selectedClient} = useData();

    const location = useLocation();

    async function getInvoices(clientID: string) {
        console.log(clientID);
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
        if(location.state?.client){
            getInvoices(location.state.client);
        }
    }, [location.state?.client]);
    
    const formik = useFormik({
    initialValues: {
        client: '',
    },
    onSubmit: async (values) => {
        if(!values.client || values.client === ''){
            return;
        }
        await getInvoices(values.client);
    },
    });

    function handleSelectCallback(){
        formik.handleSubmit();
    }
    

    return (
        <section className='w-full h-auto py-10 px-20'>
            <div className='w-full h-10 flex justify-between items-center'>
                <h1 className='text-2xl'>Dashboard</h1>
                <form className='flex gap-4 items-center' onSubmit={formik.handleSubmit}>
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
                        selectCallback={() => handleSelectCallback()}
                        formik={formik}
                    />
                </form>
            </div>
            <div className='flex flex-col pt-10'>
                <div className='w-full h-80 flex flex-col items-center'>
                    <h2>Consumo de Energia Elétrica x Energia Compensada por Mês (kWh)</h2>
                    <BarChartKwh data={kwhData} />
                </div>
                <div className='w-full h-80 mt-20 flex flex-col items-center'>
                    <h2>Valor Total sem GD x Economia GD por Mês (R$)</h2>
                    <BarChartMoney data={moneyData}/>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
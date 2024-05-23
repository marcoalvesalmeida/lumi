import BarChartKwh from '@/components/ChartBarKwh';
import Input from '@/components/Input';
import { User } from '@phosphor-icons/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

const Dashboard: React.FC = () => {
    const [selectedClient, setSelectedClient] = useState<string>('');
    const [searchparams] = useSearchParams();
    const client = searchparams.get('client') || 'No client specified';

    const validationSchema = Yup.object().shape({
        client: Yup.string().required('É obrigatório selecionar um cliente!'),
      });
    
      const formik = useFormik({
        initialValues: {
          client: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
          console.log(values);
        },
      });
    

    return (
        <section className='w-full h-auto py-10 px-20'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-2xl'>Dashboard</h1>
                <div className='flex gap-4 items-center'>
                    <User size={30} />
                    <Input 
                        id='client' 
                        placeholder='Selecione um cliente' 
                        type='select' 
                        options={
                            [
                                {text: 'Selecione um cliente', value: '', selected: !client || client === ''},
                                {text: 'Cliente 1', value: 'cliente', selected: client === 'cliente'}
                            ]
                        } 
                        selectCallback={setSelectedClient}
                        formik={formik}
                    />
                </div>
            </div>
            <div className='flex flex-col pt-10'>
                <div className='w-full h-80 flex flex-col items-center'>
                    <h2>Consumo e Geração Distribuída de Energia por Mês</h2>
                    <BarChartKwh data={
                        [
                            { kwh: 100, kwhGD: 20, month: 'JAN/2023' },
                            { kwh: 500, kwhGD: 600, month: 'FEV/2023' },
                            { kwh: 500, kwhGD: 100, month: 'MAR/2023' }
                        ]
                    } />
                </div>
                <div className='w-full h-80 mt-20 flex flex-col items-center'>
                    <h2>Consumo e Geração Distribuída de Energia por Mês</h2>
                    <BarChartKwh data={
                        [
                            { kwh: 100, kwhGD: 20, month: 'JAN/2023' },
                            { kwh: 500, kwhGD: 600, month: 'FEV/2023' },
                            { kwh: 500, kwhGD: 100, month: 'MAR/2023' }
                        ]
                    } />
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
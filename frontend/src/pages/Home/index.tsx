import React, { useState } from 'react';
import { useFormik } from 'formik';

import Button from '@/components/Button';
import Input from '@/components/Input';

import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export type HomeFormValues = {
  client: string
}

const Home: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<string>('');

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    client: Yup.string().required('É obrigatório selecionar um cliente!'),
  });

  const formik = useFormik({
    initialValues: {
      client: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      navigate(`/dashboard?client=${values.client}`);
    },
  });

  return (
    <main className='w-[100vw] h-[100vh] flex items-center'>
        <section className='w-full flex flex-col justify-center items-center'>
          <div className='flex flex-col gap-5 justify-center items-center'>
            <span className='text-9xl font-bold italic text-blue-500'>LUMI</span>
            <h1>Olá, é bom ter você aqui!</h1>
            <p>Para começar escolha um cliente:</p>
            <form className='flex flex-col items-center gap-2' onSubmit={formik.handleSubmit}>
              <Input 
                id='client' 
                placeholder='Selecione um cliente' 
                type='select' 
                options={
                  [
                    {text: 'Selecione um cliente', value: '', selected: true},
                    {text: 'Cliente 1', value: 'cliente'}
                  ]
                } 
                selectCallback={setSelectedClient}
                formik={formik}
              />
              <Button onClick={formik.handleSubmit} disabled={selectedClient === ''}>
                Continuar
              </Button>
            </form>
          </div>
            <div className='mt-20'>
              <span>
                Não se preocupe, você poderá trocar a qualquer momento clicando
                no seguinte menu: 
              </span>
            </div>
        </section>
    </main>
  );
};

export default Home;
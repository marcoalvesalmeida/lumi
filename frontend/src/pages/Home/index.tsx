import Button from '@/components/Button';
import Input from '@/components/Input';
import React, { useState } from 'react';

import Logo from '@/assets/logo.png';

const Home: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<string>('');

  return (
    <main className='w-[100vw]'>
        <section className='w-full flex flex-col justify-center items-center'>
          <div className='flex flex-col gap-5 justify-center items-center'>
            <img src={Logo} />
            <h1>Olá, é bom ter você aqui!</h1>
            <p>Para começar escolha um cliente:</p>
            <form className='flex flex-col items-center gap-2'>
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
              />
              <Button onClick={() => alert("ok")} disabled={selectedClient === ''}>
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
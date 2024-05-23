import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ChartLine, FilePdf } from '@phosphor-icons/react';

const DefaultLayout: React.FC = () => {
  return (
    <div className='w-[100vw] flex flex-col justify-start'>
        <header className='flex w-full justify-between items-center border-b-1 border-solid border-zinc-500 bg-white py-2 shadow-lg p-20'>
          
          <span className='text-5xl font-bold italic text-blue-500'>LUMI</span>

          <nav>
            <ul className='flex gap-10'>
              <Link to={'/dashboard'}>
                <li className='text-blue-500 hover:text-blue-500 flex gap-2 items-center'>
                  <ChartLine size={20} weight='bold' /> 
                  Dashboard
                </li>
              </Link>
              <Link to={'/invoices'}>
                <li className='hover:text-blue-500 flex gap-2 items-center'>
                  <FilePdf size={20} weight='bold' />
                  Biblioteca de Faturas
                </li>
              </Link>
            </ul>
          </nav>
        </header>
        <main>
            <Outlet />
        </main>
    </div>
  );
};

export default DefaultLayout;
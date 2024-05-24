import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ChartLine, FilePdf } from '@phosphor-icons/react';
import clsx from 'clsx';

const DefaultLayout: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className='w-[100vw] flex flex-col justify-start'>
      <header className='flex w-full justify-between items-center border-b-1 border-solid border-zinc-500 bg-white py-2 shadow-lg p-20'>
        <Link to={'/'}>
          <span className='text-5xl font-bold italic text-blue-500'>LUMI</span>
        </Link>

        <nav>
          <ul className='flex gap-10'>
            <li>
              <Link to='/dashboard' className={clsx('flex gap-2 items-center', { 'text-blue-500': pathname === '/dashboard', 'hover:text-blue-500': pathname !== '/dashboard' })}>
                <ChartLine size={20} weight='bold' />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to='/invoices-library' className={clsx('flex gap-2 items-center', { 'text-blue-500': pathname === '/invoices-library', 'hover:text-blue-500': pathname !== '/invoices' })}>
                <FilePdf size={20} weight='bold' />
                Biblioteca de Faturas
              </Link>
            </li>
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

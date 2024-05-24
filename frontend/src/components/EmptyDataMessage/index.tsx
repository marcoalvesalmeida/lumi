import { User } from '@phosphor-icons/react';
import React from 'react';

const EmptyDataMessage: React.FC = () => {
  return (
    <div className='w-full h-[50vh] flex flex-col items-center justify-center'>
        <User size={30} />
        <p>Selecione um cliente para visualizar os dados.</p>
    </div>
  );
};

export default EmptyDataMessage;
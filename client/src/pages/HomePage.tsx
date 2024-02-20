import React, { useContext } from 'react';

import { FileContext } from '@/context';
import { FileUploader } from '../components';
import BankSlipList from '@/components/BankSlipList';

const HomePage:React.FC = () => {
    const fileContext = useContext(FileContext);
    return (
        <div className='h-screen w-screen bg-zinc-800 text-white gap-6 flex flex-1 flex-col items-center pt-20 overflow-x-hidden'>
            <div className="h-72">
            <FileUploader file={fileContext.state?.file}/>
            </div>
            <div className="" >
                <h2>Bank Slip List</h2>
                <BankSlipList />
            </div>
        </div>
        
    );
};

export default HomePage;
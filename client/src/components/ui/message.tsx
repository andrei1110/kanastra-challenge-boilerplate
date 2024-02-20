import React, { useContext } from 'react';

import { SnackBar } from './snackbar';
import { MessageContext } from '@/context';

export const Message:React.FC = () => {
    const { state } = useContext(MessageContext);
    const type =  state.error ? 'error' : 'success';
    return state.message ? (
        <SnackBar message={state.message} type={type} />
    ) : (
        <></>
    );
};
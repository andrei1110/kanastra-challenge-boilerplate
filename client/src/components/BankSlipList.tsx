import React, { useEffect, useContext } from 'react';

import { getBankSlip as getBankSlipClient } from '@/services';
import { BankSlipContext } from '@/context';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption } from '@/components/ui';
import { BankSlipActionType } from '@/types';

const BankSlipList:React.FC = () => {
    const { state, dispatch } = useContext(BankSlipContext);

    const getBankSlip = async () => {
        const response = await getBankSlipClient(state.page, state.limit);
        dispatch({type: 'insertData' as BankSlipActionType.insertData, payload: {data: response}});
        dispatch({type: 'reloadList' as BankSlipActionType.changePage, payload: {reload: false}});
    };

    const handlePage = (event:React.MouseEvent<HTMLButtonElement>) => {
        if(event.currentTarget.getAttribute('data-decrement') && state.page === 0){
            return;
        } 
        dispatch({
            type: 'changePage' as BankSlipActionType.changePage, 
            payload: {
                page: event.currentTarget.getAttribute('data-increment') ? (state.page + 1) : (state.page - 1) 
            }
        });
        dispatch({type: 'reloadList' as BankSlipActionType.changePage, payload: {reload: true}});
    }

    useEffect(() => {
        if(state.reload) {
            getBankSlip();
        }
    }, [state.reload]);

    return (<>
            { state.data && (
                <Table key="tableBankSlip">
                    <TableCaption key="tcaption">
                        Bank slips
                    </TableCaption>
                    <TableHeader key="theader">
                        <TableRow key="theaderrow">
                            <TableHead key="tablename">
                                Name
                            </TableHead>
                            <TableHead key="tablegid">
                                Document number
                            </TableHead>
                            <TableHead key="tableemail">
                                E-mail
                            </TableHead>
                            <TableHead key="tableamount">
                                Amount
                            </TableHead>
                            <TableHead key="duedate">
                                Due Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { state.data.map (item => {
                            return( 
                                <TableRow key={item.debtID}>
                                    <TableCell key={`${item.debtID}-name`}>
                                        {item.name}
                                    </TableCell>
                                    <TableCell key={`${item.debtID}-gid`}>
                                        {item.governmentId}
                                    </TableCell>
                                    <TableCell key={`${item.debtID}-email`}>
                                        {item.email}
                                    </TableCell>
                                    <TableCell key={`${item.debtID}-amount`}>
                                        {item.debtAmount}
                                    </TableCell>
                                    <TableCell key={`${item.debtID}-date`}>
                                        {item.debtDueDate}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )
            }
            <div className="text-center">
                <button onClick={handlePage} data-decrement={true} className="mr-2"> {'<'} </button> 
                {state.page + 1} 
                <button className="ml-2" data-increment={true} onClick={handlePage}>{'>'}</button>
            </div>
        </>

    );
};

export default BankSlipList;
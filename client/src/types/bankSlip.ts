import { ReactNode } from "react";
import { ReducerAction } from "./file";

enum BankSlipActionType {
    insertData = 'insertData',
    toggleLoading = 'toggleLoading',
    reloadList = 'reloadList',
    changePage = 'changePage'
}

type BankSlip = {
    name: string;
    governmentId: number;
    email: string;
    debtAmount: number;
    debtDueDate: string;
    debtID: string;
}

type BankSlipContextState = {
  isLoading: boolean;
  data: BankSlip[] | undefined;
  page: number;
  limit: number;
  reload: boolean;
};

type BankSlipAction = ReducerAction<
  BankSlipActionType,
  Partial<BankSlipContextState>
>

type BankSlipDispatch = ({ type, payload }: BankSlipAction) => void;

type BankSlipContextType = {
  state: BankSlipContextState;
  dispatch: BankSlipDispatch;
}

type BankSlipProviderProps = { children: ReactNode };

export type {
  BankSlipActionType,
  ReducerAction,
  BankSlipContextState,
  BankSlipAction,
  BankSlipDispatch,
  BankSlipContextType,
  BankSlipProviderProps,
}

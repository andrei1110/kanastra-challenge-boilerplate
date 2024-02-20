import { createContext, useReducer } from "react";

import { BankSlipContextState, BankSlipAction, BankSlipContextType, BankSlipProviderProps } from "@/types";

const BankSlipContextInitialValues: Partial<BankSlipContextState> = {
  data: undefined,
  page: 0,
  limit: 20,
  isLoading: false,
  reload: true
};

export const BankSlipContext = createContext({} as BankSlipContextType);

const BankSlipReducer = (
  state: BankSlipContextState,
  action: BankSlipAction,
): BankSlipContextState => {
  switch (action.type) {
    case 'insertData':
        return {...state, data: action.payload?.data};
    case 'changePage':
        if ( action.payload?.page || action.payload?.page === 0 ) {
            return { ...state, page: action.payload.page }
        }
        return state;
    case 'reloadList':
        return { ...state, reload: !state.reload }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const BankSlipProvider = ({ children }: BankSlipProviderProps) => {
  const [state, dispatch] = useReducer(
    BankSlipReducer,
    BankSlipContextInitialValues as BankSlipContextState,
  );

  return (
    <BankSlipContext.Provider value={{ state, dispatch }}>
      {children}
    </BankSlipContext.Provider>
  );
};
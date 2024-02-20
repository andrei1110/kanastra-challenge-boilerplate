import { createContext, useReducer } from "react";

import { MessageContextState, MessageAction, MessageContextType, MessageProviderProps } from "@/types";

const MessageContextInitialValues: Partial<MessageContextState> = {
  error: false,
  message: undefined,
};

export const MessageContext = createContext({} as MessageContextType);

const MessageReducer = (
  _state: MessageContextState,
  action: MessageAction,
): MessageContextState => {
  switch (action.type) {
    case 'setMessage':
        return { error: action.payload?.error ? true : false, message: action.payload?.message };
    case 'unsetMessage':
      return {error: false, message: undefined}
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const [state, dispatch] = useReducer(
    MessageReducer,
    MessageContextInitialValues as MessageContextState,
  );

  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};
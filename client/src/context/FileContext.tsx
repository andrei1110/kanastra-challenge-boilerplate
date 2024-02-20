import { createContext, useReducer } from "react";

import { FileContextState, FileAction, FileContextType, FileProviderProps } from "@/types";

const FileContextInitialValues: Partial<FileContextState> = {
  file: null,
  isLoading: false,
};

export const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case 'upload':
      if (state?.file){
        return {...state, isLoading: true};
      } else {
        throw new Error(`No file selected`);
      }
    case 'addFile':
      if(action.payload?.file) {
        return { ...state, file: action.payload.file };
      } else {
        throw new Error('No file selected');
      }
    case 'uploadComplete':
      return { ...state, isLoading:false, file: null }
    case 'setLoading': 
      return {...state, isLoading: false}
    
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState,
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};


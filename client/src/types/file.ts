import { ReactNode } from "react";

enum FileActionType {
  upload = 'upload',
  addFile = 'addFile',
  uploadComplete = 'uploadComplete',
  setLoading = 'setLoading'
}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};


type FileContextState = {
  isLoading: boolean;
  file: File | null;
};

type FileAction = ReducerAction<
  FileActionType,
  Partial<FileContextState>
>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export type {
  FileActionType,
  ReducerAction,
  FileContextState,
  FileAction,
  FileDispatch,
  FileContextType,
  FileProviderProps,
}

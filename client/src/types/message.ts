import { ReactNode } from "react";
import { ReducerAction } from "./file";

enum MessageActionType {
  setMessage = 'setMessage',
  unsetMessage = 'unsetMessage'
}

type MessageContextState = {
  error: boolean;
  message: string | undefined;
};

type MessageAction = ReducerAction<
  MessageActionType,
  Partial<MessageContextState>
>;

type MessageDispatch = ({ type, payload }: MessageAction) => void;

type MessageContextType = {
  state: MessageContextState;
  dispatch: MessageDispatch;
};

type MessageProviderProps = { children: ReactNode };

export type {
  MessageActionType,
  MessageContextState,
  MessageAction,
  MessageDispatch,
  MessageContextType,
  MessageProviderProps,
}

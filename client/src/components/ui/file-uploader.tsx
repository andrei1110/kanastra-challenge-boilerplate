import React, { useContext } from 'react';

import { MessageContext, FileContext, BankSlipContext } from "@/context";
import { MessageActionType, FileActionType, BankSlipActionType } from '@/types';
import { uploadFile } from '@/services';

type FileUploaderProps = {
  file: File | null | undefined;
}
const FileUploader = ({ file }: FileUploaderProps) => {
  const useFileContext = useContext(FileContext);
  const useMessageContext = useContext(MessageContext);
  const useBankSlipContext = useContext(BankSlipContext);

  const handleFile = (event:React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    if(selectedFiles && selectedFiles[0]) {
      useFileContext.dispatch({ 
        type: 'addFile' as FileActionType.addFile, 
        payload: { file: selectedFiles[0] }
      });
    }
    return;
  };

  const handleUpload = async () => {
    useFileContext.dispatch({ type: 'upload' as FileActionType.upload });

    try {
      if (useFileContext.state.file) {
        await uploadFile(useFileContext.state.file);
        useBankSlipContext.dispatch({
          type: 'reloadList' as BankSlipActionType.reloadList, 
          payload: {reload: true}
        });
        useFileContext.dispatch({type: 'uploadComplete' as FileActionType.uploadComplete});
        useMessageContext.dispatch({
          type: 'setMessage' as MessageActionType.setMessage,
          payload: { error: false, message: 'Upload complete.' }
        });
      }
    } catch (e) {
      useMessageContext.dispatch({
        type: 'setMessage' as MessageActionType.setMessage,
        payload: { error: true, message: 'Network error.' }
      });
      useFileContext.dispatch({ type: 'setLoading' as FileActionType.setLoading });
      console.log(e);
    }
    setTimeout(() => 
      useMessageContext.dispatch({type: 'unsetMessage' as MessageActionType.unsetMessage})
    , 7000);
    return;
  }

  return (
    <div className = "flex flex-col gap-6">
      <div className="text-center">
        <label htmlFor="file" className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold">
          Choose a file
        </label>
        <input 
          id="file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" 
          onChange={handleFile}
          className="hidden"
        />
      </div>
      { file && (
        <section>
          <p className="pb-6">File details:</p>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      ) }

      { file && (
        <button 
          className="inline-flex items-center rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold disabled:text-white disabled:bg-green-400 disabled:cursor-not-allowed"
          onClick={handleUpload}
          disabled={useFileContext.state.isLoading}
        >
          { useFileContext.state.isLoading ? (
            <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> 
            Processing...
            </>
          ) : (
            <>Upload the file</>
          ) }
        </button>
      ) }
    </div>
  );
};

export { FileUploader };

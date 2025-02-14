import { Toast } from 'primereact/toast';
import { RefObject } from 'react';

export const toastError = (toastRef:RefObject<Toast>|null,msg:string)=>{
    if(!toastRef){
        throw new Error("toast ref was not provided")
    }
    toastRef.current?.show({
        summary:msg,
        severity:'error',
        closable:true,
    })
}
import { Toast } from 'primereact/toast';

export const toastError = (toastRef:Toast,msg:string)=>{
    toastRef.show({
        summary:msg,
        severity:'error',
        closable:true,



    })
}
import {FC, ReactNode} from "react";
import {PrimeReactProvider} from "primereact/api";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

type Props = {
    children: ReactNode;
}
const queryClient = new QueryClient();

const AppProvider:FC<Props> = ({children})=>{
    return (
        <QueryClientProvider client={queryClient}>
            <PrimeReactProvider>
                {children}
            </PrimeReactProvider>
        </QueryClientProvider>
    )

}
export default AppProvider;
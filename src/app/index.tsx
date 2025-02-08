import {createRoot} from "react-dom/client";
import "./index.css";
import {createClient} from "@supabase/supabase-js";
import AppRouter from "./route.tsx";
import AppProvider from "./provider";

export const supabase = createClient(
    "https://crbqmjtejobqcahbwnyy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyYnFtanRlam9icWNhaGJ3bnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NDgyNjAsImV4cCI6MjA1NDMyNDI2MH0.FSPUyNoFl6FTOpTcDD4nlZnByvOlAbC2MXvNF6LJKT4"
);

createRoot(document.getElementById("root")!).render(
    <AppProvider>
        <AppRouter/>
    </AppProvider>
);

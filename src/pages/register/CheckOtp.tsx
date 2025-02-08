import { useState, useRef } from "react";
import MainLayout from "../../widgets/layout/MainLayout.tsx";
import {supabase} from "../../app";
import ValidationOtp from "../../features/auth/ui/ValidationOtp.tsx";

const CheckOtp = () => {

    return (
        <MainLayout>
            <ValidationOtp/>
        </MainLayout>
    );
};

export default CheckOtp;

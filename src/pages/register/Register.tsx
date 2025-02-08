import MainLayout from "../../layout/MainLayout.tsx";
import EmailLoginForm from "../../features/auth/ui";

function Register() {
    return (
        <MainLayout>

            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className={"border-2 border-gray-300 rounded-lg shadow-lg bg-white gap-5"}>
                    <h2 className="text-2xl font-semibold m-4">곰곰에 오신 걸 환영합니다</h2>
                    <EmailLoginForm/>
                </div>
            </div>
        </MainLayout>
    );
}

export default Register;

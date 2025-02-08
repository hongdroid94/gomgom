import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100vw",
                    padding: "10px 20px",
                    backgroundColor: "#f8f9fa",
                    borderBottom: "1px solid #ddd",
                }}
            >
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>GomGom</span>
                <span style={{ fontSize: "24px", cursor: "pointer" }}>👤</span>
            </div>
            <div style={{ flex: 1 }}>{children}</div>
        </div>
    );
};

export default MainLayout;

// src/layouts/DashboardLayout.jsx
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

export default function DashboardLayout({ activeMenu, children }) {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                width: "100%",
                background: "#F8F4F0",
            }}
        >
            {/* 왼쪽 사이드바 */}
            <Sidebar activeMenu={activeMenu} />

            {/* 오른쪽 메인 영역 */}
            <main
                style={{
                    flex: 1,
                    padding: "32px 40px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: 1440,
                        display: "flex",
                        flexDirection: "column",
                        gap: 32,
                    }}
                >
                    {children}
                </div>
            </main>
        </div>
    );
}

// src/components/Layout.jsx
export default function Layout({ children }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#1A2A33",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Outfit, system-ui, sans-serif",
            }}
        >
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center", // 가로 가운데
                }}
            >
                {children}
            </div>
        </div>
    );
}

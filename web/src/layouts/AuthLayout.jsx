// src/layouts/AuthLayout.jsx
export default function AuthLayout({ children }) {
    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "#F8F4F0",
                display: "flex",
            }}
        >
            {/* 왼쪽 이미지 영역 (지금은 placeholder) */}
            <div
                style={{
                    flex: 1,
                    padding: 40,
                    background: "#201F24",
                    color: "#fff",
                    borderRadius: 12,
                    margin: 20,
                }}
            >
                <h2>finance</h2>
                <p style={{ marginTop: 24, fontSize: 24, fontWeight: 700 }}>
                    Keep track of your money
                    <br />
                    and save for your future
                </p>
            </div>

            {/* 오른쪽 폼 영역 */}
            <div
                style={{
                    flex: 1,
                    padding: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </div>
        </div>
    );
}

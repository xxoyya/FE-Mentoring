// src/pages/LoginPage.jsx
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <AuthLayout>
            <div style={{ width: 560, background: "#fff", padding: 32, borderRadius: 12 }}>
                <h1 style={{ fontSize: 32, marginBottom: 24 }}>Login</h1>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Input label="Email" />
                    <Input label="Password" type="password" />
                    <Button>Login</Button>
                </div>

                <div
                    style={{
                        marginTop: 16,
                        display: "flex",
                        justifyContent: "center",
                        gap: 8,
                        fontSize: 14,
                    }}
                >
                    <span style={{ color: "#696868" }}>Need to create an account?</span>
                    <Link to="/signup" style={{ fontWeight: 700 }}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}

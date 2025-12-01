// src/pages/SignUpPage.jsx
import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function SignUpPage() {
    return (
        <AuthLayout>
            <div
                style={{
                    width: 560,
                    background: "#0F172A",
                    borderRadius: 32,
                    padding: 32,
                    color: "white",
                    boxShadow: "0 25px 60px rgba(15,23,42,0.8)",
                }}
            >
                <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Create an account</div>
                    <div style={{ fontSize: 14, color: "#9CA3AF" }}>
                        Start tracking your money and reach your goals faster.
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                    <Input label="Full name" placeholder="Jane Doe" />
                    <Input label="Email" placeholder="you@example.com" type="email" />
                    <Input label="Password" placeholder="••••••••" type="password" />
                </div>

                <Button style={{ width: "100%", marginBottom: 12 }}>Sign up</Button>

                <div style={{ fontSize: 13, color: "#9CA3AF" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#FACC15", textDecoration: "none", fontWeight: 500 }}>
                        Log in
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}

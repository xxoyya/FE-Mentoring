// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const linkBaseStyle = {
    height: 56,
    padding: "16px 32px",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    display: "flex",
    alignItems: "center",
    gap: 16,
    textDecoration: "none",
    fontFamily: "Public Sans, system-ui, -apple-system, BlinkMacSystemFont",
    fontSize: 16,
    fontWeight: 700,
};

function SidebarLink({ to, label, iconColor, isActive }) {
    const active = isActive;
    return (
        <div
            style={{
                ...linkBaseStyle,
                background: active ? "#F8F4F0" : "transparent",
                borderLeft: active ? "4px #277C78 solid" : "4px transparent solid",
                color: active ? "#201F24" : "#B3B3B3",
            }}
        >
            <div
                style={{
                    width: 24,
                    height: 24,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 3,
                        background: iconColor,
                    }}
                />
            </div>
            <NavLink
                to={to}
                style={{
                    color: "inherit",
                    textDecoration: "none",
                    flex: 1,
                }}
            >
                {label}
            </NavLink>
        </div>
    );
}

export default function Sidebar() {
    const pathname = window.location.pathname;

    return (
        <aside
            style={{
                width: 260,
                background: "#201F24",
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                paddingBottom: 24,
                display: "flex",
                flexDirection: "column",
                gap: 24,
            }}
        >
            {/* 로고 자리 */}
            <div
                style={{
                    padding: "40px 32px",
                }}
            >
                <div
                    style={{
                        width: 121.45,
                        height: 21.76,
                        background: "#FFFFFF",
                    }}
                />
            </div>

            {/* 메뉴 */}
            <div
                style={{
                    width: 300,
                    flex: 1,
                    paddingRight: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                }}
            >
                <SidebarLink
                    to="/overview"
                    label="Overview"
                    iconColor="#277C78"
                    isActive={pathname === "/overview" || pathname === "/"}
                />
                <SidebarLink
                    to="/transactions"
                    label="Transactions"
                    iconColor="#B3B3B3"
                    isActive={pathname === "/transactions"}
                />
                <SidebarLink
                    to="/budgets"
                    label="Budgets"
                    iconColor="#B3B3B3"
                    isActive={pathname === "/budgets"}
                />
                <SidebarLink
                    to="/pots"
                    label="Pots"
                    iconColor="#B3B3B3"
                    isActive={pathname === "/pots"}
                />
                <SidebarLink
                    to="/bills"
                    label="Recurring Bills"
                    iconColor="#B3B3B3"
                    isActive={pathname === "/bills"}
                />
            </div>
        </aside>
    );
}

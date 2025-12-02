// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

// src/layouts/DashboardLayout.jsx
import logoIcon from "../../assets/Logo.png";
import homeIcon from "../../assets/home.png";
import homeClickIcon from "../../assets/home_click.png";
import transactionsIcon from "../../assets/trans.png";
import transactionsClickIcon from "../../assets/trans_click.png";
import budgetsIcon from "../../assets/budgets.png";
import potsIcon from "../../assets/pots.png";
import recurringIcon from "../../assets/bills.png";

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

function SidebarLink({ to, label, isActive, icon, activeIcon }) {
    const active = isActive;

    // 활성화 여부에 따라 보여줄 아이콘 선택
    const showIcon = active ? activeIcon || icon : icon;

    // 아이콘 이미지가 없을 때 사용할 기본 색 네모
    const fallbackColor = active ? "#277C78" : "#B3B3B3";

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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {showIcon ? (
                    <img
                        src={showIcon}
                        alt=""
                        style={{
                            width: 24,
                            height: 24,
                            objectFit: "contain",
                            display: "block",
                        }}
                    />
                ) : (
                    // 아직 아이콘 파일 없는 메뉴는 이 네모가 보이게
                    <div
                        style={{
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            background: fallbackColor,
                        }}
                    />
                )}
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
                <img
                    src={logoIcon}
                    alt="Logo"
                    style={{
                        width: 121.45,
                        height: "auto",
                        objectFit: "contain",
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
                    isActive={pathname === "/overview" || pathname === "/"}
                    icon={homeIcon}
                    activeIcon={homeClickIcon}
                />

                <SidebarLink
                    to="/transactions"
                    label="Transactions"
                    isActive={pathname === "/transactions"}
                    icon={transactionsIcon}
                    activeIcon={transactionsClickIcon}
                />

                <SidebarLink
                    to="/budgets"
                    label="Budgets"
                    isActive={pathname === "/budgets"}
                    icon={budgetsIcon}
                />

                <SidebarLink
                    to="/pots"
                    label="Pots"
                    isActive={pathname === "/pots"}
                    icon={potsIcon}
                />

                <SidebarLink
                    to="/bills"
                    label="Recurring Bills"
                    isActive={pathname === "/bills"}
                    icon={recurringIcon}
                />
            </div>
        </aside>
    );
}

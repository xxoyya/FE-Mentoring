// src/components/pots/PotsSummary.jsx
import React from "react";

export default function PotsSummary() {
    return (
        <div
            style={{
                padding: 32,
                background: "#FFFFFF",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 20,
            }}
        >
            {/* 헤더 */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
        <span
            style={{
                fontFamily: "Public Sans",
                fontSize: 20,
                fontWeight: 700,
                color: "#201F24",
            }}
        >
          Pots
        </span>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                    }}
                >
          <span
              style={{
                  color: "#696868",
                  fontSize: 14,
                  fontFamily: "Public Sans",
              }}
          >
            See Details
          </span>
                    {/* 화살표는 단순 div 로 대체 */}
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            transform: "rotate(-90deg)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: 4.5,
                                height: 8.25,
                                position: "absolute",
                                left: 4.13,
                                top: 1.87,
                                background: "#696868",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* 본문 */}
            <div
                style={{
                    display: "flex",
                    gap: 20,
                    alignItems: "center",
                }}
            >
                {/* 왼쪽 Total Saved 카드 */}
                <div
                    style={{
                        width: 247,
                        height: 110,
                        padding: 16,
                        background: "#F8F4F0",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            background: "#277C78",
                            borderRadius: 8,
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 11,
                        }}
                    >
            <span
                style={{
                    color: "#696868",
                    fontSize: 14,
                    fontFamily: "Public Sans",
                }}
            >
              Total Saved
            </span>
                        <span
                            style={{
                                color: "#201F24",
                                fontSize: 32,
                                fontFamily: "Public Sans",
                                fontWeight: 700,
                            }}
                        >
              $850
            </span>
                    </div>
                </div>

                {/* 오른쪽 작은 항목들 */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: 16,
                        }}
                    >
                        {/* Savings */}
                        <PotItem
                            color="#277C78"
                            label="Savings"
                            amount="$159"
                        />
                        {/* Gift */}
                        <PotItem
                            color="#82C9D7"
                            label="Gift"
                            amount="$40"
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 16,
                        }}
                    >
                        {/* Concert Ticket */}
                        <PotItem
                            color="#626070"
                            label="Concert Ticket"
                            amount="$110"
                        />
                        {/* New Laptop */}
                        <PotItem
                            color="#F2CDAC"
                            label="New Laptop"
                            amount="$10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PotItem({ color, label, amount }) {
    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 16,
            }}
        >
            <div
                style={{
                    width: 4,
                    alignSelf: "stretch",
                    borderRadius: 8,
                    background: color,
                }}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                }}
            >
        <span
            style={{
                color: "#696868",
                fontSize: 12,
                fontFamily: "Public Sans",
            }}
        >
          {label}
        </span>
                <span
                    style={{
                        color: "#201F24",
                        fontSize: 14,
                        fontFamily: "Public Sans",
                        fontWeight: 700,
                    }}
                >
          {amount}
        </span>
            </div>
        </div>
    );
}

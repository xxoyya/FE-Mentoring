// src/components/transactions/TransactionsTable.jsx
import React from "react";

export default function TransactionsTable({
                                              transactions = [], // 기본값: 빈 배열
                                          }) {
    const rows = transactions; // 필요하면 slice 해서 상위 몇 개만 쓰기

    return (
        <div
            style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 16,
                display: "flex",
            }}
        >
            {/* 여기 위쪽은 네가 이미 만든 헤더 부분 유지 */}

            {rows.map((tx) => (
                <div
                    key={tx.id}
                    style={{
                        alignSelf: "stretch",
                        paddingLeft: 16,
                        paddingRight: 16,
                        borderRadius: 8,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 32,
                        display: "inline-flex",
                    }}
                >
                    {/* 이름/프로필 영역 */}
                    <div
                        style={{
                            flex: "1 1 0",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 16,
                            display: "flex",
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                background: "#F8F4F0",
                                borderRadius: 9999,
                            }}
                        />
                        <div
                            style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                gap: 8,
                                display: "inline-flex",
                            }}
                        >
                            <div
                                style={{
                                    color: "#201F24",
                                    fontSize: 14,
                                    fontFamily: "Public Sans",
                                    fontWeight: 700,
                                    lineHeight: "21px",
                                }}
                            >
                                {tx.name}
                            </div>
                        </div>
                    </div>

                    {/* 카테고리 */}
                    <div
                        style={{
                            width: 120,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: 6,
                            display: "inline-flex",
                        }}
                    >
                        <div
                            style={{
                                color: "#696868",
                                fontSize: 12,
                                fontFamily: "Public Sans",
                                fontWeight: 400,
                                lineHeight: "18px",
                            }}
                        >
                            {tx.category}
                        </div>
                    </div>

                    {/* 날짜 */}
                    <div
                        style={{
                            width: 120,
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: 8,
                            display: "inline-flex",
                        }}
                    >
                        <div
                            style={{
                                color: "#696868",
                                fontSize: 12,
                                fontFamily: "Public Sans",
                                fontWeight: 400,
                                lineHeight: "18px",
                            }}
                        >
                            {tx.date}
                        </div>
                    </div>

                    {/* 금액 */}
                    <div
                        style={{
                            width: 200,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            gap: 8,
                            display: "inline-flex",
                        }}
                    >
                        <div
                            style={{
                                textAlign: "right",
                                color: tx.type === "income" ? "#277C78" : "#201F24",
                                fontSize: 14,
                                fontFamily: "Public Sans",
                                fontWeight: 700,
                                lineHeight: "21px",
                            }}
                        >
                            {tx.type === "income" ? "+" : "-"}
                            {tx.amount.toFixed(2)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

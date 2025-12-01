// src/components/transactions/TransactionsPreview.jsx
import React from "react";
import { transactions } from "../../data/transactions"; // named export 확인!

export default function TransactionsPreview() {
    // 최신 5개만 보여주기 (원하면 숫자 바꿔도 됨)
    const previewList = transactions.slice(0, 5);

    return (
        <div
            style={{
                padding: 32,
                background: "#FFFFFF",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 32,
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
          Transactions
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
            View All
          </span>
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

            {/* 리스트 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                    }}
                >
                    {previewList.map((tx) => (
                        <React.Fragment key={tx.id}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                {/* 왼쪽: 이름 + 아바타 */}
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
                                            width: 40,
                                            height: 40,
                                            borderRadius: 9999,
                                            background: "#F8F4F0",
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8,
                                        }}
                                    >
                    <span
                        style={{
                            fontFamily: "Public Sans",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#201F24",
                        }}
                    >
                      {tx.name}
                    </span>
                                    </div>
                                </div>

                                {/* 오른쪽: 금액 + 날짜 */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        gap: 8,
                                    }}
                                >
                  <span
                      style={{
                          fontFamily: "Public Sans",
                          fontSize: 14,
                          fontWeight: 700,
                          color:
                              tx.type === "income" ? "#277C78" : "#201F24",
                          textAlign: "right",
                      }}
                  >
                    {tx.amount}
                  </span>
                                    <span
                                        style={{
                                            fontFamily: "Public Sans",
                                            fontSize: 12,
                                            color: "#696868",
                                        }}
                                    >
                    {tx.date}
                  </span>
                                </div>
                            </div>

                            {/* 구분선 */}
                            <div
                                style={{
                                    height: 1,
                                    borderTop: "1px solid #F2F2F2",
                                }}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

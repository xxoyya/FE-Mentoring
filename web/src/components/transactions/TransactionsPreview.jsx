// src/components/transactions/TransactionsPreview.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { transactions } from "../../data/transactions";

export default function TransactionsPreview() {
    const navigate = useNavigate();

    // 날짜 기준 최신순 정렬 → 상위 5개만 preview
    const previewList = [...transactions]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 5);

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
                    onClick={() => navigate("/transactions")}
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
                    <span
                        style={{
                            fontSize: 14,
                            color: "#696868",
                        }}
                    >
            ▾
          </span>
                </div>
            </div>

            {/* 리스트 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                }}
            >
                {previewList.map((tx, index) => (
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
                                        borderRadius: "9999px",
                                        background: "#F8F4F0",
                                    }}
                                />
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
                        color: tx.type === "income" ? "#277C78" : "#201F24",
                    }}
                >
                  {tx.type === "income" ? "+" : "-"}
                    {tx.amount.toFixed(2)}
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

                        {/* 마지막 줄 빼고 구분선 */}
                        {index !== previewList.length - 1 && (
                            <div
                                style={{
                                    height: 1,
                                    borderTop: "1px solid #F2F2F2",
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

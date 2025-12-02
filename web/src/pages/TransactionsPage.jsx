// src/pages/TransactionsPage.jsx
import { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { transactions } from "../data/transactions";

const cardStyle = {
    background: "#FFFFFF",
    borderRadius: 12,
    padding: 32,
};

const labelStyle = {
    fontSize: 12,
    color: "#696868",
    marginBottom: 8,
};

const pillButtonBase = {
    padding: "12px 20px",
    borderRadius: 8,
    border: "1px solid #98908B",
    fontSize: 14,
    color: "#201F24",
    background: "#FFFFFF",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
};

const pageSize = 8;

const SORT_OPTIONS = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "aToZ", label: "A to Z" },
    { value: "zToA", label: "Z to A" },
    { value: "highest", label: "Highest" },
    { value: "lowest", label: "Lowest" },
];

const CATEGORY_OPTIONS = [
    "All Transactions",
    "General",
    "Bills",
    "Groceries",
    "Dining Out",
    "Entertainment",
    "Transportation",
];

export default function TransactionsPage() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [category, setCategory] = useState("All Transactions");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOpen, setSortOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);

    // 필터 + 정렬된 전체 리스트
    const filtered = useMemo(() => {
        let list = [...transactions];

        // 검색
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter((tx) => tx.name.toLowerCase().includes(q));
        }

        // 카테고리
        if (category !== "All Transactions") {
            list = list.filter((tx) => tx.category === category);
        }

        // 정렬
        list.sort((a, b) => {
            switch (sortBy) {
                case "latest":
                    return a.date < b.date ? 1 : -1;
                case "oldest":
                    return a.date > b.date ? 1 : -1;
                case "aToZ":
                    return a.name.localeCompare(b.name);
                case "zToA":
                    return b.name.localeCompare(a.name);
                case "highest":
                    return b.amount - a.amount;
                case "lowest":
                    return a.amount - b.amount;
                default:
                    return 0;
            }
        });

        return list;
    }, [search, sortBy, category]);

    const naturalPages = Math.ceil(filtered.length / pageSize) || 1;
    const totalPages = Math.max(5, naturalPages);

    const safePage = Math.min(currentPage, totalPages);

    const startIndex = (safePage - 1) * pageSize;
    const pageItems = filtered.slice(startIndex, startIndex + pageSize);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleChangeSort = (value) => {
        setSortBy(value);
        setCurrentPage(1);
        setSortOpen(false);
    };

    const handleChangeCategory = (value) => {
        setCategory(value);
        setCurrentPage(1);
        setCategoryOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    return (
        <DashboardLayout activeMenu="transactions">
            <div
                style={{
                    padding: 40,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    maxWidth: 1110,
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                {/* 페이지 타이틀 */}
                <h1
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: "#201F24",
                        marginTop: "-6px"
                    }}
                >
                    Transactions
                </h1>

                {/* 검색 + 필터 + 테이블 + 페이지네이션 */}
                <div style={{...cardStyle, padding: 32, display: "flex", flexDirection: "column", gap: 24}}>
                    {/* 검색 + 필터 바 */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 24,
                            alignItems: "center",
                        }}
                    >
                        {/* 검색창 */}
                        <div style={{width: 320}}>
                            <div style={labelStyle}>Search</div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "12px 20px",
                                    borderRadius: 8,
                                    border: "1px solid #98908B",
                                    background: "#FFFFFF",
                                }}
                            >
                                <input
                                    placeholder="Search transaction"
                                    value={search}
                                    onChange={handleSearchChange}
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        flex: 1,
                                        fontSize: 14,
                                        color: "#201F24",
                                        fontFamily: "Public Sans",
                                    }}
                                />
                                <span style={{fontSize: 16}}>🔍</span>
                            </div>
                        </div>

                        {/* 오른쪽 필터 2개 */}
                        <div
                            style={{
                                display: "flex",
                                gap: 24,
                                alignItems: "center",
                                marginLeft: "auto",
                            }}
                        >
                            {/* Sort by */}
                            <div style={{display: "flex", alignItems: "center", gap: 8, position: "relative"}}>
                                <span style={{fontSize: 14, color: "#696868"}}>Sort by</span>
                                <button
                                    type="button"
                                    style={pillButtonBase}
                                    onClick={() => setSortOpen((o) => !o)}
                                >
                                    {
                                        SORT_OPTIONS.find((o) => o.value === sortBy)
                                            ?.label
                                    }
                                    <span>▾</span>
                                </button>

                                {/* Sort 드롭다운 */}
                                {sortOpen && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "110%",
                                            right: 0,
                                            background: "#FFFFFF",
                                            borderRadius: 8,
                                            boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                                            padding: "8px 0",
                                            zIndex: 10,
                                            minWidth: 160,
                                        }}
                                    >
                                        {SORT_OPTIONS.map((opt) => (
                                            <div
                                                key={opt.value}
                                                onClick={() => handleChangeSort(opt.value)}
                                                style={{
                                                    padding: "8px 20px",
                                                    fontSize: 14,
                                                    cursor: "pointer",
                                                    background:
                                                        opt.value === sortBy ? "#F8F4F0" : "#FFFFFF",
                                                    color: "#201F24",
                                                }}
                                            >
                                                {opt.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Category */}
                            <div style={{display: "flex", alignItems: "center", gap: 8, position: "relative"}}>
                                <span style={{fontSize: 14, color: "#696868"}}>Category</span>
                                <button
                                    type="button"
                                    style={pillButtonBase}
                                    onClick={() => setCategoryOpen((o) => !o)}
                                >
                                    {category}
                                    <span>▾</span>
                                </button>

                                {/* Category 드롭다운 */}
                                {categoryOpen && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "110%",
                                            right: 0,
                                            background: "#FFFFFF",
                                            borderRadius: 8,
                                            boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                                            padding: "8px 0",
                                            zIndex: 10,
                                            minWidth: 200,
                                        }}
                                    >
                                        {CATEGORY_OPTIONS.map((cat) => (
                                            <div
                                                key={cat}
                                                onClick={() => handleChangeCategory(cat)}
                                                style={{
                                                    padding: "8px 20px",
                                                    fontSize: 14,
                                                    cursor: "pointer",
                                                    background:
                                                        cat === category ? "#F8F4F0" : "#FFFFFF",
                                                    color: "#201F24",
                                                }}
                                            >
                                                {cat}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 테이블 헤더 */}
                    <div
                        style={{
                            marginTop: 14,
                            padding: "0px 16px",
                            // borderBottom: "1px solid #F2F2F2",
                            display: "flex",
                            gap: 32,
                            color: "#696868",
                            fontSize: 12,
                            lineHeight: "0px",
                            height: "0px"
                        }}
                    >
                        <div style={{flex: 1}}>Recipient / Sender</div>
                        <div style={{width: 120}}>Category</div>
                        <div style={{width: 120}}>Transaction Date</div>
                        <div style={{width: 200, textAlign: "right"}}>Amount</div>
                    </div>

                    <div
                        style={{
                            height: 1,
                            background: "#F2F2F2",
                            margin: "-4px 16px 0px 16px",
                        }}
                    />

                    {/* 데이터 행들 */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                        }}
                    >
                        {pageItems.map((tx, idx) => (
                            <div key={tx.id}>
                                <div
                                    style={{
                                        padding: `${idx === 0 ? 0 : 13}px 16px 13px 16px`,
                                        display: "flex",
                                        gap: 32,
                                        alignItems: "center",
                                        marginTop: idx === 0 ? "-8px" : "0px"
                                    }}
                                >
                                    {/* 이름 + 아바타 */}
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
                                                borderRadius: "50%",
                                                background: "#F8F4F0",
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 700,
                                                color: "#201F24",
                                            }}
                                        >
                                            {tx.name}
                                        </div>
                                    </div>

                                    {/* 카테고리 */}
                                    <div
                                        style={{
                                            width: 120,
                                            fontSize: 12,
                                            color: "#696868",
                                        }}
                                    >
                                        {tx.category}
                                    </div>

                                    {/* 날짜 (ISO → 보기용으로 그냥 둠) */}
                                    <div
                                        style={{
                                            width: 120,
                                            fontSize: 12,
                                            color: "#696868",
                                        }}
                                    >
                                        {tx.date}
                                    </div>

                                    {/* 금액 */}
                                    <div
                                        style={{
                                            width: 200,
                                            textAlign: "right",
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: tx.type === "income" ? "#277C78" : "#201F24",
                                        }}
                                    >
                                        {tx.type === "income" ? "+$" : "-$"}
                                        {tx.amount.toFixed(2)}
                                    </div>
                                </div>

                                {/* 마지막 줄 빼고 구분선 */}
                                {idx !== pageItems.length - 1 && (
                                    <div
                                        style={{
                                            height: 1,
                                            background: "#F2F2F2",
                                            margin: "0 16px",
                                        }}
                                    />
                                )}
                            </div>
                        ))}

                        {/* 데이터가 없을 때 */}
                        {pageItems.length === 0 && (
                            <div
                                style={{
                                    padding: 32,
                                    textAlign: "center",
                                    color: "#98908B",
                                    fontSize: 14,
                                }}
                            >
                                No transactions found.
                            </div>
                        )}
                    </div>

                    {/* 페이지네이션 */}
                    <div
                        style={{
                            marginTop: 24,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <button
                            type="button"
                            style={pillButtonBase}
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={safePage === 1}
                        >
                            <span style={{transform: "rotate(180deg)"}}>▶</span>
                            <span>Prev</span>
                        </button>

                        <div style={{display: "flex", gap: 8}}>
                            {pageNumbers.map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() => setCurrentPage(n)}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 8,
                                        border:
                                            n === safePage ? "none" : "1px solid #98908B",
                                        background:
                                            n === safePage ? "#201F24" : "#FFFFFF",
                                        color: n === safePage ? "#FFFFFF" : "#201F24",
                                        fontSize: 14,
                                        cursor: "pointer",
                                    }}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            style={pillButtonBase}
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1)
                                )
                            }
                            disabled={safePage === totalPages}
                        >
                            <span>Next</span>
                            <span>▶</span>
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

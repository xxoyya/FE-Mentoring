// src/components/common/Pagination.jsx
export default function Pagination({ page = 1, totalPages = 1, onChange }) {
    const prevDisabled = page <= 1;
    const nextDisabled = page >= totalPages;

    return (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, fontSize: 12, marginTop: 12 }}>
            <button
                onClick={() => !prevDisabled && onChange?.(page - 1)}
                disabled={prevDisabled}
                style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    border: "1px solid #D1D5DB",
                    background: prevDisabled ? "#F3F4F6" : "white",
                    cursor: prevDisabled ? "default" : "pointer",
                }}
            >
                Prev
            </button>
            <span style={{ alignSelf: "center", color: "#6B7280" }}>
        {page} / {totalPages}
      </span>
            <button
                onClick={() => !nextDisabled && onChange?.(page + 1)}
                disabled={nextDisabled}
                style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    border: "1px solid #D1D5DB",
                    background: nextDisabled ? "#F3F4F6" : "white",
                    cursor: nextDisabled ? "default" : "pointer",
                }}
            >
                Next
            </button>
        </div>
    );
}

// src/components/common/Dropdown.jsx
export default function Dropdown({ label, options = [], value, onChange }) {
    return (
        <label style={{ fontSize: 12, color: "#6B7280", display: "inline-flex", flexDirection: "column", gap: 4 }}>
            {label && <span>{label}</span>}
            <select
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                style={{
                    borderRadius: "999px",
                    padding: "6px 12px",
                    border: "1px solid #D1D5DB",
                    fontSize: 12,
                    outline: "none",
                }}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

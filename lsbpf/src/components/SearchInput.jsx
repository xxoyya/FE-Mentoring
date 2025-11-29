import IconSearch from "./icons/IconSearch";

const PFASearchInput = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="search-icon">
        <IconSearch />
      </div>
    </div>
  );
};

export default PFASearchInput;

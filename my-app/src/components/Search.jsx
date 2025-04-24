import React, { useState } from "react";

const Search = ({ onSearch = () => {} }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setQuery(searchValue);
        onSearch(searchValue); // Send search query to parent component (Navbar)
    };

    return (
        <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleSearch}
            className="form-control mx-3"
            style={{
                width: "250px",
                border: "2px solid black",
                borderRadius: "5px",
                padding: "8px",
                outline: "none",
            }}
        />
    );
};

export default Search;



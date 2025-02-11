import { useState, useEffect } from "react";
import axios from "axios";

const AutocompleteInput = ({
    label,
    apiUrl,
    selectedId,
    setSelectedId,
    selectedName,
    setSelectedName,
}) => {
    const [inputValue, setInputValue] = useState(selectedName || "");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Sync inputValue when selectedName changes
    useEffect(() => {
        setInputValue(selectedName || "");
    }, [selectedName]);

    useEffect(() => {
        if (inputValue.length > 1) {
            axios
                .get(apiUrl, { params: { q: inputValue } })
                .then((response) => setSuggestions(response.data))
                .catch((error) => console.error("Error fetching data:", error));
        } else {
            setSuggestions([]);
        }
    }, [inputValue]);

    const handleSelect = (suggestion) => {
        setInputValue(suggestion.nama); // Show name in input
        setSelectedName(suggestion.nama); // Update parent state
        setSelectedId(suggestion.id); // Store foreign key ID
        setShowSuggestions(false);
    };

    return (
        <div className="relative flex flex-col gap-1">
            <label className="text-sm font-semibold uppercase">{label}</label>
            <input
                type="text"
                className="rounded-sm text-sm drop-shadow-sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute bg-white border w-full mt-1 rounded shadow-lg z-10">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onMouseDown={() => handleSelect(suggestion)}
                        >
                            {suggestion.nama}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteInput;

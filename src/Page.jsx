import React, { useState } from "react";
import axios from "axios";
import "./Page.css"; // Import the CSS file

const Page = () => {
  const [jsonInput, setJsonInput] = useState(""); // State to handle JSON input
  const [response, setResponse] = useState(null); // State to store the API response
  const [selectedOptions, setSelectedOptions] = useState([]); // State to store selected options
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput); // Attempt to parse the JSON input
      const res = await axios.post(
        "https://21BSA10006backend.vercel.app/bfhl",
        parsedJson
      ); // Send API request
      setResponse(res.data); // Store the response data
    } catch (error) {
      if (error instanceof SyntaxError) {
        alert("Invalid JSON format: " + error.message); // Show detailed error if JSON is invalid
      } else {
        alert("An error occurred: " + error.message); // Show any other error
      }
    }
  };

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option)); // Remove option if already selected
    } else {
      setSelectedOptions([...selectedOptions, option]); // Add option if not selected
    }
  };

  const getFormattedResponse = () => {
    if (!response) return "";
    let formatted = "";

    if (selectedOptions.includes("Alphabets") && response.alphabets) {
      formatted += `Alphabets: ${response.alphabets.join(", ")}\n`;
    }
    if (selectedOptions.includes("Numbers") && response.numbers) {
      formatted += `Numbers: ${response.numbers.join(", ")}\n`;
    }
    if (
      selectedOptions.includes("Highest lowercase alphabet") &&
      response.highest_lowercase_alphabet
    ) {
      formatted += `Highest lowercase alphabet: ${response.highest_lowercase_alphabet.join(
        ", "
      )}`;
    }

    return formatted.trim(); // Return the formatted response as a string
  };

  const availableOptions = [
    "Alphabets",
    "Numbers",
    "Highest lowercase alphabet",
  ].filter((option) => !selectedOptions.includes(option));

  return (
    <div className="container">
      <h1 className="reg">21BSA10006</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
        rows="4"
      />
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>

      {response && (
        <>
          <h3>Select options:</h3>
          <div className="dropdown-container">
            <div
              className="selected-options"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <div key={option} className="selected-option">
                    {option}
                    <span
                      className="remove-option"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent dropdown toggle when clicking remove
                        handleOptionToggle(option);
                      }}
                    >
                      ✖
                    </span>
                  </div>
                ))
              ) : (
                <span className="placeholder">Select...</span>
              )}
              <span className={`arrow ${showDropdown ? "up" : "down"}`}>▼</span>
            </div>
            {showDropdown && (
              <select
                multiple
                onChange={(e) => handleOptionToggle(e.target.value)}
                className="dropdown"
              >
                {availableOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <h3>Filtered Response:</h3>
            <pre>{getFormattedResponse()}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

import React, { useState } from "react";
import axios from "axios";
import "./Page.css"; // Import the CSS file

const Page = () => {
  const [jsonInput, setJsonInput] = useState(""); // State to handle JSON input
  const [response, setResponse] = useState(null); // State to store the API response
  const [selectedOptions, setSelectedOptions] = useState([]); // State to store selected options

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput); // Attempt to parse the JSON input
      console.log("Parsed JSON:", parsedJson); // Log parsed JSON for debugging
      const res = await axios.post(
        "https://bajaj-api-xi-pink.vercel.app/bfhl",
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

  const handleDropdownChange = (event) => {
    const options = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(options); // Update selected options state
  };

  const getFilteredResponse = () => {
    if (!response) return null;
    const filtered = {};
    if (selectedOptions.includes("Alphabets")) {
      filtered.alphabets = response.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      filtered.numbers = response.numbers;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filtered.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }
    return filtered; // Return filtered data based on selected options
  };

  return (
    <div className="container">
      <h1>21BSA10006</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
        rows="4"
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <label>Select options:</label>
          <select multiple onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>

          <div>
            <h3>Filtered Response:</h3>
            <pre>{JSON.stringify(getFilteredResponse(), null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

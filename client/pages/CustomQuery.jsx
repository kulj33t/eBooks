import { useState } from "react";
import axios from "axios";
import "./CustomQuery.css"; 

const CustomQuery = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleExecute = async () => {
    if (!query.trim()) {
      setError("Query cannot be empty.");
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:8000/custom-query", { query });
      setResult(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error executing query.");
      setResult(null);
    }
  };

  return (
    <div className="custom-query-container">
      <h2>Run Custom Query</h2>
      <textarea 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter your SQL query here..."
      />
      <button onClick={handleExecute}>Execute</button>

      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CustomQuery;

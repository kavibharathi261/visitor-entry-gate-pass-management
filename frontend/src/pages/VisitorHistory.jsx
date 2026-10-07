import { useEffect, useState } from "react";
import api from "../api";

function VisitorHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadHistory = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await api.get("visitor-history/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("FULL RESPONSE:", response.data);

      setHistory(response.data.data);
    } catch (error) {
      console.log("HISTORY ERROR:", error);

      if (error.response) {
        setErrorMessage(
          "Server Error: " + JSON.stringify(error.response.data)
        );
      } else {
        setErrorMessage("Cannot connect to Django server");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h2>Visitor History</h2>
        <div className="alert alert-info">
          Loading visitor history...
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container mt-4">
        <h2>Visitor History</h2>
        <div className="alert alert-danger">
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Visitor History</h2>

      <p>
        Total Records: <strong>{history.length}</strong>
      </p>

      {history.length === 0 ? (
        <div className="alert alert-info">
          No visitor history available.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Log ID</th>
                <th>Gate Pass</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.log_id}>
                  <td>{item.log_id}</td>
                  <td>{item.gate_pass}</td>
                  <td>{item.check_in_time || "-"}</td>
                  <td>{item.check_out_time || "-"}</td>
                  <td>{item.remarks || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VisitorHistory;
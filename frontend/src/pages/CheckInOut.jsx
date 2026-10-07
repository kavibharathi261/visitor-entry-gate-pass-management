import { useEffect, useState } from "react";
import api from "../api";

function CheckInOut() {
  const [gatePasses, setGatePasses] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedPass, setSelectedPass] = useState("");

  const token = localStorage.getItem("access");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadData = async () => {
    try {
      const passResponse = await api.get("gate-passes/", config);
      const logResponse = await api.get("check-in-out/", config);

      setGatePasses(passResponse.data.data);
      setLogs(logResponse.data.data);
    } catch (error) {
      console.log("Check-In/Out Error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckIn = async () => {
    if (!selectedPass) {
      alert("Please select a gate pass");
      return;
    }

    try {
      await api.post(
        "check-in-out/",
        {
          gate_pass: selectedPass,
          check_in_time: new Date().toISOString(),
          remarks: "Visitor checked in",
        },
        config
      );

      alert("Check-In successful");
      loadData();
    } catch (error) {
      console.log("Check-In Error:", error);
      alert("Check-In failed");
    }
  };

  const handleCheckOut = async (logId) => {
    try {
      await api.patch(
        `check-in-out/${logId}/`,
        {
          check_out_time: new Date().toISOString(),
          remarks: "Visitor checked out",
        },
        config
      );

      alert("Check-Out successful");
      loadData();
    } catch (error) {
      console.log("Check-Out Error:", error);
      alert("Check-Out failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Check-In / Check-Out</h2>

      <div className="card shadow p-4 mb-4">
        <h5 className="mb-3">Visitor Check-In</h5>

        <select
          className="form-select mb-3"
          value={selectedPass}
          onChange={(e) => setSelectedPass(e.target.value)}
        >
          <option value="">Select Gate Pass</option>

          {gatePasses.map((pass) => (
            <option
              key={pass.gate_pass_id}
              value={pass.gate_pass_id}
            >
              {pass.pass_number}
            </option>
          ))}
        </select>

        <button
          className="btn btn-success"
          onClick={handleCheckIn}
        >
          Check-In
        </button>
      </div>

      <div className="card shadow p-4">
        <h5 className="mb-3">Visitor History</h5>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Log ID</th>
                <th>Gate Pass</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.log_id}>
                  <td>{log.log_id}</td>
                  <td>{log.gate_pass}</td>
                  <td>{log.check_in_time || "-"}</td>
                  <td>{log.check_out_time || "-"}</td>
                  <td>{log.remarks}</td>

                  <td>
                    {!log.check_out_time && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleCheckOut(log.log_id)
                        }
                      >
                        Check-Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CheckInOut;
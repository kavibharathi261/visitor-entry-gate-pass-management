import { useEffect, useState } from "react";
import api from "../api";

function GatePass() {
  const [gatePasses, setGatePasses] = useState([]);

  const token = localStorage.getItem("access");

  const loadGatePasses = async () => {
    try {
      const response = await api.get("gate-passes/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGatePasses(response.data.data);
    } catch (error) {
      console.log("Gate Pass Error:", error);
    }
  };

  useEffect(() => {
    loadGatePasses();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Digital Gate Pass</h2>

      {gatePasses.length === 0 ? (
        <div className="alert alert-info">
          No gate passes available.
        </div>
      ) : (
        <div className="row">
          {gatePasses.map((pass) => (
            <div className="col-md-6 col-lg-4 mb-4" key={pass.gate_pass_id}>
              <div className="card shadow h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Gate Pass</h5>
                </div>

                <div className="card-body">
                  <p>
                    <strong>Pass Number:</strong>{" "}
                    {pass.pass_number}
                  </p>

                  <p>
                    <strong>Request ID:</strong>{" "}
                    {pass.request}
                  </p>

                  <p>
                    <strong>Issue Date:</strong>{" "}
                    {pass.issue_date}
                  </p>

                  <p>
                    <strong>Valid Until:</strong>{" "}
                    {pass.valid_until}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success">
                      {pass.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GatePass;
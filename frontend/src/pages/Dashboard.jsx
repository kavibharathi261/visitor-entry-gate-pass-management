import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get("dashboard/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });

        setData(response.data.data);
      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    };

    loadDashboard();
  }, []);

  if (!data) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading Dashboard...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">

      <div className="mb-4">
        <h2>Visitor Management Dashboard</h2>
        <p className="text-muted">
          Visitor Entry and Gate Pass Management System
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Total Visitors</h6>
              <h2>{data.total_visitors}</h2>
              <p className="mb-0 text-primary">
                Registered Visitors
              </p>
            </div>
          </div>
        </div>


        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Visit Requests</h6>
              <h2>{data.total_visit_requests}</h2>
              <p className="mb-0 text-info">
                Total Requests
              </p>
            </div>
          </div>
        </div>


        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Approved</h6>
              <h2>{data.approved_requests}</h2>
              <p className="mb-0 text-success">
                Approved Requests
              </p>
            </div>
          </div>
        </div>


        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-muted">Pending</h6>
              <h2>{data.pending_requests}</h2>
              <p className="mb-0 text-warning">
                Waiting for Approval
              </p>
            </div>
          </div>
        </div>

      </div>


      <div className="row g-4 mt-1">

        <div className="col-md-6">

          <div className="card shadow-sm border-0">
            <div className="card-body">

              <h5 className="card-title">
                Gate Passes
              </h5>

              <h1 className="mt-3">
                {data.total_gate_passes}
              </h1>

              <p className="text-muted">
                Total digital gate passes generated
              </p>

            </div>
          </div>

        </div>


        <div className="col-md-6">

          <div className="card shadow-sm border-0">
            <div className="card-body">

              <h5 className="card-title">
                System Status
              </h5>

              <p className="text-success mt-3 mb-0">
                ● System Online
              </p>

              <p className="text-muted">
                Visitor management system is running normally.
              </p>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
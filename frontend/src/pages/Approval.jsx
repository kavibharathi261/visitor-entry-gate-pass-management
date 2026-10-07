import { useEffect, useState } from "react";
import api from "../api";

function Approval() {
  const [requests, setRequests] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const token = localStorage.getItem("access");

  useEffect(() => {
    getRequests();
    getVisitors();
    getDepartments();
    getEmployees();
  }, []);

  const getRequests = async () => {
    try {
      const response = await api.get("visit-requests/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVisitors = async () => {
    try {
      const response = await api.get("visitors/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVisitors(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartments = async () => {
    try {
      const response = await api.get("departments/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDepartments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await api.get("employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVisitorName = (id) => {
    const visitor = visitors.find(
      (item) => item.visitor_id === id
    );

    return visitor ? visitor.name : "Unknown";
  };

  const getDepartmentName = (id) => {
    const department = departments.find(
      (item) => item.department_id === id
    );

    return department
      ? department.department_name
      : "Unknown";
  };

  const getEmployeeName = (id) => {
    const employee = employees.find(
      (item) => item.employee_id === id
    );

    return employee
      ? employee.employee_name
      : "Unknown";
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(
        `visit-requests/${id}/`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Request updated successfully");

      getRequests();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container py-4">
      <h2>Visit Request Approval</h2>

      <p className="text-muted">
        Approve or reject visitor requests
      </p>

      {requests
        .filter((request) => request.status === "Pending")
        .map((request) => (
          <div
            className="card shadow-sm mb-3"
            key={request.request_id}
          >
            <div className="card-body">
              <h5>
                Request #{request.request_id}
              </h5>

              <p>
                <strong>Visitor:</strong>{" "}
                {getVisitorName(request.visitor)}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {getDepartmentName(request.department)}
              </p>

              <p>
                <strong>Employee:</strong>{" "}
                {getEmployeeName(request.employee)}
              </p>

              <p>
                <strong>Visit Date:</strong>{" "}
                {request.visit_date}
              </p>

              <p>
                <strong>Purpose:</strong>{" "}
                {request.purpose}
              </p>

              <button
                className="btn btn-success me-2"
                onClick={() =>
                  updateStatus(
                    request.request_id,
                    "Approved"
                  )
                }
              >
                Approve
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  updateStatus(
                    request.request_id,
                    "Rejected"
                  )
                }
              >
                Reject
              </button>
            </div>
          </div>
        ))}

      {requests.filter(
        (request) => request.status === "Pending"
      ).length === 0 && (
        <div className="alert alert-info">
          No pending requests
        </div>
      )}
    </div>
  );
}

export default Approval;
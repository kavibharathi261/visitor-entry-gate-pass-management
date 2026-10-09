import { useEffect, useState } from "react";
import api from "../api";

function VisitRequest() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    visitor: "",
    department: "",
    employee: "",
    visit_date: "",
    purpose: "",
  });

  useEffect(() => {
    loadDepartments();
    loadEmployees();
  }, []);

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });

  const loadDepartments = async () => {
    try {
      const response = await api.get("departments/", getConfig());
      setDepartments(response.data.data || []);
    } catch (error) {
      console.log("Department Error:", error.response?.data || error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await api.get("employees/", getConfig());
      setEmployees(response.data.data || []);
    } catch (error) {
      console.log("Employee Error:", error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const department = departments.find(
      (item) =>
        item.department_name.toLowerCase() ===
        form.department.trim().toLowerCase()
    );

    const employee = employees.find(
      (item) =>
        item.employee_name.toLowerCase() ===
        form.employee.trim().toLowerCase()
    );

    if (!department) {
      alert("Enter an existing department name.");
      return;
    }

    if (
      !employee ||
      Number(employee.department) !== Number(department.department_id)
    ) {
      alert("Enter an employee from this department.");
      return;
    }

    try {
      await api.post(
        "visit-requests/",
        {
          visitor: Number(form.visitor),
          department: department.department_id,
          employee: employee.employee_id,
          visit_date: form.visit_date,
          purpose: form.purpose,
          status: "Pending",
        },
        getConfig()
      );

      alert("Visit request submitted successfully!");

      setForm({
        visitor: "",
        department: "",
        employee: "",
        visit_date: "",
        purpose: "",
      });
    } catch (error) {
      console.log("Visit Request Error:", error.response?.data || error);
      alert(
        error.response
          ? "Request failed. Check the browser console."
          : "Cannot connect to Django server"
      );
    }
  };

  return (
    <div className="container py-4">
      <h2>Visit Request</h2>
      <p className="text-muted">Submit a request for visitor entry</p>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Visit Details</h5>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Visitor ID</label>
                <input
                  type="number"
                  name="visitor"
                  className="form-control"
                  placeholder="Enter visitor ID"
                  value={form.visitor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  className="form-control"
                  placeholder="Type department name"
                  list="departments-list"
                  value={form.department}
                  onChange={handleChange}
                  required
                />
                <datalist id="departments-list">
                  {departments.map((item) => (
                    <option
                      key={item.department_id}
                      value={item.department_name}
                    />
                  ))}
                </datalist>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Employee</label>
                <input
                  type="text"
                  name="employee"
                  className="form-control"
                  placeholder="Type employee name"
                  list="employees-list"
                  value={form.employee}
                  onChange={handleChange}
                  required
                />
                <datalist id="employees-list">
                  {employees.map((item) => (
                    <option
                      key={item.employee_id}
                      value={item.employee_name}
                    />
                  ))}
                </datalist>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Visit Date</label>
                <input
                  type="date"
                  name="visit_date"
                  className="form-control"
                  value={form.visit_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Purpose of Visit</label>
                <textarea
                  name="purpose"
                  className="form-control"
                  rows="4"
                  placeholder="Enter purpose of visit"
                  value={form.purpose}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary px-4">
              Submit Visit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VisitRequest;
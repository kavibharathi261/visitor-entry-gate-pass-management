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
    status: "Pending",
  });

  const token = localStorage.getItem("access");

  useEffect(() => {
    loadDepartments();
    loadEmployees();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await api.get("departments/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDepartments(response.data.data);
    } catch (error) {
      console.log("Department Error:", error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await api.get("employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(response.data.data);
    } catch (error) {
      console.log("Employee Error:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("visit-requests/", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Visit request submitted successfully!");

      setForm({
        visitor: "",
        department: "",
        employee: "",
        visit_date: "",
        purpose: "",
        status: "Pending",
      });
    } catch (error) {
      console.log("Visit Request Error:", error);

      if (error.response) {
        alert(
          "Request failed:\n" +
            JSON.stringify(error.response.data)
        );
      } else {
        alert("Cannot connect to Django server");
      }
    }
  };

  return (
    <div className="container py-4">

      <div className="mb-4">
        <h2>Visit Request</h2>

        <p className="text-muted">
          Submit a request for visitor entry
        </p>
      </div>


      <div className="card shadow-sm border-0">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            Visit Details
          </h5>
        </div>


        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Visitor ID
                </label>

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

                <label className="form-label">
                  Department
                </label>

                <select
                  name="department"
                  className="form-select"
                  value={form.department}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Department
                  </option>

                  {departments.map((department) => (
                    <option
                      key={department.department_id}
                      value={department.department_id}
                    >
                      {department.department_name}
                    </option>
                  ))}

                </select>

              </div>


              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Employee
                </label>

                <select
                  name="employee"
                  className="form-select"
                  value={form.employee}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Employee
                  </option>

                  {employees.map((employee) => (
                    <option
                      key={employee.employee_id}
                      value={employee.employee_id}
                    >
                      {employee.employee_name}
                    </option>
                  ))}

                </select>

              </div>


              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Visit Date
                </label>

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

                <label className="form-label">
                  Purpose of Visit
                </label>

                <textarea
                  name="purpose"
                  className="form-control"
                  rows="4"
                  placeholder="Enter purpose of visit"
                  value={form.purpose}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>

            </div>


            <button
              type="submit"
              className="btn btn-primary px-4"
            >
              Submit Visit Request
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default VisitRequest;
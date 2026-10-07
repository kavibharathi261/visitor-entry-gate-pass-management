import { useState } from "react";
import api from "../api";

function VisitorRegistration() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    id_proof: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("visitors/", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      alert("Visitor registered successfully!");

      console.log(response.data);

      setForm({
        name: "",
        phone: "",
        email: "",
        id_proof: "",
        address: "",
      });
    } catch (error) {
      console.log("Visitor Registration Error:", error);

      if (error.response) {
        alert(
          "Registration failed:\n" +
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
        <h2>Visitor Registration</h2>
        <p className="text-muted">
          Register visitor details for entry management
        </p>
      </div>

      <div className="card shadow-sm border-0">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            Visitor Details
          </h5>
        </div>

        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Visitor Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter visitor name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="col-md-6 mb-3">
                <label className="form-label">
                  ID Proof
                </label>

                <input
                  type="text"
                  name="id_proof"
                  className="form-control"
                  placeholder="Enter ID proof number"
                  value={form.id_proof}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="col-12 mb-3">
                <label className="form-label">
                  Address
                </label>

                <textarea
                  name="address"
                  className="form-control"
                  rows="4"
                  placeholder="Enter visitor address"
                  value={form.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

            </div>


            <div className="d-flex gap-2">

              <button
                type="submit"
                className="btn btn-primary px-4"
              >
                Register Visitor
              </button>

              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() =>
                  setForm({
                    name: "",
                    phone: "",
                    email: "",
                    id_proof: "",
                    address: "",
                  })
                }
              >
                Clear
              </button>

            </div>

          </form>

        </div>
      </div>

    </div>
  );
}

export default VisitorRegistration;
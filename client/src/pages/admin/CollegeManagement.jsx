import React, { useState, useEffect } from "react";
import axios from "axios";

const CollegeManagement = () => {
  const [colleges, setColleges] = useState({
    name: "",
    description: "",
  });

  const [collegeList, setCollegeList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);

  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setColleges({
      ...colleges,
      [e.target.name]: e.target.value,
    });
  };

  const getCollege = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/college/show"
      );

      setCollegeList(res.data.college);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCollege();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!colleges.name || !colleges.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      let res;

      if (isEdit) {
        res = await axios.put(
          `http://localhost:5000/api/college/${editId}`,
          colleges
        );
      } else {
        res = await axios.post(
          "http://localhost:5000/api/college/register",
          colleges
        );
      }

      alert(res.data.msg);

      setColleges({
        name: "",
        description: "",
      });

      setEditId(null);
      setIsEdit(false);

      getCollege();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setColleges({
      name: item.name,
      description: item.description,
    });

    setEditId(item._id);
    setIsEdit(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this college?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/college/${id}`
      );

      alert(res.data.msg);

      getCollege();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setColleges({
      name: "",
      description: "",
    });

    setEditId(null);
    setIsEdit(false);
  };

  const filteredCollege = collegeList.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
const lastIndex = currentPage * itemsPerPage;
const firstIndex = lastIndex - itemsPerPage;

const currentData = filteredCollege.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(filteredCollege.length / itemsPerPage);
  return (
   <div
      style={{
        padding: "30px 20px",
        
        minHeight: "80vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Form Section */}
      <div
        
      
        style={{
          maxWidth: "750px", // reduced width to make the box smaller
          margin: " auto",
          background: "#fff",
          padding: "10px", // reduced padding
          borderRadius: "8px",
         boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
      
        <h2
          style={{
            textAlign: "center",
            color: "#0d6efd",
            marginBottom: "30px",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          {isEdit ? "Update College" : "Add New College"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "#4b5563", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
              College Name
            </label>
            <input
              type="text"
              name="name"
              value={colleges.name}
              onChange={handleChange}
              placeholder="Enter College Name"
              style={{
                width: "100%",
                padding: "9px 11px",
                background: "#f8fafc",
                border: "1px solid transparent",
                borderRadius: "6px",
                outline: "none",
                fontSize: "15px",
                color: "#334155",
                transition: "border 0.2s",
              }}
              onFocus={(e) => e.target.style.border = "1px solid #cbd5e1"}
              onBlur={(e) => e.target.style.border = "1px solid transparent"}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "#4b5563", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
              Description
            </label>
            <textarea
              rows="4"
              name="description"
              value={colleges.description}
              onChange={handleChange}
              placeholder="Enter Description"
              style={{
                width: "100%",
                padding: "11px 11x",
                background: "#f8fafc",
                border: "1px solid transparent",
                borderRadius: "6px",
                outline: "none",
                fontSize: "15px",
                color: "#334155",
                resize: "vertical",
                transition: "border 0.2s",
              }}
              onFocus={(e) => e.target.style.border = "1px solid #cbd5e1"}
              onBlur={(e) => e.target.style.border = "1px solid transparent"}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <button
              type="submit"
              style={{
                width: "auto",
                minWidth: "180px",
                background: "#0d6efd",
                color: "#fff",
                border: "none",
                padding: "7px ",
                borderRadius: "30px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                marginTop: "7px",
              }}
            >
              {isEdit ? "Update College" : "Save College"}
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  width: "auto",
                  minWidth: "220px",
                  background: "#e2e8f0",
                  color: "#475569",
                  border: "none",
                  padding: "9px 11px",
                  borderRadius: "30px",
                  marginTop: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto 0",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
        }}
      >
        <h3
          style={{
            marginBottom: "25px",
            color: "#64748b",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Registered Colleges
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", color: "#475569", fontSize: "14px" }}>
  <select
    value={itemsPerPage}
    onChange={(e) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(1);
    }}
    style={{
      padding: "6px 12px",
      borderRadius: "4px",
      border: "1px solid #cbd5e1",
      marginRight: "8px",
      outline: "none",
      background: "#fff",
      color: "#334155"
    }}
  >
    <option value={10}>10</option>
    <option value={25}>25</option>
    <option value={50}>50</option>
  </select>

  <span>entries per page</span>
</div>

          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
            style={{
              padding: "8px 16px",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              outline: "none",
              width: "250px",
              color: "#334155"
            }}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead
              style={{
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <tr>
                <th style={{ padding: "12px 16px", color: "#64748b", fontSize: "12px", fontWeight: "700", textAlign: "left" }}>S NO. ↕</th>
                <th style={{ padding: "12px 16px", color: "#64748b", fontSize: "12px", fontWeight: "700", textAlign: "left" }}>COLLEGE NAME</th>
                <th style={{ padding: "12px 16px", color: "#64748b", fontSize: "12px", fontWeight: "700", textAlign: "left" }}>DESCRIPTION</th>
                <th style={{ padding: "12px 16px", color: "#64748b", fontSize: "12px", fontWeight: "700", textAlign: "center" }}>CREATED BY ↕</th>
                <th style={{ padding: "12px 16px", color: "#64748b", fontSize: "12px", fontWeight: "700", textAlign: "center" }}>ACTIONS ↕</th>
              </tr>
            </thead>

            <tbody>
              {filteredCollege.length > 0 ? (
               currentData.map((item, index) => (
                  <tr
                    key={item._id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      color: "#475569",
                      fontSize: "14px",
                    }}
                  >
                    <td style={{ padding: "16px", textAlign: "left" }}>{firstIndex + index + 1}</td>
                    <td style={{ padding: "16px", textAlign: "left" }}>{item.name}</td>
                    <td style={{ padding: "16px", textAlign: "left" }}>{item.description}</td>
                    <td style={{ padding: "16px", textAlign: "center" }}>Admin</td>
                    <td style={{ padding: "16px", textAlign: "center" }}>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{
                          background: "#f8fafc",
                          color: "#0d6efd",
                          border: "1px solid #e2e8f0",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={{
                          background: "#fef2f2",
                          color: "#ef4444",
                          border: "1px solid #fee2e2",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          marginLeft: "8px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#64748b",
                      fontSize: "14px"
                    }}
                  >
                    No colleges found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#475569",
            fontSize: "14px",
          }}
        >
          <span>
         Showing {filteredCollege.length === 0 ? 0 : firstIndex + 1} to{" "}
{Math.min(lastIndex, filteredCollege.length)}
of {filteredCollege.length} entries
          </span>

          <div style={{ display: "flex", gap: "4px" }}>
            <button
              style={{ padding: "6px 12px", background: "#f1f5f9", border: "none", borderRadius: "4px", color: "#64748b", cursor: "pointer" }}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >{"«"}</button>
           <button
  onClick={() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }}
  disabled={currentPage === 1}
  style={{
    padding: "6px 12px",
    background: "#f1f5f9",
    border: "none",
    borderRadius: "4px",
    color: "#64748b",
    cursor: currentPage === 1 ? "not-allowed" : "pointer",
  }}
>
  {"‹"}
</button>
            <button
              style={{
                padding: "6px 12px",
                background: "#0d6efd",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              1
            </button>
           <button
  onClick={() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }}
  disabled={currentPage === totalPages}
  style={{
    padding: "6px 12px",
    background: "#f1f5f9",
    border: "none",
    borderRadius: "4px",
    color: "#64748b",
    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
  }}
>
  {"›"}
</button>
           <button
onClick={()=>setCurrentPage(totalPages)}
disabled={currentPage===totalPages}
>
{"»"}
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeManagement;
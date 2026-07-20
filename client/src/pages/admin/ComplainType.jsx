import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Pagination,
} from "react-bootstrap";

const ComplaintType = () => {

  const [complaintType, setComplaintType] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const getComplaint = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/complaint/show"
    );

    setComplaints(res.data.complaint);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  getComplaint();
}, []);

const filteredComplaint = complaints.filter((item) =>
  item.complaintType
    .toLowerCase()
    .includes(search.toLowerCase())
);

const handleSave = async (e) => {
  e.preventDefault();

  if (!complaintType.trim()) {
    alert("Please Enter Complaint Type");
    return;
  }

  try {
    let res;

    if (isEditing) {
      res = await axios.put(
        `http://localhost:5000/api/complaint/${currentId}`,
        {
          complaintType,
        }
      );
    } else {
      res = await axios.post(
        "http://localhost:5000/api/complaint/register",
        {
          complaintType,
        }
      );
    }

    alert(res.data.msg);

    setComplaintType("");
    setIsEditing(false);
    setCurrentId(null);

    getComplaint();
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete Complaint Type?")) return;

  try {
    const res = await axios.delete(
      `http://localhost:5000/api/complaint/${id}`
    );

    alert(res.data.msg);

    getComplaint();
  } catch (err) {
    console.log(err);
  }
};
const handleEdit = (item) => {
  setComplaintType(item.complaintType);
  setCurrentId(item._id);
  setIsEditing(true);
};


  return (
    <Container fluid className="py-4">

      {/* ================= Form Card ================= */}
      <Row className="justify-content-center">
        <Col xl={8}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">

              <h3 className="fw-bold text-center text-primary mb-4">
               {isEditing ? "Update Complaint Type" : "Add Complaint Type"}
              </h3>

              <Form onSubmit={handleSave}>
                <Form.Group
                  className="mb-3"
                  controlId="complaintType"
                >
                  <Form.Label className="fw-semibold">
                    Complaint Type
                  </Form.Label>

                <Form.Control
  type="text"
  name="complaintType"
  placeholder="Enter Complaint Type"
  className="py-2"
  value={complaintType}
  onChange={(e) => setComplaintType(e.target.value)}
/>
                </Form.Group>

                <div className="d-flex justify-content-center mt-4">
                 <Button
  type="submit"
  variant="primary"
  className="px-5 py-2 rounded-pill"
>
  {isEditing ? "Update Type" : "Save Type"}
</Button>
                </div>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ================= Table Card ================= */}

      <Row className="justify-content-center mt-4">
        <Col xl={11}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">

              <h4 className="fw-semibold mb-4">
                Complaint Types List
              </h4>

              {/* Top Bar */}

              <Row className="align-items-center mb-4">

                <Col
                  md={6}
                  className="d-flex align-items-center"
                >
                  <span className="me-2">
                    Show
                  </span>

                  <Form.Select
                    style={{ width: "90px" }}
                  >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </Form.Select>

                  <span className="ms-2">
                    entries
                  </span>
                </Col>

                <Col md={6}>
                  <div className="d-flex justify-content-end align-items-center">

                    <span className="me-2">
                      Search:
                    </span>

                   <Form.Control
  type="text"
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{ width: "220px" }}
/>

                  </div>
                </Col>

              </Row>

              {/* Table */}

              <Table
                bordered
                hover
                responsive
                className="text-center align-middle"
              >

                <thead className="table-primary">

                  <tr>
                    <th style={{ width: "80px" }}>
                      S.No
                    </th>

                    <th>
                      Complaint Type
                    </th>

                    <th style={{ width: "180px" }}>
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody>
  {filteredComplaint.length > 0 ? (
    filteredComplaint.map((item, index) => (
      <tr key={item._id}>
        <td>{index + 1}</td>

        <td>{item.complaintType}</td>

        <td>
          <Button
            size="sm"
            variant="outline-primary"
            className="me-2"
            onClick={() => handleEdit(item)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-center py-3">
        No Complaint Types Found
      </td>
    </tr>
  )}
</tbody>
              </Table>
              <Row className="align-items-center mt-3">

  <Col md={6}>
    <p className="mb-0 text-muted">
Showing {filteredComplaint.length > 0 ? 1 : 0} to {filteredComplaint.length} of {filteredComplaint.length} entries    </p>
  </Col>

  <Col md={6}>
    <div className="d-flex justify-content-end">
      <Pagination className="mb-0">

        <Pagination.Prev disabled />

        <Pagination.Item active>
          1
        </Pagination.Item>

        <Pagination.Next disabled />

      </Pagination>
    </div>
  </Col>

</Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default ComplaintType;
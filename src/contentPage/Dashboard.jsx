import { useState } from "react";
import { mockCharges as initialCharges } from "../mock/Charges";

function Dashboard() {
  const [charges, setCharges] = useState(initialCharges);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCharge, setNewCharge] = useState({
    charge_id: "",
    student_id: "",
    charge_amount: "",
    paid_amount: 0,
    date_charged: "",
  });

  const handleAddClick = () => setShowAddModal(true);
  const handleAddClose = () => setShowAddModal(false);

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewCharge({ ...newCharge, [name]: value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setCharges([
      ...charges,
      {
        ...newCharge,
        charge_amount: parseFloat(newCharge.charge_amount),
        paid_amount: parseFloat(newCharge.paid_amount),
      },
    ]);
    setShowAddModal(false);
    setNewCharge({
      charge_id: "",
      student_id: "",
      charge_amount: "",
      paid_amount: 0,
      date_charged: "",
    });
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCharge, setEditingCharge] = useState(null);

  const handleEditClick = (charge) => {
    setEditingCharge(charge);
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setEditingCharge(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCharge({ ...editingCharge, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCharges(
      charges.map((c) =>
        c.charge_id === editingCharge.charge_id
          ? {
              ...editingCharge,
              charge_amount: parseFloat(editingCharge.charge_amount),
              paid_amount: parseFloat(editingCharge.paid_amount),
            }
          : c,
      ),
    );
    handleEditClose();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chargeToDelete, setChargeToDelete] = useState(null);

  const handleDeleteClick = (charge) => {
    setChargeToDelete(charge);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (chargeToDelete) {
      setCharges(
        charges.filter((c) => c.charge_id !== chargeToDelete.charge_id),
      );
    }
    setShowDeleteModal(false);
    setChargeToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setChargeToDelete(null);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Charge Management Subsystem</h1>
        <button className="btn btn-success" onClick={handleAddClick}>
          Add Charge
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Charge ID</th>
            <th>Student ID</th>
            <th>Charge Amount</th>
            <th>Paid Amount</th>
            <th>Date Charged</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {charges.map((charge) => (
            <tr key={charge.charge_id}>
              <td>{charge.charge_id}</td>
              <td>{charge.student_id}</td>
              <td>${charge.charge_amount.toFixed(2)}</td>
              <td>${charge.paid_amount.toFixed(2)}</td>
              <td>{charge.date_charged}</td>
              <td className="d-flex gap-2 justify-content-center align-items-center">
                <button
                  className="btn btn-primary btn-sm d-flex align-items-center"
                  onClick={() => handleEditClick(charge)}
                >
                  <i className="bi bi-pencil-square me-1"></i> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm d-flex align-items-center"
                  onClick={() => handleDeleteClick(charge)}
                >
                  <i className="bi bi-trash me-1"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Add New Charge</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleAddClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3 text-start">
                    <label className="form-label">Charge ID</label>
                    <input
                      type="text"
                      name="charge_id"
                      className="form-control"
                      value={newCharge.charge_id}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Student ID</label>
                    <input
                      type="text"
                      name="student_id"
                      className="form-control"
                      value={newCharge.student_id}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Charge Amount</label>
                    <input
                      type="number"
                      name="charge_amount"
                      className="form-control"
                      value={newCharge.charge_amount}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Paid Amount</label>
                    <input
                      type="number"
                      name="paid_amount"
                      className="form-control"
                      value={newCharge.paid_amount}
                      onChange={handleAddChange}
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Date Charged</label>
                    <input
                      type="date"
                      name="date_charged"
                      className="form-control"
                      value={newCharge.date_charged}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAddClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Charge
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingCharge && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Charge</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleEditClose}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3 text-start">
                    <label className="form-label">Charge ID</label>
                    <input
                      type="text"
                      name="charge_id"
                      className="form-control"
                      value={editingCharge.charge_id}
                      readOnly
                    />
                  </div>

                  <div className="mb-3 text-start">
                    <label className="form-label">Student ID</label>
                    <input
                      type="text"
                      name="student_id"
                      className="form-control"
                      value={editingCharge.student_id}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="mb-3 text-start">
                    <label className="form-label">Charge Amount</label>
                    <input
                      type="number"
                      name="charge_amount"
                      className="form-control"
                      value={editingCharge.charge_amount}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="mb-3 text-start">
                    <label className="form-label">Paid Amount</label>
                    <input
                      type="number"
                      name="paid_amount"
                      className="form-control"
                      value={editingCharge.paid_amount}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="mb-3 text-start">
                    <label className="form-label">Date Charged</label>
                    <input
                      type="date"
                      name="date_charged"
                      className="form-control"
                      value={editingCharge.date_charged}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleEditClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete charge ID{" "}
                  <strong>{chargeToDelete?.charge_id}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

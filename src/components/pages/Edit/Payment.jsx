import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

const Payment = ({ data, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation here if needed

    setLoading(true);

    // Example: Prepare data for the API call
    const paymentData = {
      paymentDate: e.target.paymentDate.value,
      paymentType,
      receivedAmount,
      customerType,
      note,
    };

    // Simulate API call (replace with actual API call using axios or fetch)
    setTimeout(() => {
      setLoading(false);
      setToastMessage('Payment successfully submitted');
      setShowToast(true);
      refetch(); // Assuming refetch is a function passed as prop to update data after payment
      handleCloseModal();
    }, 1500);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Payment
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="paymentDate">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>

            <Form.Group controlId="paymentType">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                as="select"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="bkash">Bkash</option>
                <option value="nagad">Nagad</option>
                <option value="dutch">Dutch-Bangla</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="receivedAmount">
              <Form.Label>Received Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Received Amount"
                value={receivedAmount}
                onChange={(e) => setReceivedAmount(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="customerType">
              <Form.Label>Customer Type</Form.Label>
              <Form.Control
                as="select"
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
                required
              >
                <option value="">Select Customer Type</option>
                <option value="Walk-in Guest">Walk-in Guest</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="note">
              <Form.Label>Note (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Payment'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast for showing success message */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          minWidth: '250px',
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Payment Status</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default Payment;

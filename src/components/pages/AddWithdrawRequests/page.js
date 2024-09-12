'use client'
import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const AddWithdrawRequests = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const mockTransactions = response.data.map((item, index) => ({
          id: index + 1,
          prManagerName: 'Md. Amir Khan',
          prManagerContact: '01833777657',
          projectName: 'Project Second Home',
          projectLocation: 'California City, CA, USA',
          totalInvestment: Math.floor(Math.random() * 10000),
          ratioCount: Math.floor(Math.random() * 100),
          profitCount: Math.floor(Math.random() * 100),
          withdrawAmount: Math.floor(Math.random() * 1000),
          dueAmount: Math.floor(Math.random() * 500),
          status: index % 2 === 0 ? 'Completed' : 'Pending',
        }));
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast.error('Failed to fetch transactions');
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.prManagerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = id => {
    toast.success(`Opening edit view for transaction id ${id}`);
    // ............................... edit logic here
  };

  const handleViewClick = id => {
    toast.success(`Opening detailed view for transaction id ${id}`);
      // ........................view details logic here
  };

  return (
    <>
      <div className="mb-3 d-flex justify-content-end align-items-center">
        <InputGroup style={{ width: '300px' }}>
          <Form.Control
            type="text"
            placeholder="Search by PR Manager Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button style={{ backgroundColor: '#00bab3', color: 'white' }}>Search</Button>
        </InputGroup>
      </div>

      <Table striped bordered responsive hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>PR Manager</th>
            <th>Project Name</th>
            <th>Total Investment</th>
            <th>Ratio Count</th>
            <th>Profit Count</th>
            <th>Withdraw Amount</th>
            <th>Due Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{indexOfFirstTransaction + index + 1}</td>
              <td>
                <p><strong>Date:</strong> {transaction.date}</p>
                <p><strong>{transaction.prManagerName}</strong></p>
                <p>{transaction.prManagerContact}</p>
              </td>
              <td>
                <p><strong>{transaction.projectName}</strong></p>
                <p>{transaction.projectLocation}</p>
              </td>
              
              <td><strong>{transaction.totalInvestment?.toLocaleString()}</strong></td>
              <td><strong>{transaction.ratioCount}%</strong></td>
              <td><strong>{transaction.profitCount?.toLocaleString()}</strong></td>
              <td><strong>{transaction.withdrawAmount?.toLocaleString()}</strong></td>
              <td><strong>{transaction.dueAmount?.toLocaleString()}</strong></td>
              <td style={{ color: transaction.status === 'Completed' ? 'green' : (transaction.status === 'Pending' ? 'red' : 'inherit') }}>
                {transaction.status}
              </td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEditClick(transaction.id)} style={{ backgroundColor: 'transparent', border: 'none' }}>
                  <FaRegEdit style={{ fontSize: '16px' }} /> 
                </Button>{' '}
                <Button variant="primary" size="sm" onClick={() => handleViewClick(transaction.id)} style={{ backgroundColor: 'transparent', border: 'none' }}>
                  <FaRegEye style={{ fontSize: '16px' }} /> 
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AddWithdrawRequests;

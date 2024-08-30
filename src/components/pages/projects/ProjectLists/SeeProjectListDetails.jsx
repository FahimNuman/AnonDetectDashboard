import React from "react";
import { Modal, Button, Row, Col, Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMoneyBillWave, faFile, faInfoCircle, faCalendar, faChartLine, faImage } from '@fortawesome/free-solid-svg-icons';
import './SeeProjectListDetails.css'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles

const formatDate = (date) => {
  if (!date) return "";
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const SeeProjectListDetails = ({
  showDetailsModal,
  setShowDetailsModal,
  project,
}) => {
  const handleClose = () => {
    setShowDetailsModal(false);
  };

  return (
    <Modal
      show={showDetailsModal}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      centered
      dialogClassName="custom-modal" // Add custom class for width
    >
      <Modal.Header closeButton className="" style={{backgroundColor:"#00C194"}}>
        <Modal.Title className="" style={{color:"white"}}>{project?.projectTitle || "Project Details"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="" style={{color:"#00C194"}}>General Information</Card.Title>
                <ListGroup>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#007bff' }} /> 
                    <strong> Project Address:</strong> {project?.projectAddress}
                  </ListGroup.Item>
                  {/* <ListGroup.Item>
                    <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: '#28a745' }} /> 
                    <strong>  Project AssetValue :</strong>  {project?. projectAssetValue?.toLocaleString()} Tk
                  </ListGroup.Item>
                  */}
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: '#28a745' }} /> 
                    <strong> Total Investment :</strong>  {project?.totalProjectValue?.toLocaleString()} Tk
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: '#28a745' }} /> 
                    <strong> Per Share :</strong>  {project?.perShareValue?.toLocaleString()} Tk
                  </ListGroup.Item>
                 
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Minimum Share :</strong>  {project?.minimumShareValue?.toLocaleString()} 
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Available Total Purchase:</strong> {project?.availableTotalShare?.toLocaleString()} shares
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon  icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Total Share:</strong>  {project?.totalShareValue?.toLocaleString()} 
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Buy Total Share :</strong>  {project?.buyTotalShare?.toLocaleString()} 
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#dc3545' }} /> 
                    <strong> Status:</strong> {project?.status}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ color: '#dc3545' }} /> 
                    <strong> Project Type:</strong> {project?.projectType?.name}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="" style={{color:"#00C194"}}>About the Project</Card.Title>
                <p><strong>Market Information:</strong> {project?.aboutMarket}</p>
                <p><strong>City Information:</strong> {project?.aboutCity}</p>
                <p><strong>About Property District:</strong> {project?.aboutPropertyDistrict}</p>
                <p><strong>About Property City:</strong> {project?.aboutPropertyCity}</p>
                <p><strong>Management Info:</strong> {project?.managementInfo}</p>
                <p><strong>Exit Strategy:</strong> {project?.exitStrategy}</p>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="" style={{color:"#00C194"}}>Investment Dates</Card.Title>
                <ListGroup>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faCalendar} style={{ color: '#17a2b8' }} /> 
                    <strong> Investment Start Date:</strong> {formatDate(project?.investmentStartDate)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faCalendar} style={{ color: '#17a2b8' }} /> 
                    <strong> Investment End Date:</strong> {formatDate(project?.investmentEndDate)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faCalendar} style={{ color: '#17a2b8' }} /> 
                    <strong> First Return Date:</strong> {formatDate(project?.firstReturnDate)}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="" style={{ color: "#00C194" }}>Project Picture</Card.Title>
              {project?.projectPicture?.length > 0 ? (
                <Swiper spaceBetween={10} slidesPerView={1} pagination={{ clickable: true }}>
                  {project.projectPicture.map((image, index) => (
                    <SwiperSlide key={index}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={`Project ${index + 1}`}
                        className="img-fluid rounded"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p>No images available.</p>
              )}
            </Card.Body>
          </Card>
            {project?.googleDriveLinks && (
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title className="" style={{color:"#00C194"}}>Google Drive Links</Card.Title>
                  <ListGroup>
                    {project.googleDriveLinks.map((link, index) => (
                      <ListGroup.Item key={index}>
                        <FontAwesomeIcon icon={faFile} style={{ color: '#6f42c1' }} /> 
                        <a
                          href={link.googleDriveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Document {index + 1}
                        </a>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            <Card className="mb-3">
              <Card.Body>
                <Card.Title  className="" style={{color:"#00C194"}}>Financial Details</Card.Title>
                <ListGroup>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: '#28a745' }} /> 
                    <strong> Notary Fee:</strong>  {project?.notaryFee?.toLocaleString()} Tk
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: '#28a745' }} /> 
                    <strong> Sharikana Fee:</strong>  {project?.SharikanaFee?.toLocaleString()} Tk
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Yearly Return :</strong> {project?.yearlyReturnValue}%
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Half Yearly Return :</strong> {project?.halfYearlyReturnValue}%
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Monthly Return :</strong> {project?.monthlyReturnValue}%
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Average Return Value:</strong> {project?.averageReturnValue}%
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Project Annual Capital Appreciation:</strong> {project?.projectAnnualCapitalAppreciation}%
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faChartLine} style={{ color: '#ffc107' }} /> 
                    <strong> Total Profit Count:</strong> {project?.totalProfitCount}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: '#28a745' }} /> 
                    <strong> Paid Profit Amount:</strong> {project?.payOfProfitAmount?.toLocaleString()} Tk 
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: '#28a745' }} /> 
                    <strong> Due Profit Amount:</strong>  {project?.dueProfitAmount?.toLocaleString()} Tk
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SeeProjectListDetails;

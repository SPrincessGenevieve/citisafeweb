import React, { useEffect } from "react";
import Navbar from "../../Navbar";
import "./styles.css";
import {
  Add,
  Download,
  Search,
  Check,
  Close,
  Edit,
  RecordVoiceOver,
  VoiceOverOff,
} from "@mui/icons-material";
import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Modal,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import ViolationTable from "./../../JSON/ViolationTable.json";
import StatusSelection from "../../components/StatusSelection";
import stats from "./../../JSON/Stats.json";
import RoundButton from "../../components/RoundButton";
import { useSelector } from "react-redux";
import axios from '../../plugins/axios'

const cellStylesHeader = {
  cell: {
    color: "black",
    width: 150,
    height: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
};

const cellStylesBody = {
  cell: {
    color: "black",
    height: "auto",
    textAlign: "left",
    width: 150,
    height: 40,
    textAlign: "center",
  },
};

export default function ViolationList(props) {

  // JAYDE modifications

  // get token
  const Token = useSelector((state) => state.auth.token)

  // penalty
  const [penaltyData, setPenaltyData] = useState([])

  const [addPenalty,setAddPenalty] = useState({
    description: '',
    amount: '',
    status: 'Active',
  })

  // edit penalty
  const [editPenaltyStatus, setEditPenaltyStatus] = useState('')
  
  const handleStatusChange = (newStatus) => {
    setEditPenaltyStatus(newStatus)
  };


  // get violations
  const [violationData, setViolationData] = useState([])
  
  // add violations
  const [addViolation, setAddViolation] = useState({
    violation_type: '',
    penalty_ID: '',
  })

  // edit violations
  const [editViolation, setEditViolation] = useState('')


  const handleAddViolation = () => {

      axios.post('ticket/violation/', addViolation, {
        headers: {
          Authorization: `token ${Token}`
        }
      }).then((response) => {
        window.alert("Violation added successfully!");

        setAddViolation({
          violation_type: '',
          penalty_ID: '',
        })
        handleCloseModal();

      }).catch((error) => {
        window.alert("Something went wrong, Please Try Again Later");
        handleCloseModal();
        console.log(addViolation)
      })

  }




  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(ViolationTable);
  const [filteredDataViolation, setFilteredDataViolation] =
    useState(penaltyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [penaltyPage, setPenaltyPage] = useState(1);
  const [penalty, setPenalty] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [violationDescription, setViolationDescription] = useState("");
  const [selectedPenalty, setSelectedPenalty] = useState("");

  const rowsPerPage = 7;

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const currentRows = filteredData.slice(firstRowIndex, lastRowIndex);

  const lastRowIndexPenalty = penaltyPage * rowsPerPage;
  const firstRowIndexPenalty = lastRowIndexPenalty - rowsPerPage;
  const penaltyRows = filteredDataViolation.slice(
    firstRowIndexPenalty,
    lastRowIndexPenalty
  );

  const nextRows = filteredDataViolation.slice(firstRowIndex, lastRowIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const [editingRow, setEditingRow] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {

    axios.post('ticket/penalty/', addPenalty, {
      headers: {
        Authorization: `token ${Token}`
      }
    }).then((response) => {
      window.alert("Penalty added successfully!");

      setAddPenalty({
        description: '',
        amount: '',
        status: 'Active',
      })

      handleCloseModal();
    }).catch((error) => {
      window.alert("Something went wrong, Please Try Again Later");
      handleCloseModal();
      console.log(addPenalty)
    })

  };



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePagePenaltyChange = (page) => {
    setPenaltyPage(page);
  };

  const handleEdit = (rowId) => {
    setEditingRow(rowId);
  };

  const handleDelete = (rowId) => {
    setDeletingRow(rowId);
  };

  const handleSave = () => {
    // Logic to save changes here
    setEditingRow(null);
  };

  const handleCheck = () => {
    // Logic to confirm deletion here
    setDeletingRow(null);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
  };

  const handleCancelDelete = () => {
    setDeletingRow(null);
  };

  const handleDownload = () => {
    window.alert("Downloaded successfully");
  };

  useEffect(() => {
    axios.get('ticket/penalty/', {
      headers: {
        Authorization: `token ${Token}`
      }
    }).then((response) => {
      setPenaltyData(response.data);
    }).catch(error => {
      console.log(error);
    });


    axios.get('ticket/violation/', {
      headers: {
        Authorization: `token ${Token}`
      }
    }).then((response) => {
      setViolationData(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, [Token]); // Specify dependencies that trigger the effect


  return (
    <div className="container1">
      <Navbar></Navbar>
      <div className="first-layer-list">
        <div className="buttons-container">
          <>
            <RoundButton
              marginRight={2}
              className={penalty ? "active" : ""}
              onClick={() => setPenalty(true)}
              title={"PENALTY"}
              height={50}
              backgroundColor={penalty ? "#3E7C1F" : "transparent"}
              color={!penalty ? "#3E7C1F" : "white"}
            ></RoundButton>
            <RoundButton
              className={!penalty ? "active" : ""}
              onClick={() => setPenalty(false)}
              title={"VIOLATION"}
              height={50}
              backgroundColor={!penalty ? "#3E7C1F" : "transparent"}
              color={!penalty ? "white" : "#3E7C1F"}
            ></RoundButton>
          </>
        </div>
        {penalty ? (
          <>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              closeAfterTransition
            >
              <Fade in={openModal}>
                <div className="modal-paper">
                  <div className="modal-paper-2">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <Button
                        onClick={handleCloseModal}
                        style={{ display: "flex" }}
                      >
                        <Close style={{ color: "red" }}></Close>
                      </Button>
                    </div>
                    <h2>Add Penalty</h2>

                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                    >
                      <TextField
                        label="Penalty Description"
                        variant="outlined"
                        fullWidth
                        value={addPenalty.description}
                        onChange={(e) =>
                          setAddPenalty({
                            ...addPenalty, description: e.target.value
                          })
                        }
                        style={{ marginBottom: 20 }}
                      />
                      <TextField
                        label="Amount"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={addPenalty.amount}
                        onChange={(e) =>
                          setAddPenalty({
                            ...addPenalty, amount: e.target.value
                          })
                        }
                        style={{ marginBottom: 20 }}
                      />                      
                      <TextField
                        label="Penalty Status"
                        variant="outlined"
                        fullWidth
                        value={addPenalty.status}
                        disabled
                        style={{ marginBottom: 20 }}
                      />
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#3E7C1F",
                          color: "white",
                          height: 50,
                        }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </Fade>
            </Modal>
            <div className="search-list-con">
              <div className="search-container-user">
                <Search
                  className="search-icon-user"
                  style={{ position: "absolute", left: "2%", marginTop: 10 }}
                ></Search>
                <input value={searchQuery} className="search-box-user"></input>
                <Button
                  className="add-user-btn"
                  onClick={handleOpenModal}
                  style={{
                    backgroundColor: "#3E7C1F",
                    borderRadius: 40,
                    color: "white",
                    paddingRight: 10,
                    paddingLeft: 10,
                    height: 40,
                    marginLeft: 10,
                  }}
                >
                  <Add style={{}} />
                  {window.innerWidth <= 600 ? null : "ADD PENALTY"}
                </Button>
                <Button
                  className="add-user-btn"
                  onClick={handleDownload}
                  style={{
                    backgroundColor: "#3E7C1F",
                    borderRadius: 40,
                    color: "white",
                    paddingRight: 10,
                    paddingLeft: 10,
                    height: 40,
                    marginLeft: 10,
                  }}
                >
                  <Download style={{}} />
                  {window.innerWidth <= 600 ? null : "DOWNLOAD"}
                </Button>
              </div>
            </div>
            <div className="table-conatiner-user">
              <div className="tab-con-2-user">
                <TableContainer>
                  <Table className="table">
                    <TableHead>
                      <TableRow className="table-row">
                        <TableCell style={cellStylesHeader.cell}>ID</TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Description
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Amount
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Date Issued
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Status
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {penaltyData.map((user, index) => (
                        <TableRow
                          className={`table-body-row ${
                            index % 2 === 0 ? "even-row" : "odd-row"
                          }`}
                          key={index}
                        >
                          <TableCell style={cellStylesBody.cell}>
                            {user.id}
                          </TableCell>
                          <TableCell style={cellStylesBody.cell}>
                            {user.description}
                          </TableCell>
                          <TableCell style={cellStylesBody.cell}>
                            {user.amount}
                          </TableCell>
                          <TableCell style={cellStylesBody.cell}>
                            {user.date}
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            <div className="status-container">
                              <p
                                style={{
                                  flex: 1,
                                  backgroundColor:
                                    user.status === "Active"
                                      ? "#E2F0D9"
                                      : user.status === "Deactivated"
                                      ? "#FFD1D1"
                                      : "#EBF9F1",
                                  color:
                                    user.status === "Active"
                                      ? "#649F3F"
                                      : user.status === "Deactivated"
                                      ? "#D00000"
                                      : "#1F9254",
                                  width: 100,
                                  height: 15,
                                  padding: 10,
                                  textAlign: "center",
                                  borderRadius: 20,
                                }}
                              >
                                {editingRow === user.id ? (
                                  <div
                                    className={
                                      index % 2 === 0 ? "even-row" : "odd-row"
                                    }
                                    style={{
                                      marginTop: -15,
                                      width: "100%",
                                    }}
                                  >
                                    <div
                                      className={`bg-status ${
                                        index % 2 === 0 ? "even-row" : "odd-row"
                                      }`}
                                    >
                                      <StatusSelection
                                        label={"Select Status"}
                                        labelSelect={"Select Status"}
                                        json={stats}
                                        onStatusChange={handleStatusChange}
                                      ></StatusSelection>


                                    </div>
                                  </div>
                                ) : user.status === "Active" ? (
                                  `Active`
                                ) : (
                                  <span>{user.status}</span>
                                )}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell
                            className="row"
                            style={cellStylesBody.cell}
                          >
                            {editingRow === user.id ? (
                              <>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                  onClick={() => {

                                    const formData = {
                                      id: user.id,
                                      status: editPenaltyStatus
                                    };
                                    console.log(formData)

                                    axios.patch(`ticket/penalty/${user.id}/`, formData, {
                                      headers: {
                                        Authorization: `token ${Token}`
                                      }
                                    }).then((response) => {
                                      window.alert("Successfully Edit Penalty Status")
                                      handleSave(user.id)
                                    }).catch((error) => {
                                      window.alert("Unsuccessfully Edit Penalty Status")
                                      console.log(error)
                                    })


                                  }}
                                >
                                  <Check style={{ height: 25 }} />
                                </Button>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                  }}
                                  onClick={handleCancelEdit}
                                >
                                  <Close style={{ height: 25 }} />
                                </Button>
                              </>
                            ) : deletingRow === user.id ? (
                              <>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                  onClick={() => handleCheck(user.id)}
                                >
                                  <Check style={{ height: 25 }} />
                                </Button>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                  }}
                                  onClick={handleCancelDelete}
                                >
                                  <Close style={{ height: 25 }} />
                                </Button>
                              </>
                            ) : (
                              <>
                                {user.status === "Active" ? (
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: "transparent",
                                      boxShadow: "none",
                                      color: "green",
                                      marginLeft: 10,
                                    }}
                                    onClick={() => handleEdit(user.id)}
                                  >
                                    <RecordVoiceOver style={{ height: 25 }} />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="contained"
                                    style={{
                                      backgroundColor: "transparent",
                                      boxShadow: "none",
                                      color: "red",
                                      marginLeft: 10,
                                    }}
                                    onClick={() => handleEdit(user.id)}
                                  >
                                    <VoiceOverOff style={{ height: 25 }} />
                                  </Button>
                                )}
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="pagination">
                <button
                  style={{ backgroundColor: "transparent", border: 0 }}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                >
                  <p>Previous</p>
                </button>
                {Array.from({ length: totalPages }, (_, index) => {
                  if (
                    totalPages <= 4 ||
                    index + 1 === 1 ||
                    index + 1 === totalPages ||
                    Math.abs(currentPage - (index + 1)) <= 1
                  ) {
                    return (
                      <button
                        style={{
                          border: 0,
                          marginRight: 10,
                          height: 40,
                          width: 40,
                          color: currentPage === index + 1 ? "white" : "black",
                          borderRadius: 10,
                          backgroundColor:
                            currentPage === index + 1 ? "#3e7c1f" : "#e0e0e0",
                          fontSize: 20,
                        }}
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={
                          currentPage === index + 1
                            ? "activePage"
                            : "inactivePage"
                        }
                      >
                        {index + 1}
                      </button>
                    );
                  } else if (Math.abs(currentPage - (index + 1)) === 2) {
                    return <span key={index}>...</span>;
                  }
                  return null;
                })}
                <button
                  style={{ backgroundColor: "transparent", border: 0 }}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(totalPages)}
                >
                  <p>Next</p>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              closeAfterTransition
            >
              <Fade in={openModal}>
                <div className="modal-paper">
                  <div className="modal-paper-2">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <Button
                        onClick={handleCloseModal}
                        style={{ display: "flex" }}
                      >
                        <Close style={{ color: "red" }}></Close>
                      </Button>
                    </div>
                    <h2>Add Violation</h2>

                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                    >
                      <TextField
                        label="Violation Description"
                        variant="outlined"
                        fullWidth
                        value={addViolation.violation_type}
                        onChange={(e) =>
                          setAddViolation({
                            ...addViolation, violation_type: e.target.value
                          })
                        }
                        style={{ marginBottom: 20 }}
                      />
                      <FormControl
                        style={{ marginBottom: 20 }}
                        variant="outlined"
                        fullWidth
                      >
                        <InputLabel id="penalty-label">
                          Select Penalty
                        </InputLabel>
                        <Select
                          labelId="penalty-label"
                          id="penalty"
                          value={addViolation.penalty_ID}
                          onChange={(e) => setAddViolation({
                            ...addViolation, penalty_ID: e.target.value
                          })}
                          label="Select Penalty"
                        >
                          {penaltyData
                            .filter((user) => user.status === "Active")
                            .map((user, index) => (
                              <MenuItem key={index} value={user.id}>
                                {user.description}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#3E7C1F",
                          color: "white",
                          height: 50,
                        }}
                        onClick={handleAddViolation}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </Fade>
            </Modal>
            <div className="search-list-con">
              <div className="search-container-user">
                <Search
                  className="search-icon-user"
                  style={{ position: "absolute", left: "2%", marginTop: 10 }}
                ></Search>
                <input value={searchQuery} className="search-box-user"></input>
                <Button
                  className="add-user-btn"
                  onClick={handleOpenModal}
                  style={{
                    backgroundColor: "#3E7C1F",
                    borderRadius: 40,
                    color: "white",
                    paddingRight: 10,
                    paddingLeft: 10,
                    height: 40,
                    marginLeft: 10,
                  }}
                >
                  <Add style={{}} />
                  {window.innerWidth <= 600 ? null : "ADD VIOLATION"}
                </Button>
                <Button
                  className="add-user-btn"
                  onClick={handleDownload}
                  style={{
                    backgroundColor: "#3E7C1F",
                    borderRadius: 40,
                    color: "white",
                    paddingRight: 10,
                    paddingLeft: 10,
                    height: 40,
                    marginLeft: 10,
                  }}
                >
                  <Download style={{}} />
                  {window.innerWidth <= 600 ? null : "DOWNLOAD"}
                </Button>
              </div>
            </div>
            <div className="table-conatiner-user">
              <div className="tab-con-2-user">
                <TableContainer>
                  <Table className="table">
                    <TableHead>
                      <TableRow className="table-row">
                        <TableCell style={cellStylesHeader.cell}>ID</TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Description
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Penalty ID
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Penalty Description
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {violationData.map((user, index) => (
                        <TableRow
                          className={`table-body-row ${
                            index % 2 === 0 ? "even-row" : "odd-row"
                          }`}
                          key={index}
                        >
                          <TableCell style={cellStylesBody.cell}>
                            {user.id}
                          </TableCell>
                          <TableCell style={cellStylesBody.cell}>
                            {user.violation_type}
                          </TableCell>
                          <TableCell style={cellStylesBody.cell}>
                            {user.penalty_ID}
                          </TableCell>
                          <TableCell style={cellStylesBody.cell}>
                            {editingRow === user.id ? (
                              <div className="input-css-container">
                                <FormControl
                                  variant="outlined"
                                  fullWidth
                                >
                                  <InputLabel id="penalty-label">
                                    Select Penalty
                                  </InputLabel>
                                  <Select
                                    labelId="penalty-label"
                                    id="penalty"
                                    value={editViolation}
                                    onChange={(e) => setEditViolation(e.target.value)}
                                    label="Select Penalty"
                                  >
                                    {penaltyData
                                      .filter((user) => user.status === "Active")
                                      .map((user, index) => (
                                        <MenuItem key={index} value={user.id}>
                                          {user.description}
                                        </MenuItem>
                                      ))}
                                  </Select>
                                </FormControl>
                              </div>
                            ) : user.status === "Active" ? (
                              `Active`
                            ) : (
                              <p>{user.penalty_info.description}</p>
                            )}
                          </TableCell>

                          <TableCell
                            className="row"
                            style={cellStylesBody.cell}
                          >
                            {editingRow === user.id ? (
                              <>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                  onClick={() => {
                                    const formData = {
                                      id: user.id,
                                      penalty_ID: editViolation
                                    };
                                    console.log(formData)

                                    axios.patch(`ticket/violation/${user.id}/`, formData, {
                                      headers: {
                                        Authorization: `token ${Token}`
                                      }
                                    }).then((response) => {
                                      window.alert("Successfully Edit Violation")
                                      handleSave(user.id)
                                    }).catch((error) => {
                                      window.alert("Unsuccessfully Edit Penalty Status")
                                      console.log(error)
                                    })                                    
                                  }}
                                >
                                  <Check style={{ height: 25 }} />
                                </Button>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                  }}
                                  onClick={handleCancelEdit}
                                >
                                  <Close style={{ height: 25 }} />
                                </Button>
                              </>
                            ) : deletingRow === user.id ? (
                              <>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                  onClick={() => handleCheck(user.id)}
                                >
                                  <Check style={{ height: 25 }} />
                                </Button>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                  }}
                                  onClick={handleCancelDelete}
                                >
                                  <Close style={{ height: 25 }} />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                  onClick={() => handleEdit(user.id)}
                                >
                                  <Edit style={{ height: 25 }} />
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="pagination">
                <button
                  style={{ backgroundColor: "transparent", border: 0 }}
                  disabled={currentPage === 1}
                  onClick={() => handlePagePenaltyChange(1)}
                >
                  <p>Previous</p>
                </button>
                {Array.from({ length: totalPages }, (_, index) => {
                  if (
                    totalPages <= 4 ||
                    index + 1 === 1 ||
                    index + 1 === totalPages ||
                    Math.abs(penaltyPage - (index + 1)) <= 1
                  ) {
                    return (
                      <button
                        style={{
                          border: 0,
                          marginRight: 10,
                          height: 40,
                          width: 40,
                          color: penaltyPage === index + 1 ? "white" : "black",
                          borderRadius: 10,
                          backgroundColor:
                            penaltyPage === index + 1 ? "#3e7c1f" : "#e0e0e0",
                          fontSize: 20,
                        }}
                        key={index}
                        onClick={() => handlePagePenaltyChange(index + 1)}
                        className={
                          penaltyPage === index + 1
                            ? "activePage"
                            : "inactivePage"
                        }
                      >
                        {index + 1}
                      </button>
                    );
                  } else if (Math.abs(penaltyPage - (index + 1)) === 2) {
                    return <span key={index}>...</span>;
                  }
                  return null;
                })}
                <button
                  style={{ backgroundColor: "transparent", border: 0 }}
                  disabled={penaltyPage === totalPages}
                  onClick={() => handlePagePenaltyChange(totalPages)}
                >
                  <p>Next</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

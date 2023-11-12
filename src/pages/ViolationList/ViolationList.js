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
  ArrowBackIos,
  ArrowForwardIos,
  Delete,
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
import StatusSelection from "../../components/StatusSelection";
import stats from "./../../JSON/Stats.json";
import RoundButton from "../../components/RoundButton";
import { useSelector } from "react-redux";
import axios from "../../plugins/axios";
import * as XLSX from "xlsx";

const cellStylesHeader = {
  cell: {
    color: "black",
    width: 150,
    height: 15,
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
  const Token = useSelector((state) => state.auth.token);
  const [penaltyData, setPenaltyData] = useState([]);
  const [editPenaltyStatus, setEditPenaltyStatus] = useState("");
  const [violationData, setViolationData] = useState([]);
  const [editViolation, setEditViolation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [penalty, setPenalty] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);
  const [addPenalty, setAddPenalty] = useState({
    description: "",
    amount: "",
    status: "Active",
  });

  //PENALTY TABLE PAGINATION
  const [searchQueryPenalty, setSearchQueryPenalty] = useState("");
  const [currentPagePenalty, setCurrentPagePenalty] = useState(1);
  const rowsPerPagePenalty = 5;
  const lastPageIndexPenalty = Math.ceil(
    penaltyData.length / rowsPerPagePenalty
  );
  const startIndexPenalty = (currentPagePenalty - 1) * rowsPerPagePenalty;
  const endIndexPenalty = Math.min(
    startIndexPenalty + rowsPerPagePenalty,
    penaltyData.length
  );

  const totalPagesPenalty = Math.ceil(penaltyData.length / rowsPerPagePenalty);

  //VIOLATION TABLE PAGINATION
  const [searchQueryViolation, setSearchQueryViolation] = useState("");
  const [currentPageViolation, setCurrentPageViolation] = useState(1);
  const rowsPerPageViolation = 6;
  const lastPageIndexViolation = Math.ceil(
    violationData.length / rowsPerPageViolation
  );
  const startIndexViolation = (currentPageViolation - 1) * rowsPerPageViolation;
  const endIndexViolation = Math.min(
    startIndexViolation + rowsPerPageViolation,
    violationData.length
  );
  const totalPagesViolation = Math.ceil(
    violationData.length / rowsPerPageViolation
  );

  
  const filteredPenaltyData = penaltyData.filter((penalty) =>
    penalty.description.toLowerCase().includes(searchQueryPenalty.toLowerCase())
  );
  const filteredViolationData = violationData.filter(
    (violation) =>
      violation &&
      violation.violation_type
        .toLowerCase()
        .includes(searchQueryViolation.toLowerCase())
  );

  const visiblePenaltyData = filteredPenaltyData.slice(
    startIndexPenalty,
    endIndexPenalty
  );

  const visibleViolationData = filteredViolationData.slice(
    startIndexViolation,
    endIndexViolation
  );

  const handleSearchViolation = (event) => {
    setSearchQueryViolation(event.target.value);
  };

  const handleSearchPenalty = (event) => {
    setSearchQueryPenalty(event.target.value);
  };

  const handlePageChangePenalty = (page) => {
    console.log("Changing page to:", page);
    setCurrentPagePenalty(page);
  };

  const handlePageChangeViolation = (page) => {
    console.log("Changing page to:", page);
    setCurrentPageViolation(page);
  };

  const nextPageViolation = () => {
    setCurrentPageViolation((prevPage) =>
      Math.min(prevPage + 1, lastPageIndexViolation)
    );
  };

  const prevPageViolation = () => {
    setCurrentPageViolation((prevPage) => Math.max(prevPage - 1, 1));
  };

  const nextPagePenalty = () => {
    setCurrentPagePenalty((prevPage) =>
      Math.min(prevPage + 1, lastPageIndexPenalty)
    );
  };

  const prevPagePenalty = () => {
    setCurrentPagePenalty((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleStatusChange = (newStatus) => {
    setEditPenaltyStatus(newStatus);
  };

  const [addViolation, setAddViolation] = useState({
    violation_type: "",
    penalty_ID: "",
  });

  const handleAddViolation = () => {
    axios
      .post("ticket/violation/", addViolation, {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        setAddViolation({
          violation_type: "",
          penalty_ID: "",
        });
        handleCloseModal();
        window.location.reload()
      })
      .catch((error) => {
        window.alert("Something went wrong, Please Try Again Later");
        handleCloseModal();
        console.log(addViolation);
      });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    axios
      .post("ticket/penalty/", addPenalty, {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {

        setAddPenalty({
          description: "",
          amount: "",
          status: "Active",
        });

        handleCloseModal();
        window.location.reload()

      })
      .catch((error) => {
        window.alert("Something went wrong, Please Try Again Later");
        handleCloseModal();
        console.log(addPenalty);
      });
  };

  const handleEdit = (rowId) => {
    setEditingRow(rowId);
  };

  const handleSave = () => {
    setEditingRow(null);
  };

  const handleCheck = () => {
    setDeletingRow(null);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
  };

  const handleCancelDelete = () => {
    setDeletingRow(null);
  };

  const handleDownloadPenalty = () => {
    const exportData = filteredPenaltyData.map((item) => ({
      ID: item.id,
      DESCRIPTION: item.description,
      AMOUNT: item.amount,
      DATE_ISSUED: item.date,
      STATUS: item.status,
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "PENALTY TABLE");

    const excelDataURI = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64",
    });

    const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelDataURI}`;

    const a = document.createElement("a");
    a.href = dataUri;
    a.download = "penalty_tabel.xlsx";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.alert("Downloaded successfully");
  };

  const handleDownloadViolation = () => {
    const exportData = filteredViolationData.map((item) => ({
      ID: item.id,
      DESCRIPTION: item.violation_type,
      PENALTY_ID: item.penalty_ID,
      DATE_ISSUED: item.penalty_info.description,
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "VIOLATION TABLE");

    const excelDataURI = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64",
    });

    const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelDataURI}`;

    const a = document.createElement("a");
    a.href = dataUri;
    a.download = "violatioin_table.xlsx";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.alert("Downloaded successfully");
  };

  useEffect(() => {
    axios
      .get("ticket/penalty/", {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        setPenaltyData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("ticket/violation/", {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setViolationData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Token]);

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
                            ...addPenalty,
                            description: e.target.value,
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
                            ...addPenalty,
                            amount: e.target.value,
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
                <input
                  value={searchQueryPenalty}
                  className="search-box-user"
                  onChange={handleSearchPenalty}
                />
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
                  onClick={handleDownloadPenalty}
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
                      {visiblePenaltyData.map((user, index) => (
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
                                      : "#FFD1D1",
                                  color:
                                    user.status === "Active"
                                      ? "#649F3F"
                                      : user.status === "Deactivated"
                                      ? "#D00000"
                                      : "#DC3535",
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
                                      status: editPenaltyStatus,
                                    };
                                    console.log(formData);

                                    axios
                                      .patch(
                                        `ticket/penalty/${user.id}/`,
                                        formData,
                                        {
                                          headers: {
                                            Authorization: `token ${Token}`,
                                          },
                                        }
                                      )
                                      .then((response) => {
                                        handleSave(user.id);
                                        window.location.reload()

                                      })
                                      .catch((error) => {
                                        window.alert(
                                          "Unsuccessfully Edit Penalty Status"
                                        );
                                        console.log(error);
                                      });
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
                {/*PAGINATION STARTS HERE*/}
                <div className="label-page">
                  <Button
                    style={{ backgroundColor: "transparent", border: 0 }}
                    disabled={currentPagePenalty === 1}
                    onClick={prevPagePenalty}
                  >
                    PREVIOUS
                  </Button>
                  {Array.from({ length: totalPagesPenalty }, (_, index) => {
                    if (
                      totalPagesPenalty <= 4 ||
                      index + 1 === 1 ||
                      index + 1 === totalPagesPenalty ||
                      Math.abs(currentPagePenalty - (index + 1)) <= 1
                    ) {
                      return (
                        <button
                          style={{
                            border: 0,
                            marginRight: 10,
                            height: 40,
                            width: 40,
                            color:
                              currentPagePenalty === index + 1
                                ? "white"
                                : "black",
                            borderRadius: 10,
                            backgroundColor:
                              currentPagePenalty === index + 1
                                ? "#3e7c1f"
                                : "#e0e0e0",
                            fontSize: 20,
                          }}
                          key={index}
                          onClick={() => handlePageChangePenalty(index + 1)}
                          className={
                            currentPagePenalty === index + 1
                              ? "activePage"
                              : "inactivePage"
                          }
                        >
                          {index + 1}
                        </button>
                      );
                    } else if (
                      Math.abs(currentPagePenalty - (index + 1)) === 2
                    ) {
                      return <span key={index}>...</span>;
                    }
                    return null;
                  })}
                  <Button
                    style={{ backgroundColor: "transparent", border: 0 }}
                    disabled={currentPagePenalty === lastPageIndexPenalty}
                    onClick={nextPagePenalty}
                  >
                    NEXT
                  </Button>
                </div>
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
                            ...addViolation,
                            violation_type: e.target.value,
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
                          onChange={(e) =>
                            setAddViolation({
                              ...addViolation,
                              penalty_ID: e.target.value,
                            })
                          }
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
                <input
                  value={searchQueryViolation}
                  className="search-box-user"
                  onChange={handleSearchViolation}
                />
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
                  onClick={handleDownloadViolation}
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
                      {visibleViolationData
                        .filter((user) => user.penalty_info.status === "Active")
                        .map((user, index) => (
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
                                  <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="penalty-label">
                                      Select Penalty
                                    </InputLabel>
                                    <Select
                                      labelId="penalty-label"
                                      id="penalty"
                                      value={editViolation}
                                      onChange={(e) =>
                                        setEditViolation(e.target.value)
                                      }
                                      label="Select Penalty"
                                    >
                                      {penaltyData
                                        .filter(
                                          (user) => user.status === "Active"
                                        )
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
                                        penalty_ID: editViolation,
                                      };
                                      console.log(formData);

                                      axios
                                        .patch(
                                          `ticket/violation/${user.id}/`,
                                          formData,
                                          {
                                            headers: {
                                              Authorization: `token ${Token}`,
                                            },
                                          }
                                        )
                                        .then((response) => {
                                          handleSave(user.id);
                                          window.location.reload()
                                        })
                                        .catch((error) => {
                                          window.alert(
                                            "Unsuccessfully Edit Penalty Status"
                                          );
                                          console.log(error);
                                        });
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
                {/*PAGINATION STARTS HERE*/}
                <div className="label-page">
                  <Button
                    style={{ backgroundColor: "transparent", border: 0 }}
                    disabled={currentPageViolation === 1}
                    onClick={prevPageViolation}
                  >
                    PREVIOUS
                  </Button>
                  {Array.from({ length: totalPagesViolation }, (_, index) => {
                    if (
                      totalPagesPenalty <= 4 ||
                      index + 1 === 1 ||
                      index + 1 === totalPagesViolation ||
                      Math.abs(currentPageViolation - (index + 1)) <= 1
                    ) {
                      return (
                        <button
                          style={{
                            border: 0,
                            marginRight: 10,
                            height: 40,
                            width: 40,
                            color:
                              currentPageViolation === index + 1
                                ? "white"
                                : "black",
                            borderRadius: 10,
                            backgroundColor:
                              currentPageViolation === index + 1
                                ? "#3e7c1f"
                                : "#e0e0e0",
                            fontSize: 20,
                          }}
                          key={index}
                          onClick={() => handlePageChangeViolation(index + 1)}
                          className={
                            currentPageViolation === index + 1
                              ? "activePage"
                              : "inactivePage"
                          }
                        >
                          {index + 1}
                        </button>
                      );
                    } else if (
                      Math.abs(currentPageViolation - (index + 1)) === 2
                    ) {
                      return <span key={index}>...</span>;
                    }
                    return null;
                  })}
                  <Button
                    style={{ backgroundColor: "transparent", border: 0 }}
                    disabled={currentPageViolation === lastPageIndexViolation}
                    onClick={nextPageViolation}
                  >
                    NEXT
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

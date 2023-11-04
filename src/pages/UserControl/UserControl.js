import React from "react";
import Navbar from "../../Navbar";
import {
  Add,
  AddBoxOutlined,
  ArrowBack,
  CloseOutlined,
  DeleteOutline,
  Edit,
  Save,
  Close,
  Check,
  MicExternalOnOutlined,
  VoiceOverOff,
  AddBoxRounded,
  Search,
} from "@mui/icons-material";
import InputSearch from "../../components/InputSearch";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "./styles.css";
import { useState } from "react";
import users from "./users.json";
import UserOne from "../../components/UserOne";
import UserCredentials from "../../components/UserCredentials";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ConstButton from "../../components/ConstButton";
import InputRound from "../../components/InputRound";
import SelectRound from "../../components/SelectRound";

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

function UserControl(props) {
  const [filteredData, setFilteredData] = useState(users);
  const [searchQuery, setSearchQuery] = useState("");
  const [table, setTable] = useState(true);
  const [details, setDetails] = useState(true);
  const [addScreen, setAddScreen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter(
      (item) =>
        item.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.lastName.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toString().includes(query)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleBack = () => {
    setTable(!table);
    setProceed(!proceed);
  };
  const [editingRow, setEditingRow] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);

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

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 7;

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const currentRows = filteredData.slice(firstRowIndex, lastRowIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const offenseCountMap = {};
  filteredData.forEach((item) => {
    if (offenseCountMap[item.name]) {
      offenseCountMap[item.name]++;
    } else {
      offenseCountMap[item.name] = 1;
    }
  });

  return (
    <div className="container1">
      <Navbar />
      <div className="first-layer-control">
        {details ? (
          <div className="form-user">
            {addScreen ? (
              <div className="add-container">
                <div
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="button-next-back"
                >
                  <Button
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "red",
                    }}
                    onClick={() => setAddScreen(!addScreen) & setTable(!table)}
                  >
                    <CloseOutlined style={{}}></CloseOutlined>CANCEL
                  </Button>
                </div>
                <div className="form-container">
                  <div style={{ marginRight: 10 }}>
                    <InputRound
                      title={"First Name"}
                      width={"40vh"}
                      height={"3vh"}
                    ></InputRound>
                    <InputRound
                      title={"Last Name"}
                      width={"40vh"}
                      height={"3vh"}
                    ></InputRound>
                    <InputRound
                      title={"Middle Name"}
                      width={"40vh"}
                      height={"3vh"}
                    ></InputRound>

                    <SelectRound
                      width={"42vh"}
                      height={"5vh"}
                      title={"Role"}
                      selection={"role"}
                    ></SelectRound>
                  </div>
                  <div>
                    <SelectRound
                      width={"42vh"}
                      height={"5vh"}
                      title={"Position"}
                      selection={"position"}
                    ></SelectRound>
                    <InputRound
                      title={"Email"}
                      width={"40vh"}
                      height={"3vh"}
                      type={"email"}
                    ></InputRound>
                    <InputRound
                      title={"Username"}
                      width={"40vh"}
                      height={"3vh"}
                    ></InputRound>
                  </div>
                </div>
                <div className="next-user-container">
                  <div className="next-user-btn">
                    <ConstButton
                      onClick={() =>
                        setAddScreen(!addScreen) & setTable(!table)
                      }
                      width={10}
                      title={"NEXT"}
                    ></ConstButton>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        {table ? (
          <>
            <div className="search-container-user">
              <Search
                className="search-icon-user"
                style={{ position: "absolute", left: "2%", marginTop: 10 }}
              ></Search>
              <input
                value={searchQuery}
                onChange={(event) => handleSearch(event.target.value)}
                className="search-box-user"
              ></input>
              <Button
                onClick={() => setAddScreen(!addScreen) & setTable(!table)}
                className="add-user-btn"
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
                {window.innerWidth <= 600 ? null : "ADD USER"}
              </Button>
            </div>
            <div className="table-conatiner-user">
              <div className="tab-con-2-user">
                <TableContainer>
                  <Table className="table">
                    <TableHead>
                      <TableRow className="table-row">
                        <TableCell style={cellStylesHeader.cell}>ID</TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          First Name
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Last Name
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Middle Name
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Role
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Position
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Email
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Username
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentRows.map((user, index) => (
                        <TableRow
                          className={`table-body-row ${
                            index % 2 === 0 ? "even-row" : "odd-row"
                          }`}
                          key={index}
                        >
                          <TableCell style={cellStylesBody.cell}>
                            <a className="ticket" href="#">
                              {user.id}
                            </a>
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            {user.firstName}
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            {user.lastName}
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            {user.position}
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            {user.email}
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            {user.contact_no}
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            {user.role}
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            {user.username}
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
                                  onClick={() => handleSave(user.id)}
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
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                  }}
                                  onClick={() => handleDelete(user.id)}
                                >
                                  <VoiceOverOff style={{ height: 25 }} />
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
                          currentPage === index + 1 ? "#3e7c1f" : "#e0e0e0", // Apply green for active, yellow for inactive
                        fontSize: 20,
                      }}
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={
                        currentPage === index + 1
                          ? "activePage"
                          : "inactivePage"
                      } // Apply activePage class for active, inactivePage class for inactive
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
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserControl;

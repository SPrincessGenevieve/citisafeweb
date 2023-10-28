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

  const [addScreen, setAddScreen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleBack = () => {
    setAddScreen(!addScreen);
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
      {proceed ? (
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            marginTop: "7%",
            zIndex: 2,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              zIndex: 1,
              borderRadius: 20,
              height: "80%",
            }}
          >
            <UserCredentials
              close={() => setProceed(!proceed)}
              back={handleBack}
            ></UserCredentials>
          </div>
        </div>
      ) : null}
      {addScreen ? (
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "85%",
            position: "absolute",
            display: "flex",
            marginTop: "7%",
            zIndex: 2,
            justifyContent: "center",
            alignItems: "center",
            bottom: 0,
          }}
        >
          <div style={{ marginRight: 10 }}>
            <InputRound
              title={"First Name"}
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
              title={"Position"}
            ></SelectRound>
            <InputRound
              title={"Middle Name"}
              width={"40vh"}
              height={"3vh"}
            ></InputRound>
          </div>
          <div>
            <InputRound
              title={"Last Name"}
              width={"40vh"}
              height={"3vh"}
            ></InputRound>
            <SelectRound
              width={"42vh"}
              height={"5vh"}
              title={"Gender"}
            ></SelectRound>
            <InputRound
              title={"Email"}
              width={"40vh"}
              height={"3vh"}
              type={"email"}
            ></InputRound>
            <InputRound
              title={"Middle Name"}
              width={"40vh"}
              height={"3vh"}
            ></InputRound>
          </div>
        </div>
      ) : null}

      {isVisible ? (
        <div style={{ marginTop: "8%" }}>
          <div
            className="searchbar"
            style={{
              display: "flex",
              height: "5%",
              alignItems: "center",
            }}
          >
            <Search
              style={{
                position: "absolute",
                marginLeft: 10,
              }}
            ></Search>
            <input
              style={{
                borderRadius: 40,
                height: 40,
                width: "20%",
                marginRight: "1%",
                outline: "none",
                fontSize: 20,
                paddingLeft: 40,
                paddingRight: 20,
                border: 0,
                backgroundColor: "#E7E9EE",
              }}
              value={searchQuery}
              onChange={(event) => handleSearch(event.target.value)}
            ></input>
            <Button
              onClick={() => setAddScreen(!addScreen)}
              style={{
                backgroundColor: "#3E7C1F",
                borderRadius: 40,
                color: "white",
                paddingRight: 10,
                paddingLeft: 10,
              }}
            >
              <Add style={{}} />
              ADD USER
            </Button>
          </div>
          <div className="container2">
            <TableContainer>
              <Table style={{ borderCollapse: "collapse", width: "100%" }}>
                <TableHead>
                  <TableRow
                    style={{
                      border: "1px solid white",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <TableCell style={cellStylesHeader.cell}>ID</TableCell>
                    <TableCell style={cellStylesHeader.cell}>
                      First name
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>
                      Last name
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>Gender</TableCell>
                    <TableCell style={cellStylesHeader.cell}>
                      Position
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>Email</TableCell>
                    <TableCell style={cellStylesHeader.cell}>
                      Contact No.
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>Role</TableCell>
                    <TableCell style={cellStylesHeader.cell}>
                      Username
                    </TableCell>
                    <TableCell
                      style={{ flex: 1, color: "white", textAlign: "center" }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRows.map((user) => (
                    <TableRow
                      key={user.id}
                      style={{
                        display: "flex",
                        borderLeft: "1px solid white",
                        borderRight: "1px solid white",
                        justifyContent: "space-between",
                      }}
                    >
                      <TableCell style={cellStylesBody.cell} className="row">
                        {user.id}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell} className="row">
                        {user.firstName}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell} className="row">
                        {user.lastName}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell} className="row">
                        {user.gender}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell} className="row">
                        {user.position}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell} className="row">
                        {user.email}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell} className="row">
                        {user.contact_no}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell} className="row">
                        {user.role}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell} className="row">
                        {user.username}
                      </TableCell>
                      <TableCell className="row" style={cellStylesBody.cell}>
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
            <div
              style={{
                width: "100%",
                display: "flex",
                position: "fixed",
                justifyContent: "center",
                bottom: 20,
              }}
            >
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
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserControl;

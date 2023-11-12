import React, { useEffect } from "react";
import Navbar from "../../Navbar";
import {
  Add,
  CloseOutlined,
  Close,
  Check,
  VoiceOverOff,
  RecordVoiceOver,
  Download,
  Search,
} from "@mui/icons-material";
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
import ConstButton from "../../components/ConstButton";
import InputRound from "../../components/InputRound";
import SelectRound from "../../components/SelectRound";
import StatusSelection from "../../components/StatusSelection";
import stats from "./../../JSON/is_active.json";
import { useSelector } from "react-redux";
import axios from "../../plugins/axios";
import * as XLSX from "xlsx";

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
  const [userData, setUserData] = useState([]);
  const Token = useSelector((state) => state.auth.token);
  const [addUser, setAddUser] = useState({
    email: "",
    role: "",
    position: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    username: "",
  });

  const [table, setTable] = useState(true);
  const [details, setDetails] = useState(true);
  const [addScreen, setAddScreen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(users);

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 6;

  const lastPageIndex = Math.ceil(userData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, userData.length);
  const visibleData = [];
  for (let i = startIndex; i < endIndex; i++) {
    if (userData[i]) {
      visibleData.push(userData[i]);
    }
  }
  const totalPages = Math.ceil(userData.length / rowsPerPage);

  const filteredUserControl = Array.isArray(userData)
    ? userData.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user &&
            user.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const visibleUserData = filteredUserControl.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, lastPageIndex));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter(
      (item) =>
        item.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.lastName.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toString().includes(query)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleRoleChange = (selectedRole) => {
    setAddUser((prevAddUser) => ({
      ...prevAddUser,
      role: selectedRole,
    }));
  };

  const handlePositionChange = (selectedRole) => {
    setAddUser((prevAddUser) => ({
      ...prevAddUser,
      position: selectedRole,
    }));
  };

  // edit user active/inactive
  const [editIsActive, setEditIsActive] = useState("");

  const handleStatusChange = (newStatus) => {
    setEditIsActive(newStatus);
  };

  const handleBack = () => {
    setTable(!table);
    setProceed(!proceed);
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

  const handleSubmit = () => {
    axios
      .post("accounts/users/", addUser)
      .then((response) => {
        setAddScreen(!addScreen);
        setTable(!table);

        setUserData({
          email: "",
          role: "",
          position: "",
          first_name: "",
          last_name: "",
          middle_name: "",
          username: "",
        });
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
        console.log(addUser);
        alert("Please use another email or username");
      });
  };

  const handleDownload = () => {
    const exportData = filteredUserControl.map((item) => ({
      ID: item.id,
      LASTNAME: item.last_name,
      FIRSTNAME: item.first_name,
      MIDDLENAME: item.middle_name,
      ROLE: item.role,
      POSITION: item.position,
      EMAIL: item.email,
      USERNAME: item.username,
      STATUS: item.is_active,
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "USERS TABLE");

    const excelDataURI = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64",
    });

    const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelDataURI}`;

    const a = document.createElement("a");
    a.href = dataUri;
    a.download = "users_table.xlsx";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.alert("Downloaded successfully");
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

  const offenseCountMap = {};
  filteredData.forEach((item) => {
    if (offenseCountMap[item.name]) {
      offenseCountMap[item.name]++;
    } else {
      offenseCountMap[item.name] = 1;
    }
  });

  useEffect(() => {
    axios
      .get("accounts/users/", {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        window.alert("Error Fetching Users Data");
      });
  }, [Token]);

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
                      value={addUser.first_name}
                      onChange={(e) => {
                        setAddUser({
                          ...addUser,
                          first_name: e.target.value,
                        });
                      }}
                    ></InputRound>
                    <InputRound
                      title={"Middle Name"}
                      width={"40vh"}
                      height={"3vh"}
                      value={addUser.middle_name}
                      onChange={(e) => {
                        setAddUser({
                          ...addUser,
                          middle_name: e.target.value,
                        });
                      }}
                    ></InputRound>
                    <InputRound
                      title={"Last Name"}
                      width={"40vh"}
                      height={"3vh"}
                      value={addUser.last_name}
                      onChange={(e) => {
                        setAddUser({
                          ...addUser,
                          last_name: e.target.value,
                        });
                      }}
                    ></InputRound>
                    <SelectRound
                      width={"42vh"}
                      height={"5vh"}
                      title={"Role"}
                      selection={"role"}
                      onChange={(selectedRole) =>
                        handleRoleChange(selectedRole)
                      }
                    ></SelectRound>
                  </div>
                  <div>
                    <SelectRound
                      width={"42vh"}
                      height={"5vh"}
                      title={"Position"}
                      selection={"position"}
                      onChange={(selectedRole) =>
                        handlePositionChange(selectedRole)
                      }
                    ></SelectRound>
                    <InputRound
                      title={"Email"}
                      width={"40vh"}
                      height={"3vh"}
                      type={"email"}
                      value={addUser.email}
                      onChange={(e) => {
                        setAddUser({
                          ...addUser,
                          email: e.target.value,
                        });
                      }}
                    ></InputRound>
                    <InputRound
                      title={"Username"}
                      width={"40vh"}
                      height={"3vh"}
                      value={addUser.username}
                      onChange={(e) => {
                        setAddUser({
                          ...addUser,
                          username: e.target.value,
                        });
                      }}
                    ></InputRound>
                  </div>
                </div>
                <div className="next-user-container">
                  <div className="next-user-btn">
                    <ConstButton
                      onClick={handleSubmit}
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
              <Button
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
                onClick={handleDownload}
              >
                <Download style={{}} />
                {window.innerWidth <= 600 ? null : "DOWNLOAD"}
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
                          Middle Name
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Last Name
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
                          Status
                        </TableCell>
                        <TableCell style={cellStylesHeader.cell}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visibleUserData.map((user, index) => (
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
                            {user.first_name}
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            {user.middle_name}
                          </TableCell>
                          <TableCell
                            style={cellStylesBody.cell}
                            className="row"
                          >
                            {user.last_name}
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
                            {user.username}
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
                                    user.is_active === true
                                      ? "#E2F0D9"
                                      : user.is_active === false
                                      ? "#FFD1D1"
                                      : "#EBF9F1",
                                  color:
                                    user.is_active === true
                                      ? "#649F3F"
                                      : user.is_active === false
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
                                      width: 200,
                                      marginLeft: -10,
                                    }}
                                  >
                                    <StatusSelection
                                      label={"Select Status"}
                                      labelSelect={"Select Status"}
                                      json={stats}
                                      width={150}
                                      onStatusChange={handleStatusChange}
                                    ></StatusSelection>
                                  </div>
                                ) : user.is_active === true ? (
                                  `Active`
                                ) : (
                                  <span>
                                    {user.is_active ? "Active" : "Inactive"}
                                  </span>
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
                                      is_active: editIsActive,
                                    };

                                    axios
                                      .patch(
                                        `accounts/users/${user.id}/`,
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
                                          "Unsuccessfully Edit User Status"
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
                                {user.is_active ? (
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
            </div>
            <div className="pagination">
              <div className="label-page">
                <Button
                  style={{ backgroundColor: "transparent", border: 0 }}
                  disabled={currentPage === 1}
                  onClick={prevPage}
                >
                  PREVIOUS
                </Button>
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
                <Button
                  style={{ backgroundColor: "transparent", border: 0 }}
                  disabled={currentPage === lastPageIndex}
                  onClick={nextPage}
                >
                  NEXT
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserControl;

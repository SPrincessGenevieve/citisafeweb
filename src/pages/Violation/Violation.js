import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar";
import "./styles.css";
import {
  Edit,
  Close,
  Check,
  Search,
  Download,
  RestartAlt,
} from "@mui/icons-material";
import StatusSelection from "../../components/StatusSelection";
import StatSelect from "./../../JSON/StatSelect.json";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "../../plugins/axios";
import html2pdf from "html2pdf.js";
import SelectFilter from "./../../components/SelectFilter";
import AtoZ from "./../../components/AtoZ";
import SortDate from "../../components/SortDate";
import notif from "./.././../assets/notif.gif";
import OneSignalReact from "react-onesignal";

const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalPaper: {
    outline: "none",
    background: "white",
    borderRadius: 10,
    padding: theme.spacing(3),
  },
});

const cellStylesHeader = {
  cell: {
    color: "black",
    height: 10,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "12px",
  },
};

const cellStylesBody = {
  cell: {
    color: "black",
    height: "auto",
    textAlign: "left",
    width: 150,
    height: "auto",
    textAlign: "center",
    fontSize: "12px",
  },
};

if (window.innerWidth <= 600) {
  cellStylesHeader.cell.width = 100;
  cellStylesBody.cell.width = 100;
}

function Violation({ navigation }) {
  const Role = useSelector((state) => state.auth.role);
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });

  const [checkedStatuses, setCheckedStatuses] = useState({
    PENDING: false,
    PAID: false,
    OVERDUE: false,
    DROPPED: false,
  });
  const [sortOrder, setSortOrder] = useState("ascending");
  const [ticketData, setTicketData] = useState([]);
  const Token = useSelector((state) => state.auth.token);
  const [editTicketStatus, setEditTicketStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editingRows, setEditingRows] = useState({});
  const [deletingRows, setDeletingRows] = useState({});
  const [originalTicketData, setOriginalTicketData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const lastPageIndex = Math.ceil(ticketData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, ticketData.length);
  const visibleData = ticketData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(ticketData.length / rowsPerPage);

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, lastPageIndex));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleStatusChange = (newStatus) => {
    setEditTicketStatus(newStatus);
  };

  const handleOpenModal = (MFRTA_TCT_NO) => {
    console.log("Opening modal for ticket:", MFRTA_TCT_NO);
    console.log("Selected ticket:", selectedTicket);
    setIsModalOpen(true);
    setSelectedTicket(MFRTA_TCT_NO);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  const handleSubmit = () => {
    handleCloseModal();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (Array.isArray(originalTicketData)) {
      const filteredData = originalTicketData.filter((item) => {
        if (item) {
          const firstName = item.driver_info.first_name.toLowerCase();
          const middleInitial = item.driver_info.middle_initial.toLowerCase();
          const lastName = item.driver_info.last_name.toLowerCase();

          const nameMatches =
            firstName.includes(query.toLowerCase()) ||
            middleInitial.includes(query.toLowerCase()) ||
            lastName.includes(query.toLowerCase());

          const tctNoString = item.MFRTA_TCT_NO.toString();
          const tctNoMatches = tctNoString
            .toLowerCase()
            .includes(query.toLowerCase());

          return nameMatches || tctNoMatches;
        }
        return false;
      });

      setTicketData(filteredData);
    }
  };

  const handleDownload = (data, fileName) => {
    if (!Array.isArray(data)) {
      console.error("Data is not an array");
      return;
    }

    const htmlContent = data
      .map(
        (item, index) => `
        <!DOCTYPE html>
        <html>
          <head>
          <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
    
          td, th {
            text-align: left;
            padding: 3px;
            font-size: 10px;
          }

          th {
            text-align: left;
            padding: 3px;
            width: 280px;
          }

          tr:nth-child(even) {
            background-color: #dddddd;
          }
        </style>
          </head>
          <body>
            <h2>TICKET # ${item.MFRTA_TCT_NO}</h2>
        
            <table>
              <tr>
                <th class="title">TICKET NO</th>
                <td>${item.MFRTA_TCT_NO}</td>
              </tr>
              <tr>
                <th class="title">Name</th>
                <td>${item.driver_info.first_name}${" "}
                ${item.driver_info.middle_initial}${". "}
                ${item.driver_info.last_name}</td>
              </tr>
              <tr>
                <th class="title">Address</th>
                <td>${item.driver_info.address}</td>
              </tr>
              <tr>
                <th class="title">License No.</th>
                <td>${item.driver_info.license_number}</td>
              </tr>
              <tr>
                <th class="title">Type</th>
                <td>${item.driver_info.classification}</td>
              </tr>
              <tr>
                <th class="title">Date of Birth</th>
                <td>${item.driver_info.birthdate}</td>
              </tr>
              <tr>
                <th class="title">Nationality</th>
                <td>${item.driver_info.nationality}</td>
              </tr>
              <tr>
                <th class="title">Plate No.</th>
                <td>${item.vehicle_info.plate_number}</td>
              </tr>
              <tr>
                <th class="title">Make</th>
                <td>${item.vehicle_info.make}</td>
              </tr>
              <tr>
                <th class="title">Model</th>
                <td>${item.vehicle_info.vehicle_model}</td>
              </tr>
              <tr>
                <th class="title">Color</th>
                <td>${item.vehicle_info.color}</td>
              </tr>
              <tr>
                <th class="title">Class</th>
                <td>${item.vehicle_info.vehicle_class}</td>
              </tr>
              <tr>
                <th class="title">Body Markings</th>
                <td>${item.vehicle_info.body_markings}</td>
              </tr>
              <tr>
                <th class="title">Registered Owner</th>
                <td>${item.vehicle_info.name}</td>
              </tr>
              <tr>
                <th class="title">Registered Owner Address</th>
                <td>${item.vehicle_info.address}</td>
              </tr>
              <tr>
                <th class="title">Contact No.</th>
                <td>${item.vehicle_info.contact_number}</td>
              </tr>
              <tr>
                <th class="title">Date & Time of Violation</th>
                <td>${item.date_issued}</td>
              </tr>
              <tr>
                <th class="title">Place of Violation</th>
                <td>
                ${item.place_violation}
                </td>
              </tr>
              <tr>
                <th class="title">Apprehending Officer</th>
                <td>${item.user_ID.first_name} ${" "} ${
          item.user_ID.middle_name
        } ${" "} ${item.user_ID.last_name}</td>
              </tr>
              <tr>
                <th class="title">Ticket Status</th>
                <td>${item.ticket_status}</td>
              </tr>
              <tr>
                <th class="title">Penalty</th>
                <td>${item.penalty_amount}</td>
              </tr>
              <tr>
                <th class="title">Violation</th>
                <td>${item.violation_info.violations_info}</td>
              </tr>
            </table>
          </body>
        </html>
        
        `
      )
      .join("\n");

    const container = document.createElement("div");
    container.innerHTML = htmlContent;

    html2pdf(container, {
      margin: 10,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        avoid: "avoid",
      },
    })
      .then(() => {
        window.alert("Downloaded successfully");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  const handleEdit = (rowId) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: true,
    }));
  };

  const handleDelete = (rowId) => {
    setDeletingRows((prevDeletingRows) => ({
      ...prevDeletingRows,
      [rowId]: true,
    }));
  };

  const handleSave = (rowId) => {
    handleNotif();
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: false,
    }));
  };

  const handleCheck = (rowId) => {
    setDeletingRows((prevDeletingRows) => ({
      ...prevDeletingRows,
      [rowId]: false,
    }));
  };

  const handleNotif = () => {};

  const handleCancelEdit = (rowId) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: false,
    }));
  };

  const filterData = (statusFilters, dateFilter) => {
    let filteredData = originalTicketData;

    if (statusFilters.length > 0) {
      filteredData = filteredData.filter((item) =>
        statusFilters.includes(item.ticket_status)
      );
    }

    if (dateFilter.startDate && dateFilter.endDate) {
      const startDateStr = dateFilter.startDate.toLocaleDateString("en-US");
      const endDateStr = dateFilter.endDate.toLocaleDateString("en-US");

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date_issued).toLocaleDateString("en-US");
        return itemDate >= startDateStr && itemDate <= endDateStr;
      });
    }

    setTicketData(filteredData);
  };

  const handleStatusChangeFilter = (status) => {
    const newCheckedStatuses = {
      ...checkedStatuses,
      [status]: !checkedStatuses[status],
    };
    setCheckedStatuses(newCheckedStatuses);
    const selectedStatuses = Object.keys(newCheckedStatuses).filter(
      (s) => newCheckedStatuses[s]
    );

    filterData(selectedStatuses, selectedDate);
  };

  const filterAZ = () => {
    const newSortOrder = sortOrder === "ascending" ? "descending" : "ascending";
    setSortOrder(newSortOrder);

    const sortedData = [...ticketData].sort((a, b) => {
      return sortOrder === "ascending"
        ? a.MFRTA_TCT_NO - b.MFRTA_TCT_NO
        : b.MFRTA_TCT_NO - a.MFRTA_TCT_NO;
    });

    setTicketData(sortedData);
  };

  const filterStatus = (selectedStatuses) => {
    const statusesToFilter = Object.keys(selectedStatuses).filter(
      (status) => selectedStatuses[status]
    );

    if (statusesToFilter.length === 0) {
      setTicketData(originalTicketData);
      return;
    }

    const filteredData = originalTicketData.filter((item) =>
      statusesToFilter.includes(item.ticket_status)
    );

    setTicketData(filteredData);
  };

  const handleDateSort = (selectedDate) => {
    setSelectedDate(selectedDate);
    filterData(
      Object.keys(checkedStatuses).filter((s) => checkedStatuses[s]),
      selectedDate
    );
  };

  const handleCancelFilter = () => {
    setTicketData(originalTicketData);
  };

  const handleRestart = () => {
    const initialDateFilter = {
      startDate: null,
      endDate: null,
    };
    setSelectedDate(initialDateFilter);

    const initialCheckedStatuses = {
      PENDING: false,
      PAID: false,
      OVERDUE: false,
      DROPPED: false,
    };
    setCheckedStatuses(initialCheckedStatuses);
    filterData(initialCheckedStatuses, initialDateFilter);
  };

  useEffect(() => {
    axios
      .get("ticket/register/", {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        const sortedData = response.data.sort((a, b) => {
          return new Date(b.date_issued) - new Date(a.date_issued);
        });

        setTicketData(sortedData);
        setOriginalTicketData(sortedData);
      })
      .catch((error) => {
        window.alert("Error Fetching");
      });
  }, [Token]);

  return (
    <div className="violation-container">
      <div className="navbar-container">
        <Navbar></Navbar>
      </div>

      <div className="first-layer-violation">
        <div className="search-container-violation">
          <Search
            className="search-icon"
            style={{ position: "absolute", left: "3.5%", marginTop: 10 }}
          ></Search>
          <input
            value={searchQuery}
            onChange={(event) => handleSearch(event.target.value)}
            className="search-box"
          />
          <Button
            onClick={() => handleDownload(ticketData, "RECORDS.pdf")}
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
            <Download style={{}} />
            {window.innerWidth <= 600 ? null : "DOWNLOAD"}
          </Button>
        </div>
        <div className="container-filter">
          <div
            style={{
              marginRight: 10,
              display: "flex",
              flexDirection: "row",
              borderRadius: 10,
              border: "1px solid #c4c4c4",
            }}
          >
            <div
              style={{ marginRight: 20, display: "flex", alignItems: "center" }}
            >
              <div className="sub-filterStatus">
                <SelectFilter
                  label={"PENDING"}
                  value={"PENDING"}
                  onClick={handleStatusChangeFilter}
                  checked={checkedStatuses.PENDING}
                />
                <SelectFilter
                  label={"PAID"}
                  value={"PAID"}
                  onClick={handleStatusChangeFilter}
                  checked={checkedStatuses.PAID}
                />
              </div>
              <div className="sub-filterStatus">
                <SelectFilter
                  label={"OVERDUE"}
                  value={"OVERDUE"}
                  onClick={handleStatusChangeFilter}
                  checked={checkedStatuses.OVERDUE}
                />
                <SelectFilter
                  label={"DROPPED"}
                  value={"DROPPED"}
                  onClick={handleStatusChangeFilter}
                  checked={checkedStatuses.DROPPED}
                />
              </div>
            </div>
          </div>
          <div className="other-filter">
            <div>
              <AtoZ onClicks={[filterAZ]}></AtoZ>
            </div>
            <div>
              {/*SORTING DATE HERE*/}
              <SortDate
                onCancel={handleCancelFilter}
                onDateSelect={handleDateSort}
              />
            </div>
            <div className="restart">
              <Button style={{ color: "green" }} onClick={handleRestart}>
                <RestartAlt></RestartAlt>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={handleNotif}>NOTIFY</Button>
        </div>
        <div style={{ marginLeft: "3%" }}>
          <p>TOTAL ROWS: {ticketData.length}</p>
        </div>
        <div className="table-conatiner-violation">
          {ticketData.map((item, index) => (
            <Dialog
              key={item.MFRTA_TCT_NO}
              open={selectedTicket === item.MFRTA_TCT_NO}
              onClose={handleCloseModal}
              sx={{
                "& .MuiDialog-paper": {
                  minWidth: "60%",
                  minHeight: "40%",
                },
              }}
            >
              <DialogTitle>{item.MFRTA_TCT_NO}</DialogTitle>
              <DialogContent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <table>
                    <tr>
                      <td className="row-details">Name</td>
                      <td className="row-details-value">
                        {item.driver_info.first_name}{" "}
                        {item.driver_info.middle_initial}.{" "}
                        {item.driver_info.last_name}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Address</td>
                      <td className="row-details-value">
                        {item.driver_info.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">License No.</td>
                      <td className="row-details-value">
                        {item.driver_info.license_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Type</td>
                      <td className="row-details-value">
                        {item.driver_info.classification}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Date of Birth</td>
                      <td className="row-details-value">
                        {item.driver_info.birthdate}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Nationality</td>
                      <td className="row-details-value">
                        {item.driver_info.nationality}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Plate No.</td>
                      <td className="row-details-value">
                        {item.vehicle_info.plate_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Make</td>
                      <td className="row-details-value">
                        {item.vehicle_info.make}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Model</td>
                      <td className="row-details-value">
                        {item.vehicle_info.vehicle_model}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Color</td>
                      <td className="row-details-value">
                        {item.vehicle_info.color}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Class</td>
                      <td className="row-details-value">
                        {item.vehicle_info.vehicle_class}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Body Markings</td>
                      <td className="row-details-value">
                        {item.vehicle_info.body_markings}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Registered Owner</td>
                      <td className="row-details-value">
                        {item.vehicle_info.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Registered Owner Address</td>
                      <td className="row-details-value">
                        {item.vehicle_info.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Contact No.</td>
                      <td className="row-details-value">
                        {item.vehicle_info.contact_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Date & Time of Violation</td>
                      <td className="row-details-value">{item.date_issued}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Place of Violation</td>
                      <td className="row-details-value">
                        {item.place_violation}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Apprehending Officer</td>
                      <td className="row-details-value">
                        {item.user_ID.first_name} {item.user_ID.middle_name}{" "}
                        {item.user_ID.last_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Ticket Status</td>
                      <td className="row-details-value">
                        {item.ticket_status}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Penalty</td>
                      <td className="row-details-value">
                        {item.penalty_amount}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Violation</td>
                      <td className="row-details-value">
                        {item.violation_info.violations_info.map(
                          (violation, index) => (
                            <div key={index}>{violation}</div>
                          )
                        )}
                      </td>
                    </tr>
                  </table>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="warning">
                  CLOSE
                </Button>
              </DialogActions>
            </Dialog>
          ))}

          <div className="tab-con-2">
            <TableContainer>
              <Table className="table">
                <TableHead>
                  <TableRow className="table-row">
                    <TableCell style={cellStylesHeader.cell}>
                      Tracking #
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>Name</TableCell>
                    <TableCell
                      sstyle={{
                        ...cellStylesHeader.cell,
                        backgroundColor: "pink",
                      }}
                    >
                      <div
                        style={{
                          width: 400,
                          fontSize: 12,
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Violation
                      </div>
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>Date</TableCell>
                    <TableCell style={cellStylesHeader.cell}>Offense</TableCell>
                    <TableCell style={cellStylesHeader.cell}>
                      Apprehending Officer
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>Penalty</TableCell>
                    <TableCell style={cellStylesHeader.cell}>Status</TableCell>
                    {Role === "TREASURER" && (
                      <>
                        <TableCell style={cellStylesHeader.cell}>
                          Action
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleData.map((item, index) => (
                    <TableRow
                      className={`table-body-row ${
                        index % 2 === 0 ? "even-row" : "odd-row"
                      }`}
                      key={index}
                    >
                      <TableCell style={cellStylesBody.cell}>
                        <div className="container-ticket">
                          <a
                            className="ticket"
                            href="#"
                            onClick={(event) => {
                              event.preventDefault();
                              handleOpenModal(item.MFRTA_TCT_NO);
                            }}
                          >
                            {item.MFRTA_TCT_NO}{" "}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.driver_info.first_name}{" "}
                        {item.driver_info.middle_initial}
                        {". "}
                        {item.driver_info.last_name}{" "}
                      </TableCell>
                      <TableCell
                        style={{
                          color: "black",
                          height: "auto",
                          textAlign: "left",
                          width: 150,
                          height: "auto",
                          textAlign: "center",
                        }}
                      >
                        {item.violation_info.violations_info.map(
                          (violation, index) => (
                            <div style={{ width: 400 }} key={index}>
                              {violation}
                            </div>
                          )
                        )}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.date_issued}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.driver_info.offenses_count}
                      </TableCell>

                      <TableCell style={cellStylesBody.cell}>
                        {item.user_ID.first_name} {item.user_ID.middle_name}{" "}
                        {item.user_ID.last_name}{" "}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.penalty_amount}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        <div className="status-container">
                          <p
                            style={{
                              flex: 1,
                              fontWeight: 540,
                              backgroundColor:
                                item.ticket_status === "OVERDUE"
                                  ? "#FFC5C5"
                                  : item.ticket_status === "PAID"
                                  ? "#E2F0D9"
                                  : item.ticket_status === "PENDING"
                                  ? "#BDD7EE"
                                  : "#FFF2CC",
                              color:
                                item.ticket_status === "OVERDUE"
                                  ? "#C00000"
                                  : item.ticket_status === "PAID"
                                  ? "#70AD47"
                                  : item.ticket_status === "PENDING"
                                  ? "#0070C0"
                                  : "#7F6000",
                              width: 100,
                              height: 15,
                              padding: 10,
                              textAlign: "center",
                              borderRadius: 20,
                            }}
                          >
                            {editingRows[item.MFRTA_TCT_NO] ? (
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
                                  json={StatSelect}
                                  width={150}
                                  onStatusChange={handleStatusChange}
                                ></StatusSelection>
                              </div>
                            ) : item.ticket_status === "Overdue" ? (
                              `Overdue`
                            ) : (
                              <span>{item.ticket_status}</span>
                            )}
                          </p>
                        </div>
                      </TableCell>

                      {Role === "TREASURER" && (
                        <>
                          <TableCell
                            className="row"
                            style={cellStylesBody.cell}
                          >
                            {editingRows[item.MFRTA_TCT_NO] ? (
                              <div className="check-close">
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 0,
                                  }}
                                  onClick={handleNotif}
                                  /*{() => {
                                    const formData = {
                                      MFRTA_TCT_NO: item.MFRTA_TCT_NO,
                                      ticket_status: editTicketStatus,
                                    };
                                    console.log(formData);

                                    axios
                                      .patch(
                                        `ticket/register/${item.MFRTA_TCT_NO}/`,
                                        formData,
                                        {
                                          headers: {
                                            Authorization: `token ${Token}`,
                                          },
                                        }
                                      )
                                      .then((response) => {
                                        console.log(response.data);
                                        window.alert(
                                          "Successfully Edit Penalty Status"
                                        );
                                        handleSave(item.MFRTA_TCT_NO);
                                        window.location.reload();
                                      })
                                      .catch((error) => {
                                        window.alert(
                                          "Unsuccessfully Edit Penalty Status"
                                        );
                                        console.log(error);
                                      });
                                  }}*/
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
                                  onClick={() =>
                                    handleCancelEdit(item.MFRTA_TCT_NO)
                                  }
                                >
                                  <Close style={{ height: 25 }} />
                                </Button>
                              </div>
                            ) : deletingRows[item.MFRTA_TCT_NO] ? (
                              <>
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                  onClick={() => handleCheck(item.MFRTA_TCT_NO)}
                                >
                                  <Check style={{ height: 25 }} />
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
                                  onClick={() => handleEdit(item.MFRTA_TCT_NO)}
                                >
                                  <Edit style={{ height: 25 }} />
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </>
                      )}
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
                      currentPage === index + 1 ? "activePage" : "inactivePage"
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
      </div>
    </div>
  );
}

export default Violation;

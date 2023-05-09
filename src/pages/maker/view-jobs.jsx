import React, { useEffect, useState } from "react";
import { ViewJob } from "../../services/job-service/job-service";
import { useNavigate } from "react-router-dom";
import { QuoteCount } from "../../services/quotation-service/quotation-service";
import { NavBar } from "../../components/navbar/navbar";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Card,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import "./view-jobs.css";
import { FilterAlt } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const Order = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedJobName, setSelectedJobName] = useState("");
  const [selectedBuyerId, setSelectedBuyerId] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [quoteCount, setQuoteCount] = useState("");
  const [filterPostCode, setFilterPostCode] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  async function ViewOrder() {
    const response = await ViewJob();

    const jobList = response.map((job) => ({
      id: job.id,
      buyerId: job.buyer_id,
      name: job.firstname + "  " + job.lastname,
      phoneNumber: job.phone_number,
      email: job.email,
      postcode: job.postcode,
      street: job.street,
      state: job.state,
      type: job.type,
      description: job.description,
      budget: job.budget,
      date: job.created_at,
      image_1: job.image_1,
      image_2: job.image_2,
      image_3: job.image_3,
      image_4: job.image_4,
      image_5: job.image_5,
    }));
    setJobs(jobList);
  }

  async function filter() {
    const jobs = await ViewJob();

    if (!filterPostCode && !filterType && !filterState) {
      // if no filters selected, return original array
      return jobs;
    }

    const fj = jobs.filter(
      (job) =>
        (!filterPostCode || job.postcode === filterPostCode) &&
        (!filterType || job.type === filterType) &&
        (!filterState || job.state === filterState)
    );
    setFilteredJobs(fj);
    return fj;
  }

  useEffect(() => {
    ViewOrder();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJobId(null);
    setSelectedJobName(null);
    setSelectedJob({});
  };

  async function handleOpenModal(job) {
    setSelectedJob(job);
    setSelectedJobId(job.id);
    setSelectedJobName(job.name);
    setSelectedBuyerId(job.buyerId);
    setSelectedJobType(job.header || job.type);
    // count quotation
    const count = await QuoteCount(job.id);
    setQuoteCount(count);
    setShowModal(true);
  }
  useEffect(() => {
    //  updated  selectedJob when it changes
  }, [selectedJob]);

  const handleApply = () => {
    navigate("/maker/sendQuote", {
      state: {
        JobId: selectedJobId,
        name: selectedJobName,
        BuyerId: selectedBuyerId,
        JobType: selectedJobType,
      },
    });
    console.log(selectedJobId);
  };

  return (
    <>
      <NavBar></NavBar>

      {/* filter */}
      <form className="form-filter">
        <div className="filters">
          <div className="filter">
            <TextField
              label="Type"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
              }}
              size="small"
            />
          </div>
          <div className="filter">
            <TextField
              label="Postcode"
              value={filterPostCode}
              onChange={(e) => {
                setFilterPostCode(e.target.value);
              }}
              size="small"
            />
          </div>

          <div className="filter">
            <Select
              // style={{ minWidth: "100px", minHeight: "5px" }}
              style={{ width: 120, height: 40 }}
              labelId="state-label"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="Western Australia">Western Australia</MenuItem>
              <MenuItem value="South Australia">South Australia</MenuItem>
              <MenuItem value="Northern Australia">Northern Australia</MenuItem>
              <MenuItem value="Queensland">Queensland</MenuItem>
              <MenuItem value="New South Wales">New South Wales</MenuItem>
              <MenuItem value="Victoria">Victoria</MenuItem>
              <MenuItem value="Tasmania">Tasmania</MenuItem>
            </Select>
          </div>
        </div>
        <br />

        <Button
          variant="contained"
          startIcon={<FilterAlt />}
          onClick={() => filter()}
        >
          Filter
        </Button>
      </form>
      {/* // job card */}

      <div className="card">
        {filteredJobs.length > 0
          ? filteredJobs.map((job, index) => (
              <Card key={index} id="fil">
                {" "}
                <div className="container">
                  <div className="header">
                    <h3 className="view-Detail">{job.type.toUpperCase()}</h3>
                    <h5 className="view-Detail">
                      Date:{job.created_at.slice(0, 10)}
                    </h5>
                    <h5 className="view-Detail">
                      Time:{job.created_at.slice(11, 16)}
                    </h5>
                    <h5 className="view-Detail">Budget: ${job.budget}</h5>
                  </div>
                  <Divider></Divider>
                  <div className="description">
                    <p>{job.description}...</p>
                  </div>

                  <button
                    className="view-details"
                    onClick={() => handleOpenModal(job)}
                  >
                    View Details
                  </button>
                </div>
              </Card>
            ))
          : jobs.map((job, index) => (
              <Card key={index} id="non">
                <div className="container">
                  <div className="header">
                    <h3 className="view-Detail">{job.type.toUpperCase()}</h3>
                    <h5 className="view-Detail">
                      Date:{job.date.slice(0, 10)}
                    </h5>
                    <h5 className="view-Detail">
                      Time:{job.date.slice(11, 16)}
                    </h5>
                    <h5 className="view-Detail">Budget: ${job.budget}</h5>
                  </div>
                  <Divider></Divider>
                  <div className="description">
                    <p>{job.description}...</p>
                  </div>

                  <button
                    className="view-details"
                    onClick={() => handleOpenModal(job)}
                  >
                    View Details
                  </button>
                </div>
              </Card>
            ))}
      </div>

      {/* // full details of job */}

      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleCloseModal}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>

              <div className="head">
                <h3 className="view-select">
                  Type:{"  " + selectedJob?.type?.toUpperCase()}
                </h3>
                <h4 className="view-select">
                  Date:
                  {" " + selectedJob?.date?.slice(0, 10)}
                </h4>
                <h4 className="view-select">
                  Time: {"  " + selectedJob?.date?.slice(11, 16)}
                </h4>
                <h5 className="view-select">
                  Total Quotations:{"  " + quoteCount}
                </h5>
                <Button autoFocus color="inherit" onClick={handleApply}>
                  Apply
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <div className="view-jobs">
            <div className="view-buyer">
              <h5 className="view-buyer-info">Name: {selectedJob.name}</h5>
              <h5 className="view-buyer-info">
                Contact Number: {selectedJob.phoneNumber}
              </h5>
              <h5 className="view-buyer-info">Email: {selectedJob.email}</h5>
            </div>
            <div className="view-address">
              <h5>Post Code: {selectedJob.postcode}</h5>
              <h5>Street: {selectedJob.street}</h5>
              <h5>State: {selectedJob.state}</h5>
            </div>
            <div className="view-job">
              <h5>Budget: ${selectedJob.budget}</h5>
              <h5>Description</h5>
              <p>{selectedJob.description}</p>
              <img
                width={200}
                className="view-img"
                src={selectedJob.image_1}
                alt=""
              />
              <img
                width={200}
                className="view-img"
                src={selectedJob.image_3}
                alt=""
              />
              <img
                width={200}
                className="view-img"
                src={selectedJob.image_2}
                alt=""
              />
              <img
                width={200}
                className="view-img"
                src={selectedJob.image_4}
                alt=""
              />
              <img
                width={200}
                className="view-img"
                src={selectedJob.image_5}
                alt=""
              />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Quote } from "../../services/quotation-service/quotation-service";
import { Button, TextField, InputAdornment } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { NavBar } from "../../components/navbar/navbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SendQuote = ({}) => {
  const maker = JSON.parse(localStorage.getItem("userInfo"));
  const email = maker.email;
  const { state } = useLocation();
  const { JobId, name, BuyerId, JobType } = state; //get client id and name from view-jobs
  const [jobId] = useState(JobId);
  const [buyerId] = useState(BuyerId);
  const [jobType] = useState(JobType);
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [makerId] = useState(maker.id);

  // set boolean for snackbar
  const [correct, setCorrect] = useState(false); // success snack
  const [wrong, setWrong] = useState(false); // err snack

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      await Quote(
        jobId,
        buyerId,
        makerId,
        jobType,
        coverLetter,
        price,
        duration,
        email
      );
      setCorrect(true);
    } catch (err) {
      setWrong(true);
    }
  };

  // useEffect(() => {}, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <h2>Quotation {name}</h2>

        <div className="detail">
          <TextField
            required
            label="Price"
            style={{ marginRight: "5px", marginBottom: "10px" }}
            variant="outlined"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />{" "}
          <TextField
            required
            label="Duration"
            variant="outlined"
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          />
        </div>
        <br />
        <div className="cover-letter">
          <TextField
            required
            label="Cover Letter"
            fullWidth
            multiline
            rows={10}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </div>
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      {/* snack bar */}
      <Snackbar
        open={correct}
        autoHideDuration={3000}
        onClose={() => setCorrect(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setCorrect(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Succesfully Submitted Quotation
        </Alert>
      </Snackbar>
      <Snackbar
        open={wrong}
        autoHideDuration={3000}
        onClose={() => setWrong(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setWrong(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Something went wrong. please try again!
        </Alert>
      </Snackbar>
    </>
  );
};

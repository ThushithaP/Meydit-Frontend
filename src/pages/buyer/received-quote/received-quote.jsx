import React, { useEffect, useState } from "react";
import { QuotationDetails } from "../../../services/quotation-service/quotation-service";
import { NavBar } from "../../../components/navbar/navbar";
import { JobsById } from "../../../services/job-service/job-service";
import { confirmQuote } from "../../../services/quotation-service/quotation-service";
import { Card, Button, Divider } from "@mui/material";
import "./received-quote.css";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { MenuItem, Select, TextField } from "@mui/material";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const BuyerQuote = () => {
  const [quotationList, setQuotationList] = useState([]); //set quotations
  const [acceptJobData, setAcceptJobData] = useState({}); // set job id to get job details
  const [acceptQuote, setAcceptQuote] = useState({});

  // snackbar
  const [correct, setCorrect] = useState(false); // success snack
  const [wrong, setWrong] = useState(false); // err snack

  async function QuoteDetails() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const buyerId = user.id;
    const response = await QuotationDetails(buyerId);
    const quotations = response.QuotationDetails;
    const makers = response.UserDetails;

    //combine users and quotations as one array
    const result = makers.map((user, index) => ({
      ...user,
      ...quotations[index],
    }));
    const mergedUser = [...result];

    // map quotations
    const quoteList = mergedUser.map((quote) => ({
      maker: quote.makerId,
      buyer: quote.buyerId,
      jobId: quote.jobId,
      quoteId: quote.id,
      makerName: quote.name,
      makerEmail: quote.email,
      makerContactNumber: quote.contactNumber,
      price: quote.price,
      duration: quote.duration,
      coverLetter: quote.coverLetter,
      received: quote.created_at,
      type: quote.jobType,
    }));
    setQuotationList(quoteList);
  }

  useEffect(() => {
    QuoteDetails();
  }, []);

  async function handleAccept(quotes) {
    setAcceptQuote(quotes);
    const jobId = quotes.jobId;

    const response = await JobsById(jobId);
    setAcceptJobData(response);
  }
  async function sendConfirmation() {
    try {
      const AllData = { ...acceptQuote, ...acceptJobData[0] };
      const confirm = {
        buyerId: AllData.buyerId,
        makerId: AllData.maker,
        jobId: AllData.jobId,
        quoteId: AllData.quoteId,
        buyerName: AllData.firstname + " " + AllData.lastname,
        buyerEmail: AllData.email,
        buyerAddress:
          AllData.postcode + " " + AllData.street + " " + AllData.state,
        buyercontactNumber: AllData.phone_number,
        jobType: AllData.type,
        jobBudget: AllData.budget,
        jobDescription: AllData.description,
        makerName: AllData.makerName,
        makerEmail: AllData.makerEmail,
        makerContactNumber: AllData.makerContactNumber,
        makerPrice: AllData.price,
        makerDuration: AllData.duration,
      };

      await confirmQuote(confirm);
      setCorrect(true);
    } catch (err) {
      setWrong(true);
    }
  }

  return (
    <>
      <NavBar></NavBar>
      {quotationList.map((quotes, index) => (
        <Card className="quote-card" key={index}>
          <div className="quoteCard">
            <div className="title">
              <h3>Quotation from {quotes.makerName}</h3>
            </div>
            <Divider />
            <div className="est">
              <h5>Price :$ {quotes.price} </h5>
              <h5>Duration : {quotes.duration}</h5>
              <h5>Date : {quotes.received.slice(0, 10)}</h5>
            </div>
            <div className="cover">
              <h5>Cover Letter : </h5>
              <p>{quotes.coverLetter}</p>
            </div>
            <Button
              variant="contained"
              style={{ marginRight: "8px" }}
              startIcon={<CheckCircleOutlineIcon />}
              onClick={() => handleAccept(quotes)}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<EmailIcon />}
              onClick={sendConfirmation}
            >
              Send Confirmation
            </Button>
          </div>
        </Card>
      ))}
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
          Succesfully Send Confirmation
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
          Something went wrong. Please try again!
        </Alert>
      </Snackbar>
    </>
  );
};

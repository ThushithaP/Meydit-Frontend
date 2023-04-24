import React, { useEffect, useState } from "react";
import { QuotationById } from "../../../services/quotation-service/quotation-service";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { NavBar } from "../../../components/navbar/navbar";
import "./submitted-quote.css";

export const Submitted = () => {
  const [quotationDetails, setQuotationDetails] = useState([]);
  async function QuoteByMakerId() {
    const maker = JSON.parse(localStorage.getItem("userInfo"));
    const makerId = maker.id;

    const response = await QuotationById(makerId);
    console.log(response);
    const quotationList = response.map((quotations) => ({
      jobType: quotations.jobType,
      coverLetter: quotations.coverLetter,
      price: quotations.price,
      created_at: quotations.created_at,
    }));
    setQuotationDetails(quotationList);
  }

  useEffect(() => {
    QuoteByMakerId();
  }, []);
  return (
    <>
      <NavBar></NavBar>
      {quotationDetails.map((quote, index) => (
        <Card className="sub-card" key={index}>
          <CardContent className="sub-content">
            <Typography variant="h5" style={{ fontFamily: "monospace" }}>
              {quote.jobType.toUpperCase()}
            </Typography>
            <Divider />
            <div className="sub-detail">
              <Typography className="sub-quot" variant="body1">
                <span> Price:</span> {quote.price}
              </Typography>
              <Typography className="sub-quot" variant="body1">
                <span>Date:</span> {quote?.created_at?.slice(0, 10)}
              </Typography>
              <Typography className="sub-quot" variant="body1">
                <span>Time:</span> {quote?.created_at?.slice(11, 16)}
              </Typography>
            </div>

            <Typography className="sub-quot" variant="body1">
              <span>Cover Letter:</span> {quote.coverLetter}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { AcceptQuotesByMakerId } from "../../../services/quotation-service/quotation-service";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { NavBar } from "../../../components/navbar/navbar";
import "./accept.css";

export const AcceptQuotations = () => {
  const [acceptQuoteData, setAcceptQuoteDta] = useState([]);
  async function AcceptQuotationDetails() {
    const maker = JSON.parse(localStorage.getItem("userInfo"));
    const makerId = maker.id;
    const response = await AcceptQuotesByMakerId(makerId);

    const quoteData = response.map((quotations) => ({
      buyerName: quotations.buyerName,
      buyerEmail: quotations.buyerEmail,
      buyerContactNumber: quotations.buyerContactNumber,
      buyerAddress: quotations.buyerAddress,
      jobType: quotations.jobType,
      makerPrice: quotations.makerPrice,
      date: quotations.createdAt.slice(0, 10),
      time: quotations.createdAt.slice(11, 16),
    }));

    setAcceptQuoteDta(quoteData);
  }

  useEffect(() => {
    AcceptQuotationDetails();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      {acceptQuoteData.map((accept, index) => (
        <Card key={index} className="accept-card">
          <CardContent className="container-acc">
            <Typography variant="h5" component="h2">
              {accept.jobType.toUpperCase()}
            </Typography>{" "}
            <br />
            <Divider />
            <div className="accept-body">
              <Typography variant="body1" component="p">
                <strong>Buyer Address:</strong> {accept.buyerAddress}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Buyer Name:</strong> {accept.buyerName}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Buyer Email: </strong>
                {accept.buyerEmail}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Buyer Contact Number:</strong>{" "}
                {accept.buyerContactNumber}
              </Typography>
              <Typography variant="body1" component="p">
                <strong> Maker Price:</strong> ${accept.makerPrice}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Date:</strong> {accept.date}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Time:</strong> {accept.time}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

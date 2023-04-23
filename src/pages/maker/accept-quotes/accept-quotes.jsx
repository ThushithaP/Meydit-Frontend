import React, { useEffect, useState } from "react";
import { AcceptQuotesByMakerId } from "../../../services/quotation-service/quotation-service";

export const AcceptQuotations = () => {
  const [acceptQuoteData, setAcceptQuoteDta] = useState([]);
  async function AcceptQuotationDetails() {
    const maker = JSON.parse(localStorage.getItem("userInfo"));
    const makerId = maker.id;
    const response = await AcceptQuotesByMakerId(makerId);
    // console.log(response);
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
    console.log(quoteData);
    setAcceptQuoteDta(quoteData);
  }

  useEffect(() => {
    AcceptQuotationDetails();
  }, []);

  return (
    <>
      {acceptQuoteData.map((accept, index) => (
        <div className="container" key={index}>
          <h4>{accept.buyerAddress}</h4>
        </div>
      ))}
    </>
  );
};

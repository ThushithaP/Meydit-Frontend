import React, { useEffect, useState } from "react";
import { QuotationById } from "../../../services/quotation-service/quotation-service";

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
      {quotationDetails.map((quote, index) => (
        <div className="details" key={index}>
          <h4>{quote.jobType}</h4>
        </div>
      ))}
    </>
  );
};

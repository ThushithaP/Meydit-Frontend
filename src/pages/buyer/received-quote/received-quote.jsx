import React, { useEffect, useState } from "react";
import { QuotationDetails } from "../../../services/quotation-service/quotation-service";
import { NavBar } from "../../../components/navbar/navbar";
import { JobsById } from "../../../services/job-service/job-service";
import { confirmQuote } from "../../../services/quotation-service/quotation-service";

export const BuyerQuote = () => {
  const [quotationList, setQuotationList] = useState([]); //set quotations
  const [acceptJobData, setAcceptJobData] = useState({}); // set job id to get job details
  const [acceptQuote, setAcceptQuote] = useState({});

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

    const response = await confirmQuote(confirm);
  }

  return (
    <>
      <NavBar></NavBar>
      {quotationList.map((quotes, index) => (
        <div className="quoteCard" key={index}>
          <div className="title">
            <h3>Quotation Of {quotes.makerName}</h3>
          </div>
          <div className="est">
            <span>$ {quotes.price}</span>
            <span> {quotes.duration}</span>
            <span> {quotes.received.slice(0, 10)}</span>
          </div>
          <div className="cover">{quotes.coverLetter}</div>
          <button onClick={() => handleAccept(quotes)}>Accept</button>
          <button onClick={sendConfirmation}>Send Confirmation</button>
        </div>
      ))}
    </>
  );
};

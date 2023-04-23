import axios from "axios";

const BaseUrl = "http://localhost:3333";

// send qutation
export async function Quote(
  jobId,
  buyerId,
  makerId,
  jobType,
  coverLetter,
  price,
  duration,

  email
) {
  try {
    const qutationDetails = {
      jobId: jobId,
      buyerId: buyerId,
      makerId: makerId,
      jobType: jobType,
      coverLetter: coverLetter,
      price: price,
      duration: duration,
      email: email,
    };

    const response = await axios
      .post(BaseUrl + "/sendQuote", qutationDetails)
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    console.log(err);
  }
}

// count quotation
export async function QuoteCount(jobId) {
  console.log(jobId);
  try {
    const response = await axios
      .get(BaseUrl + `/countQuote/${jobId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

// fetch received quotation

export async function QuotationDetails(buyerId) {
  console.log(buyerId);
  try {
    const response = await axios
      .get(BaseUrl + `/quoteAll/${buyerId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}
// quotations details by id
export async function QuotationById(makerId) {
  try {
    const response = await axios
      .get(BaseUrl + `/quoteById/${makerId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

// Accept quotation
export async function confirmQuote(confirm) {
  const accept = {
    buyerId: confirm.buyerId,
    makerId: confirm.makerId,
    jobId: confirm.jobId,
    quoteId: confirm.quoteId,
    buyerName: confirm.buyerName,
    buyerEmail: confirm.buyerEmail,
    buyerAddress: confirm.buyerAddress,
    buyerContactNumber: confirm.buyercontactNumber,
    jobType: confirm.jobType,
    jobBudget: confirm.jobBudget,
    jobDescription: confirm.jobDescription,
    makerName: confirm.makerName,
    makerEmail: confirm.makerEmail,
    makerContactNumber: confirm.makerContactNumber,
    makerPrice: confirm.makerPrice,
    makerDuration: confirm.makerDuration,
  };
  console.log(accept);
  try {
    const response = await axios
      .post(BaseUrl + "/acceptQuote", accept)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

// fetch accept quotes detals by makerid
export async function AcceptQuotesByMakerId(makerId) {
  try {
    const response = await axios
      .get(BaseUrl + `/acceptQuote/${makerId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

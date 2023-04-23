import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Quote } from "../../services/quotation-service/quotation-service";

export const SendQuote = ({}) => {
  const maker = JSON.parse(localStorage.getItem("userInfo"));
  const email = maker.email;
  const { state } = useLocation();
  const { JobId, name, BuyerId, JobType } = state; //get client id and name from view-jobs
  const [jobId, setJobId] = useState(JobId);
  const [buyerId, setBuyerId] = useState(BuyerId);
  const [jobType, setJobType] = useState(JobType);
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [makerId, setMakerId] = useState(maker.id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await Quote(
      jobId,
      buyerId,
      makerId,
      jobType,
      coverLetter,
      price,
      duration,
      email
    );
  };

  return (
    <>
      <div className="container">
        <h2>Quotation {name}</h2>
        <div className="detail">
          <div className="price">
            <input
              type="text"
              placeholder="price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div className="duration">
            <input
              type="text"
              placeholder="Duration"
              value={duration}
              onChange={(event) => {
                setDuration(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="cover-letter">
          <textarea
            value={coverLetter}
            onChange={(event) => {
              setCoverLetter(event.target.value);
            }}
            cols="70"
            rows="20"
          ></textarea>
        </div>
        <button className="sub" onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div>
    </>
  );
};

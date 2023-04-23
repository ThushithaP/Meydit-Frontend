import axios from "axios";

const BaseUrl = "http://localhost:3333";

export async function jobPosting(
  buyerId,
  firstname,
  lastname,
  phone_number,
  email,
  postcode,
  street,
  state,
  type,
  description,
  budget,
  images
) {
  try {
    const job = {
      buyerId: buyerId,
      firstname: firstname,
      lastname: lastname,
      phone_number: phone_number,
      email: email,
      postcode: postcode,
      street: street,
      state: state,
      type: type,
      description: description,
      budget: budget,
      images: images,
    };

    const formData = new FormData();
    formData.append("buyerId", job.buyerId);
    formData.append("firstname", job.firstname);
    formData.append("lastname", job.lastname);
    formData.append("phone_number", job.phone_number);
    formData.append("email", job.email);
    formData.append("postcode", job.postcode);
    formData.append("street", job.street);
    formData.append("state", job.state);
    formData.append("type", job.type);
    formData.append("description", job.description);
    formData.append("budget", job.budget);
    images.forEach((image) => {
      if (image) {
        formData.append("images", image);
      }
    });

    const response = await axios
      .post(BaseUrl + "/createJobs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
  }
}

// view jobs
export async function ViewJob() {
  try {
    const response = await axios.get(BaseUrl + "/jobDetail").then((res) => {
      return res.data;
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

// job details by id
export async function JobById(buyerId) {
  try {
    const response = await axios
      .get(BaseUrl + `/jobsById/${buyerId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

// jobs details by jobid
export async function JobsById(jobId) {
  try {
    const response = await axios
      .get(BaseUrl + `/jobsByJobId/${jobId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

//update jobs
export async function JobUpdate(id) {
  try {
    const response = await axios.put(BaseUrl + `/updateJob/${id}`);
  } catch (err) {}
}

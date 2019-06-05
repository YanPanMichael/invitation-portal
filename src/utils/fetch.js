import axios from "axios";

const sendRequest = (values) => {
  const reqUrl = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';
  return axios({
    method: 'post',
    url: reqUrl,
    data: {
      name: values.name,
      email: values.email
    }
  }).then(res => res);
}

export default sendRequest;

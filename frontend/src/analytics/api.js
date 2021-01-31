const apiUrlDev = '127.0.0.1:8000';
const apiUrlProd = 'gc-wrapped-api-dev.us-west-1.elasticbeanstalk.com'; // don't know yet

const apiUrl = apiUrlProd;

export async function getResult(id) {
  return fetch("http://" + apiUrl + "/results/" + id);
}

export async function saveResult(result) {
  return fetch("http://" + apiUrl + "/results", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result)
  });
}

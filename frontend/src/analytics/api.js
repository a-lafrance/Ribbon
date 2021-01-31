const apiUrlDev = '127.0.0.1:8000';
const apiUrlProd = '???'; // don't know yet

export async function getResult(id) {
  return fetch("http://" + apiUrlDev + "/results/" + id);
}

export async function saveResult(result) {
  return fetch("http://" + apiUrlDev + "/results", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result)
  });
}

const apiUrlDev = '127.0.0.1:8000';
const apiUrlProd = '???'; // don't know yet

export async function getResult(id) {
  // GET: http://{apiUrlDev}/results/{id}
  // ^ that api call returns json, this function should return that json exactly
  return fetch("http://" + apiUrlDev + "/results/" + id);
}

export async function saveResult(result) {
  // POST: http://{apiUrlDev}/results
  // ^ pass the result param as json to the api endpoint

  // TODO: change dates to ISO format
  result.longestStreak = result.longestStreak.map(date => (new Date(date)).toISOString().slice(0, 10));
  
  return fetch("http://" + apiUrlDev + "/results", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result)
  });
}

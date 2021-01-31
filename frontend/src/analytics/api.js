const apiUrlDev = '127.0.0.1:8000';
const apiUrlProd = '???'; // don't know yet

function getResult(id) {
  // GET: http://{apiUrlDev}/results/{id}
  // ^ that api call returns json, this function should return that json exactly
  return fetch("http://" + {apiUrlDev} + "/results/" + {id});
}

function saveResult(result) {
  // POST: http://{apiUrlDev}/results
  // ^ pass the result param as json to the api endpoint
  return fetch("http://" + {apiUrlDev} + "/results/", {
      method: 'POST',
  }) ;
}

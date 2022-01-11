const axios = require("axios");
const ObjectsToCsv = require("objects-to-csv");
const { GRAFANA_HOST = 'http://localhost:3000' } = process.env;
const url = `${GRAFANA_HOST}/api/annotations?limit=500000`
const { TOKEN } = process.env;

let axiosConfig = {
  headers: {
    Authorization: "Basic " + token, //the token is a variable which holds the token
  },
};
const sendGetRequest = async (url) => {
  try {
    const res = await axios.get(url, axiosConfig);
    const annotations = res.data;

    let arr = [];
    for (ann of annotations) {
      let obj = {};
      obj.text = `${ann.text}`;
      obj.created = ann.created;
      obj.updated = ann.updated;
      obj.time = ann.time;
      obj.timeEnd = ann.timeEnd;
      obj.ISOcreated = new Date(obj.created).toISOString();
      obj.ISOupdated = new Date(obj.updated).toISOString();
      obj.ISOtime = new Date(obj.time).toISOString();
      obj.ISOtimeEnd = new Date(obj.timeEnd).toISOString();
      obj.tags = ann.tags;
      arr.push(obj);
    }
  
    const csv = new ObjectsToCsv(arr);
    await csv.toDisk("./list.csv");
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

sendGetRequest(url);

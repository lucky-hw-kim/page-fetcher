const fs = require('fs');
const request = require('request');
const URL = process.argv[2];
const localPath = process.argv[3];

request(`${URL}`, (error, response, body) => {

  // if (data.length !== 0) {
    const content = body
    fs.writeFile(`${localPath}`, content, err => {
      if (err) {
        console.error(err)
        return
      }
      const stats = fs.statSync(`${localPath}`)
      const dataSize = stats.size
    console.log(`Download and saved ${dataSize} bytes to ${localPath}`);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    })
  });

//     // console.log(typeof data);
//   // }
//   // else if (data.length === 0) {
//   //   console.log(error, `Error can't locate the URL`);
//   // }
// });


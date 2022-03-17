const fs = require('fs');
const request = require('request');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const URL = process.argv[2];
const localPath = process.argv[3];

request(`${URL}`, (error, response, body) => {
    if(error){
      console.log(`Invalid URL: ${URL}!!!`);
      rl.close();
      return
    } else{
      if(fs.existsSync(localPath)){
        rl.question(`Do you want to override existing file [${localPath}]? (y/n) \r\n`, function(ans) {
          if(ans === 'y') {
            const content = body
            fs.writeFile(`${localPath}`, content, err => {
              if (err) {
                console.log('You entered a wrong local path!!!');
                rl.close();
                return
              } else {
                const stats = fs.statSync(`${localPath}`)
                const dataSize = stats.size
                console.log(`Download and saved ${dataSize} bytes to ${localPath}`);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', JSON.parse(body));
                rl.close();
              }
            });
          } else {
            console.log('You decided not to fetch the file!');
            rl.close();
          }
        })
      } else {
        const content = body
        fs.writeFile(`${localPath}`, content, err => {
        if (err) {
          console.log('You entered a wrong local path!!!');
          rl.close();
          return
        } else {
          const stats = fs.statSync(`${localPath}`)
          const dataSize = stats.size
          console.log(`Download and saved ${dataSize} bytes to ${localPath}`);
          console.log('statusCode:', response && response.statusCode);
          console.log('body:', JSON.parse(body));
          rl.close();
        }
      })
      }
    }
  })



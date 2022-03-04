import fs from 'fs-extra';
import axios from 'axios';

const imageBuffer = fs.readFileSync('package.json'); // Set filename here..

const result = await axios.request({
    method: "post",
    url: "http://localhost:3000/dataupload2.ashx",
    data: imageBuffer,
    headers: {
        'Content-Type': 'application/octet-stream'
    }
});

console.log(result.status);
import { } from 'dotenv/config';
import fs from 'fs-extra';
import express from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';

const app = express();

const uploadPath = './uploads';

var storage = multer.diskStorage(
    {
        destination: uploadPath,
        filename: function (req, file, cb) {
            cb(null, generateFileName());
        }
    }
);


const upload = multer({ storage });

const timestamp = () => new Date().toISOString().replace(/[^\d-TZ]/g, '-');
const generateFileName = () => `${timestamp()}-${nanoid(8)}`;

app.post('/dataupload2.ashx', express.raw({ limit: '5mb' }), upload.any(), async (req, res) => {
    let files = req.files;
    if (req.body && req.is("application/octet-stream")) {
        const fileName = generateFileName();
        const filePath = `${uploadPath}/${fileName}`;
        await fs.writeFile(filePath, req.body);
        files = [
            { path: filePath }
        ];
    }

    if (!files || !files.length) {
        return res.status(400).send('No files');
    }
    res.send(`uploaded ${files.length} files and generated JPEGs`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
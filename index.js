const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Function to create a folder named 'files' if it doesn't exist
const createFilesFolder = () => {
    const folderPath = path.join(__dirname, 'files');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log('Folder "files" created.');
    } else {
        console.log('Folder "files" already exists.');
    }
};

// Function to write the current timestamp to a file named with the current timestamp
const writeTimestampToFile = () => {
    const folderPath = path.join(__dirname, 'files');
    const currentTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${currentTimestamp}.txt`;
    const filePath = path.join(folderPath, fileName);

    fs.writeFileSync(filePath, currentTimestamp);
    console.log(`Timestamp written to file: ${fileName}`);
    return fileName;
};

// Call the functions to create the folder and write the timestamp when the server starts
createFilesFolder();
const timestampFileName = writeTimestampToFile();

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'files', timestampFileName);
    if (fs.existsSync(filePath)) {
        const timestamp = fs.readFileSync(filePath, 'utf8');
        res.send(`Current timestamp: ${timestamp}`);
    } else {
        res.send('Timestamp file not found.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});








const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// POST /compile to handle Python code execution
app.post('/compile', (req, res) => {
    const { code, language } = req.body;

    if (language === 'python') {
        // Handle Python code
        const fileName = 'TempCode.py'; // temporary file for the Python code
        const filePath = path.join(fileName);

        // Write Python code to a file
        fs.writeFile(filePath, code, (err) => {
            if (err) return res.status(500).send('Error writing Python file: ' + err.message);

            // Execute the Python code using exec
            exec(`python3 ${filePath}`, (runErr, runStdout, runStderr) => {
                if (runErr) {
                    return res.status(500).send(`Python Execution Error: ${runStderr}`);
                }
                res.send(runStdout);

                // Clean up the Python file after execution
                try {
                    fs.unlinkSync(filePath);
                } catch (unlinkErr) {
                    console.error('Error cleaning up Python file:', unlinkErr.message);
                }
            });
        });
    } else {
        res.status(400).send('Unsupported language. Please use "python".');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

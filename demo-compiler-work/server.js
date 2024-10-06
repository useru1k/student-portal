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
app.use(express.static('public'));

//compiling and executing code
app.post('/compile', (req, res) => {
    const { code, language } = req.body;
    console.log('Received code:', code);
    console.log('Received language:', language); 

    if (language === 'python3') {
        const fileName = 'TempCode.py';
        const filePath = path.join(__dirname, 'code_storage', fileName);

        fs.writeFile(filePath, code, (err) => {
            if (err) return res.status(500).send('Error writing Python file: ' + err.message);

            exec(`python3 ${filePath}`, (runErr, runStdout, runStderr) => {
                if (runErr) {
                    return res.status(400).send(`Python Execution Error: ${runStderr}`);
                }
                res.send(runStdout);

                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) console.error('Error cleaning up file:', unlinkErr);
                });
            });
        });
    } else if (language === 'java') {
        const fileName = 'Main.java';
        const filePath = path.join(__dirname, 'code_storage', fileName);

        fs.writeFile(filePath, code, (err) => {
            if (err) return res.status(500).send('Error writing Java file: ' + err.message);

            exec(`javac ${filePath}`, (compileErr, compileStdout, compileStderr) => {
                if (compileErr) {
                    return res.status(400).send(`Java Compilation Error: ${compileStderr}`);
                }

                const className = path.basename(fileName, '.java');
                exec(`java -cp ${path.dirname(filePath)} ${className}`, (runErr, runStdout, runStderr) => {
                    if (runErr) {
                        return res.status(400).send(`Java Execution Error: ${runStderr}`);
                    }
                    res.send(runStdout);

                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) console.error('Error cleaning up .java file:', unlinkErr);
                    });

                    const classFilePath = path.join(__dirname, 'code_storage', `${className}.class`);
                    fs.unlink(classFilePath, (unlinkErr) => {
                        if (unlinkErr) console.error('Error cleaning up .class file:', unlinkErr);
                    });
                });
            });
        });
    } else if (language === 'c') {
        const fileName = 'TempCode.c';
        const filePath = path.join(__dirname, 'code_storage', fileName);
        const outputFilePath = path.join(__dirname, 'code_storage', 'a.out');

        fs.writeFile(filePath, code, (err) => {
            if (err) return res.status(500).send('Error writing C file: ' + err.message);

            // Compile C code
            exec(`gcc ${filePath} -o ${outputFilePath}`, (compileErr, compileStdout, compileStderr) => {
                if (compileErr) {
                    return res.status(400).send(`C Compilation Error: ${compileStderr}`);
                }

                // Run compiled C program
                exec(outputFilePath, (runErr, runStdout, runStderr) => {
                    if (runErr) {
                        return res.status(400).send(`C Execution Error: ${runStderr}`);
                    }
                    res.send(runStdout);

                    // Cleanup
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) console.error('Error cleaning up C file:', unlinkErr);
                    });
                    fs.unlink(outputFilePath, (unlinkErr) => {
                        if (unlinkErr) console.error('Error cleaning up compiled binary:', unlinkErr);
                    });
                });
            });
        });
    } else if (language === 'cpp') {
        const fileName = 'TempCode.cpp';
        const filePath = path.join(__dirname, 'code_storage', fileName);
        const outputFilePath = path.join(__dirname, 'code_storage', 'a.out');

        fs.writeFile(filePath, code, (err) => {
            if (err) return res.status(500).send('Error writing C++ file: ' + err.message);

            // Compile C++ code
            exec(`g++ ${filePath} -o ${outputFilePath}`, (compileErr, compileStdout, compileStderr) => {
                if (compileErr) {
                    return res.status(400).send(`C++ Compilation Error: ${compileStderr}`);
                }

                // Run compiled C++ program
                exec(outputFilePath, (runErr, runStdout, runStderr) => {
                    if (runErr) {
                        return res.status(400).send(`C++ Execution Error: ${runStderr}`);
                    }
                    res.send(runStdout);

                    // Cleanup
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) console.error('Error cleaning up C++ file:', unlinkErr);
                    });
                    fs.unlink(outputFilePath, (unlinkErr) => {
                        if (unlinkErr) console.error('Error cleaning up compiled binary:', unlinkErr);
                    });
                });
            });
        });
    } else {
        res.status(400).send('Unsupported language');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

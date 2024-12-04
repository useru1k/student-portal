const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const os = require("os");
const sendEmail = require("./sendEmail");

const app = express();
const PORT = 3000;
const MONITOR_PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const checkMemoryUsage = async () => {
  try {
    const response = await axios.get(
      `http://localhost:${MONITOR_PORT}/monitor`
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error checking memory usage:", error);
  }
};

app.post("/compile", (req, res) => {
  const { code, language, input } = req.body;
  console.log("Received code:", code);
  console.log("Received language:", language);
  if (!Array.isArray(input)) {
    return res.status(400).send("Input should be an array.");
  }
  
  const formattedInput = input.join(" "); // newline-separated inputs
  //const formattedInput = JSON.stringify(input.join("\n"));
  // const fileName = "TempCode.py";
  // const filePath = path.join(__dirname, "code_storage", fileName);
  const pythonInput = input.join("\n"); // Newline-separated inputs
  const escapedInput = pythonInput.replace(/(["`$\\])/g, '\\$1');
  if (language === "python") {
    const fileName = "TempCode.py";
    const filePath = path.join(__dirname, "code_storage", fileName);

    // Join input array into newline-separated string
    const formattedInput = input.join("\n");

    fs.writeFile(filePath, code, (err) => {
        if (err)
            return res
                .status(500)
                .send("Error writing Python file: " + err.message);

        // Pass the formatted input as stdin to the Python program
        const pythonProcess = exec(`python3 ${filePath}`, (runErr, runStdout, runStderr) => {
            if (runErr) {
                return res.status(400).send(`Python Execution Error: ${runStderr}`);
            }
            res.send(runStdout);

            // Cleanup temporary file
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) console.error("Error cleaning up file:", unlinkErr);
            });
        });

        // Write the formatted input to the Python process's stdin
        pythonProcess.stdin.write(formattedInput);
        pythonProcess.stdin.end();
    });
}
else if (language === "java") {
  const fileName = "TempCode.java";
  const filePath = path.join(__dirname, "code_storage", fileName);

  fs.writeFile(filePath, code, (err) => {
    if (err)
      return res.status(500).send("Error writing Java file: " + err.message);

    const classNameMatch = code.match(/public\s+class\s+(\w+)/);
    if (!classNameMatch) {
      return res
        .status(400)
        .send("Java Compilation Error: No public class found in the code.");
    }
    const className = classNameMatch[1];
    const newFilePath = path.join(
      __dirname,
      "code_storage",
      `${className}.java`
    );

    fs.rename(filePath, newFilePath, (renameErr) => {
      if (renameErr)
        return res
          .status(500)
          .send("Error renaming Java file: " + renameErr.message);

      exec(
        `javac ${newFilePath}`,
        (compileErr, compileStdout, compileStderr) => {
          if (compileErr) {
            return res
              .status(400)
              .send(`Java Compilation Error: ${compileStderr}`);
          }

          exec(
            `echo ${formattedInput} | java -cp ${path.join(
              __dirname,
              "code_storage"
            )} ${className}`,
            (runErr, runStdout, runStderr) => {
              if (runErr) {
                return res
                  .status(400)
                  .send(`Java Execution Error: ${runStderr}`);
              }
              res.send(runStdout);

              fs.unlink(newFilePath, (unlinkErr) => {
                if (unlinkErr)
                  console.error("Error cleaning up Java file:", unlinkErr);
              });

              fs.unlink(
                path.join(__dirname, "code_storage", `${className}.class`),
                (unlinkErr) => {
                  if (unlinkErr)
                    console.error(
                      "Error cleaning up Java class file:",
                      unlinkErr
                    );
                }
              );
            }
          );
        }
      );
    });
  });
} else if (language === "c") {
    const fileName = "TempCode.c";
    const filePath = path.join(__dirname, "code_storage", fileName);
    const outputFilePath = path.join(__dirname, "code_storage", "a.out");

    fs.writeFile(filePath, code, (err) => {
      if (err)
        return res.status(500).send("Error writing C file: " + err.message);

      // Compile C code
      exec(
        `gcc ${filePath} -o ${outputFilePath}`,
        (compileErr, compileStdout, compileStderr) => {
          if (compileErr) {
            return res
              .status(400)
              .send(`C Compilation Error: ${compileStderr}`);
          }

          // Run compiled C program with static input
          exec(
            `echo ${formattedInput} | ${outputFilePath}`,
            (runErr, runStdout, runStderr) => {
              if (runErr) {
                return res.status(400).send(`C Execution Error: ${runStderr}`);
              }
              res.send(runStdout);

              // Cleanup
              fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr)
                  console.error("Error cleaning up C file:", unlinkErr);
              });
              fs.unlink(outputFilePath, (unlinkErr) => {
                if (unlinkErr)
                  console.error(
                    "Error cleaning up compiled binary:",
                    unlinkErr
                  );
              });
            }
          );
        }
      );
    });
  } else if (language === "cpp") {
    const fileName = "TempCode.cpp";
    const filePath = path.join(__dirname, "code_storage", fileName);
    const outputFilePath = path.join(__dirname, "code_storage", "a.out");

    fs.writeFile(filePath, code, (err) => {
      if (err)
        return res.status(500).send("Error writing C++ file: " + err.message);

      // Compile C++ code
      exec(
        `g++ ${filePath} -o ${outputFilePath}`,
        (compileErr, compileStdout, compileStderr) => {
          if (compileErr) {
            return res
              .status(400)
              .send(`C++ Compilation Error: ${compileStderr}`);
          }

          // Run compiled C++ program with static input
          exec(
            `echo ${formattedInput} | ${outputFilePath}`,
            (runErr, runStdout, runStderr) => {
              if (runErr) {
                return res
                  .status(400)
                  .send(`C++ Execution Error: ${runStderr}`);
              }
              res.send(runStdout);

              // Cleanup
              fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr)
                  console.error("Error cleaning up C++ file:", unlinkErr);
              });
              fs.unlink(outputFilePath, (unlinkErr) => {
                if (unlinkErr)
                  console.error(
                    "Error cleaning up compiled binary:",
                    unlinkErr
                  );
              });
            }
          );
        }
      );
    });
  } else {
    res.status(400).send("Unsupported language");
  }
});

const monitorApp = express();

monitorApp.use(express.json());
monitorApp.get("/monitor", (req, res) => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  const memoryThresholdPercentage = 80;
  const cpuUsageThresholdPercentage = 80;
  const totalMemory = os.totalmem();
  const memoryThreshold = (memoryThresholdPercentage / 100) * totalMemory;
  console.log(`Current Memory Usage: ${memoryUsage.heapUsed} bytes`);

  let memoryAlert = false;
  let cpuAlert = false;
  if (memoryUsage.heapUsed > memoryThreshold) {
    console.log("Memory usage exceeded threshold, sending alert email...");
    sendEmail(
      "High Memory Usage Alert",
      `Memory usage is high: ${memoryUsage.heapUsed} bytes (${(
        (memoryUsage.heapUsed / totalMemory) *
        100
      ).toFixed(2)}% of total memory)`
    );

    memoryAlert = true;
  }

  const currentCpuUsage =
    ((cpuUsage.user + cpuUsage.system) / (os.cpus().length * 1e6)) * 100;
  console.log(`Current CPU Usage: ${currentCpuUsage.toFixed(2)}%`);
  if (currentCpuUsage > cpuUsageThresholdPercentage) {
    console.log("CPU usage exceeded limit, sending alert email...");
    sendEmail(
      "High CPU Usage Alert",
      `CPU usage is high: ${currentCpuUsage.toFixed(2)}%`
    );
    cpuAlert = true;
  }
  if (!memoryAlert && !cpuAlert) {
    console.log(
      "Memory and CPU usage are within limits, sending normal state email..."
    );
    sendEmail(
      "System Normal State",
      `CPU and memory are operating normally:\nCPU Usage: ${currentCpuUsage.toFixed(
        2
      )}%\nMemory Usage: ${memoryUsage.heapUsed} bytes (${(
        (memoryUsage.heapUsed / totalMemory) *
        100
      ).toFixed(2)}% of total memory)`
    );
  }

  const responseMessage =
    `Current Memory Usage: ${memoryUsage.heapUsed} bytes\n` +
    `Current CPU Usage: ${currentCpuUsage.toFixed(2)}%\n` +
    (memoryAlert
      ? "Memory usage exceeded threshold!"
      : "Memory usage is within limits.") +
    "\n" +
    (cpuAlert
      ? "CPU usage exceeded threshold!"
      : "CPU usage is within limits.");

  res.send(responseMessage);
});

monitorApp.listen(MONITOR_PORT, () => {
  console.log(
    `Memory monitoring server running at http://localhost:${MONITOR_PORT}`
  );
});

setInterval(() => {
  checkMemoryUsage();
}, 10000);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

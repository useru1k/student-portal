import React, { useState, useEffect } from "react";
import ResourceCard from "../components/A_ResourceCard";
import ThresholdUpdater from "../components/A_ThresholdUpdater";

const A_Resource = () => {
  const [threshold, setThreshold] = useState(70); // Default threshold
  const [cpuUsage, setCpuUsage] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [latestAlert, setLatestAlert] = useState("Loading...");

  // Simulate fetching resource data
  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedCpu = Math.floor(Math.random() * 100); // Simulated CPU usage
      const simulatedMemory = Math.floor(Math.random() * 100); // Simulated Memory usage
      setCpuUsage(simulatedCpu);
      setMemoryUsage(simulatedMemory);

      // Set alert message
      if (simulatedCpu > threshold || simulatedMemory > threshold) {
        setLatestAlert(
          `High usage detected! CPU: ${simulatedCpu}%, Memory: ${simulatedMemory}%`
        );
      } else {
        setLatestAlert("No alerts");
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup
  }, [threshold]);

  const handleThresholdUpdate = () => {
    alert(`Threshold updated to ${threshold}%`);
  };

  return (
    <div className="p-5 font-sans bg-gray-900 text-gray-100 overflow-y-auto h-[73vh]">
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <ResourceCard
    title="CPU Usage"
    current={cpuUsage}
    alert={cpuUsage > threshold}
    threshold={threshold}
    />
    <ResourceCard
    title="Memory Usage"
    current={memoryUsage}
    alert={memoryUsage > threshold}
    threshold={threshold}
    />
    </div>

    <div className="p-5 bg-gray-800 text-gray-200 mt-5 rounded-md shadow-lg">
    <h3 className="text-lg font-bold">Latest Alert Message</h3>
    <p className="mt-2">{latestAlert}</p>
    </div>

    <div className="mt-5 pt-5">
    <ThresholdUpdater
    threshold={threshold}
    setThreshold={setThreshold}
    onUpdate={handleThresholdUpdate}
    />
    </div>
    </div>
  );
};

export default A_Resource;

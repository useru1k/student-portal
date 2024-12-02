import React, {useState , useEffect} from 'react'
import ResourceCard from "../components/A_ResourceCard"; 
import ThresholdUpdater from "../components/A_ThresholdUpdater"; 

function A_Resource() {
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
        setLatestAlert(`High usage detected! CPU: ${simulatedCpu}%, Memory: ${simulatedMemory}%`);
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
    <>
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
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
                <div style={{ padding: '20px', background: '#2c3e50', color: 'white', marginBottom: '10px' }}>
                  <h3>Latest Alert Message</h3>
                  <p>{latestAlert}</p>
                </div>
                <ThresholdUpdater
                  threshold={threshold}
                  setThreshold={setThreshold}
                  onUpdate={handleThresholdUpdate}
                />
              </div>
      </>
  )
}

export default A_Resource;
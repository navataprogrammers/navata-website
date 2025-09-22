import React, { useEffect, useState } from "react";

function Apitest() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("https://online.navata.com/SENDMAIL/stnidsjson1.jsp")

        if (!response.ok) {
          throw new Error("Failed to fetch stations");
        }

        const data = await response.json();
        setStations(data.Stations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stations:", error);
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Station List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={styles.list}>
          {stations.map((station) => (
            <li key={station.StnId} style={styles.item}>
              <strong>{station.StnId}</strong>: {station.StnName.trim()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding:"40px",
    fontFamily: "Arial, sans-serif",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
  },
  item: {
    background: "#f0f0f0",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
  },
};

export default Apitest;

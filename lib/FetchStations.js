export const fetchStations = async () => {
  try {
    const response = await fetch("https://online.navata.com/SENDMAIL/stnidsjson.jsp");
    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
    const data = await response.json();
    return data.Stations || data;
  } catch (err) {
    console.error("Failed to fetch stations:", err);
    return []; // Fallback to empty list
  }
};

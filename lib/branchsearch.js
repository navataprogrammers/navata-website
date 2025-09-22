// A helper function to check if a string is a 6-digit pincode
const isPincode = (text) => /^\d{6}$/.test(text.trim());

// The main API handler function
export default async function handler(req, res) {
  // Extract the 'query' parameter from the request URL
  // e.g., /api/branch-search?query=500072
  const { query } = req.query;

  // If no query is provided, send a "Bad Request" error
  if (!query) {
    return res.status(400).json({ error: "A search query is required." });
  }

  const trimmedQuery = query.trim();
  const encodedQuery = encodeURIComponent(trimmedQuery);

  try {
    // --- Pincode Search Logic ---
    if (isPincode(trimmedQuery)) {
      const apiUrl = `https://online.navata.com/SENDMAIL/searchbypincode.jsp?pincode=${encodedQuery}`;
      const apiResponse = await fetch(apiUrl);

      // Check if the external API call was successful
      if (!apiResponse.ok) {
        throw new Error(`Navata API failed for pincode: ${apiResponse.statusText}`);
      }
      
      const data = await apiResponse.json();
      
      // Return the data in a consistent format
      return res.status(200).json({ 
        branchDetails: data, 
        nearestBranches: [] 
      });
    }

    // --- Branch Name Search Logic ---
    else {
      // Create URLs for the two parallel API calls
      const branchDetailsUrl = `https://online.navata.com/SENDMAIL/stnaddressjson.jsp?wbstdets=${encodedQuery}`;
      const nearestBranchesUrl = `https://online.navata.com/SENDMAIL/nrststnaddressjson.jsp?stanid=${encodedQuery}`;

      // Fetch both branch details and nearest branches at the same time for efficiency
      const [branchResponse, nearbyResponse] = await Promise.all([
        fetch(branchDetailsUrl),
        fetch(nearestBranchesUrl)
      ]);

      // Check if both external API calls were successful
      if (!branchResponse.ok || !nearbyResponse.ok) {
        throw new Error(`Navata API failed for branch name search.`);
      }

      const branchData = await branchResponse.json();
      const nearbyData = await nearbyResponse.json();
      
      // Return the combined data
      return res.status(200).json({ 
        branchDetails: branchData, 
        nearestBranches: nearbyData 
      });
    }
  } catch (error) {
    // Log the actual error on the server for debugging
    console.error("Error in /api/branch-search:", error);
    
    // Send a generic "Internal Server Error" message to the client
    return res.status(500).json({ error: "Failed to fetch branch details from the server." });
  }
}
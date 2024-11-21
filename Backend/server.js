const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for requests from localhost:4200 (Angular app)
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from Angular app
  methods: 'GET', // Restrict to only GET requests (or specify other methods as needed)
  allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
}));

// Azure DevOps API URL
const ORGANIZATION = 'pickback'
const PROJECT = 'PickBack.ERP'
const API_VERSION = '6.0';

const azureQueriesUrl = 'https://dev.azure.com/pickback/PickBack.ERP/_apis/wit/queries?api-version=6.0';
const azureWorkItemsUrl = 'https://dev.azure.com/pickback/PickBack.ERP/_apis/wit/queries?api-version=6.0';
const wiqlUrl = `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/wit/wiql?api-version=${API_VERSION}`;

const PAT = '8QBTvUA3HTgnrfHYqLK3G2bA08Wt1hsMxG6f1a32V3EAXF1KvKIKJQQJ99AKACAAAAAotW3FAAASAZDOVYbG'; // Your PAT token



// Set up the proxy route
app.get('/api/azure-queries', async (req, res) => {
  try {
  const encodedPat = Buffer.from(':' + PAT).toString('base64');
    // Call Azure DevOps API using Axios
    const response = await axios.get(azureQueriesUrl, {
      headers: {
        'Authorization': 'Basic ' + encodedPat,
        'Content-Type': 'application/json',  // Ensure the content type is set to JSON
      },
    });

    // Send the response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tasks from Azure DevOps');
  }
});


app.get('/api/azure-work-items', async (req, res) => {
  try {
  const encodedPat = Buffer.from(':' + PAT).toString('base64');
    // Call Azure DevOps API using Axios
    const response = await axios.get(azureWorkItemsUrl, {
      headers: {
        'Authorization': 'Basic ' + encodedPat,
        'Content-Type': 'application/json',  // Ensure the content type is set to JSON
      },
    });

    // Send the response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tasks from Azure DevOps');
  }
});


// Proxy route for fetching the latest work items
app.get('/api/azure-latest-work-items', async (req, res) => {

// const workItemsUrl = `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/wit/workitems?ids=`;
// const API_VERSION_WORK_ITEMS = "6.0"; // Define the API version explicitly
  try {
    // Step 1: Execute WIQL query to get the latest work items
    const query = {
      query: "SELECT [System.Id], [System.Title], [System.CreatedDate] FROM WorkItems ORDER BY [System.CreatedDate] DESC",
    };
    const encodedPat = Buffer.from(':' + PAT).toString('base64');

    const wiqlResponse = await axios.post(wiqlUrl, query, {
      headers: {
        'Authorization': 'Basic ' + encodedPat,
        'Content-Type': 'application/json',
      },
    });

    // Extract work item IDs from the WIQL response
    const workItemIds = wiqlResponse.data.workItems.map(item => item.id);

    if (workItemIds.length === 0) {
      return res.json({ message: 'No work items found' });
    }


    res.json(wiqlResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching latest work items from Azure DevOps');
  }
});







app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

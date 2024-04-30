import { Client, Users } from "node-appwrite";

// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    // .setProject('<PROJECT_ID>')
    .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
    // .setProject(import.meta.env.APPWRITE_PROJECT_ID)
    .setKey('[API_KEY]');
  
    const users = new Users(client);

  // You can log messages to the console
  log('Hello, Logs!'); //Response

  // If something goes wrong, log an error
  error('Hello, Errors!');

  // The `req` object contains the request data
  if (req.method === 'GET') {
    // Send a response with the res object helpers
     `res.send()` // dispatches a string back to the client
    return res.send('Hello, World!');
  }
  // const payload = JSON.parse(req.payload);

let payload;
  try {
    payload = JSON.parse(req.payload);
  } catch (error) {
    // Handle the error
    console.error('Error parsing payload:', error);
  }
  console.log('payload:', payload);
  
  // const response = await users.get(payload['owner_id']);
  // console.log('response:', response);

  if (payload && payload.owner_id) {
  const response = await users.get(payload["owner_id"]); //This method only works on a server-side SDK
  console.log('response main:', response);

  //object to avoid some unnecesary info:
    const userData = {
      '$id': response.$id,
      'name': response.name,
      'profile_pic': response['prefs']['profile_pic'],
      'username': response['prefs']['username']
    }

  res.json(userData);
} else {
  console.error('Payload is undefined or does not have owner_id property');
}


  // `res.json()` is a handy helper for sending JSON
  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};

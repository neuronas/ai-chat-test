# AI chat

A Next.js App that implements [Vercel AI SDK](https://sdk.vercel.ai/) and is configured to use Google Vertex LLM model `gemini-2.0-flash`


## Follow next instructions to get it work locally

1- Clone the repo and create an `.env` file on the root of the project

2- You have to set the google/vertex environments variables, like the folowing
*those are `google/vertex credentials` that you can obtain from a service account JSON file (See:  [Generate Google Credentials](#generate-google-credentials))
```
GOOGLE_VERTEX_PROJECT="your-project-id"
GOOGLE_VERTEX_LOCATION="your-project-id"
GCP_SERVICE_ACCOUNT_EMAIL="your-service-account@your-project-id.iam.gserviceaccount.com"
GCP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggS... (rest of the key) ...\n-----END PRIVATE KEY-----\n"
```

3- Make sure you have Vertex AI **Enabled** on google console, on the left Navigation menu go to Vertex AI > Dashboard, then click on "enable all recommended APIs" or "Show API list" and enable only "Vertex AI API"

4- On the same page at bottom you can set the region to the value of `GOOGLE_VERTEX_LOCATION`, **us-central1** (Iowa by default)



### Generate Google Credentials
To generate credentnials go to google console, select a project and follows next steps:

1. **Navigate to Service Accounts:** In the Google Cloud Console, go to the "IAM & Admin" section, then select "Service Accounts".
2. **Create a Service Account:** Click on "+ Create Service Account" On "Grant this service account access to project" select `Vertex AI User` role" **!important**
3. **Go to the Keys Tab:** Once you've selected the service account, go to the "Keys" tab.
4. **Add a New Key:** Click on the "Add Key" dropdown, then select "Create new key".
5. **Choose JSON and Create**:** In the dialog that appears, select "JSON" as the key type, and then click "Create".
6. **Download and Secure the Key:** A JSON file containing the service account's private key



After that run:
```bash
npm i
npm run dev
```
Then open the local app url: [http://localhost:3000/](http://localhost:3000/)

## Architecture and design decisions
Implemented useChat hook for easy handling of current status and submition.
Make use of Next api route to interact with the AI and return messages data in a streaming way with
`createDataStreamResponse()`.
Execute tool based on a start system prompt setting.
Regardless of the message return from the model, the tool execution always returns the relevant data that can be stored or displayed to the user.



## Description of the tool function implemented
The App is a simple chat that interacts with `gemini-2.0-flash` model.
Write a message to interact with the AI, and attach a pdf or image file containing readeable information to execute a `PII Detector` tool that detects common PII patterns like:
    - Email addresses
    - Phone numbers
    - Social security numbers
    - Credit card numbers
    - Names (if possible within the time constraint)

*Although you're required to write a message when submitting, the message isn't relevant if a file is attached


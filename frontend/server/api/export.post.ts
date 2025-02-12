import { GoogleSpreadsheet } from "google-spreadsheet";
import { google } from "googleapis";
import { serverSupabaseClient } from "#supabase/server";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const { data: staffMembers, error } = await supabase
    .from("staff_members")
    .select("*")
    .eq("email", user?.email as string)
    .eq("id", user?.id as string);

  if (error || !staffMembers || staffMembers.length === 0) {
    return {
      status: 401,
      body: {
        message: "Unauthorized",
      },
    };
  }

  // Read request body
  const body = await readBody(event);

  // Get stuff from the runtime config
  const config = useRuntimeConfig(event);
  const email = config.clientEmail;
  const key = config.privateKey;

  // Scopes for Sheets and Drive read&write
  const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ];

  // Auth client for the APIs
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: key.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  // Google Drive API
  const drive = google.drive({ version: "v3", auth });

  // Folder ID in shared drive
  // const FOLDER_ID = "1zWKz_nNI3TCnMD6cDzbTI9Ldlh7-BSdw";
  const FOLDER_ID = "1tNyY1gwp7fFqMukLQF9N_zzi5tt55tPG";

  // File details, fetched from request body
  const fileMetaData = {
    name: body.eventName,
    mimeType: "application/vnd.google-apps.spreadsheet",
    parents: [FOLDER_ID],
  };

  try {
    // Create the file
    const file = await drive.files.create({
      requestBody: fileMetaData,
      fields: "id",
      supportsAllDrives: true,
    });

    // Get the file data once its made
    const fileId = file.data.id;

    // Modify file using google-spreadsheets
    const doc = new GoogleSpreadsheet(fileId as string, auth);
    await doc.loadInfo();

    // Add new sheet and headers
    const sheet = doc.sheetsByIndex[0];
    await sheet.setHeaderRow(["Name", "Email", "Registered on", "User ID"]);

    // Add the event registrations to the sheet
    await sheet.addRows(body.eventRegistrations);

    // Return the URL
    return {
      status: 200,
      url: `https://docs.google.com/spreadsheets/d/${fileId}`,
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: "Error creating the file",
      },
    };
  }

  // let result = await $fetch(`${config.strapiUrl}/api/hero`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${config.strapiToken}`,
  //   },
  // });

  // const doc = new GoogleSpreadsheet("<YOUR-DOC-ID>", jwt);
});

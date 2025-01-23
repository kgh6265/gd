import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const iso1806ToTime = (isoTimestamp) => {
  // Create a Date object from the ISO timestamp
  const utcDate = new Date(isoTimestamp);

  // Get UTC hours
  const utcHours = utcDate.getUTCHours();

  // Check if the input is already in UAE time (+4)
  const isUAE =
    (utcHours >= 0 && utcHours < 4) || (utcHours >= 8 && utcHours < 20);

  // If already in UAE time, return the original time
  if (isUAE) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return utcDate.toLocaleString("en-US", options);
  }

  // Calculate UAE time if not already in UAE time zone
  const uaeTime = new Date(utcDate.getTime() + 4 * 60 * 60 * 1000);

  // Format the UAE date and time as hours:minutes with 2 digits each
  return uaeTime.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handler = async (_request: Request): Promise<Response> => {
  const json = await _request.json();
  const record = json.record;

  console.log("INVOKED!");
  console.log(record);
  console.log(json);

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: _request.headers.get("Authorization")! },
        },
      }
    );

    const { data: eventData, error } = await supabaseClient
      .from("events")
      .select("*")
      .eq("event_id", record?.event_id)
      .not("published_at", "is", null)
      .single();

    console.log("eventData", eventData);
    console.error(error);

    const eventTitle = eventData?.title;
    const eventDescription = eventData?.description;
    const eventDate = eventData?.date;
    const eventLocation = eventData?.location || "TBA";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "no-reply@gdclub.khaleelgibran.com",
        to: record?.email,
        reply_to: "khaleel@mail.rit.edu",
        subject: "Beep boop! We've confirmed your registration!",
        html: `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Fira+Mono" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Inter);
    @import url(https://fonts.googleapis.com/css?family=Fira+Mono);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
</head>

<body style="word-spacing:normal;">
  <div style="">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:100px;">
                                <img height="auto" src="https://gdclub.ritdubai.ae/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <p style="border-top:solid 4px #f76902;font-size:1px;margin:0px auto;width:100%;">
                        </p>
                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #f76902;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Inter;font-size:18px;line-height:1.5;text-align:left;color:black;">
                          <p> Hello! <br /><br /> We've confirmed your registration for <b>${eventTitle}</b>! We can't wait to see you there! </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Fira Mono;font-size:15px;line-height:1;text-align:left;color:black;">
                          <p>
                            <b>${record?.uuid}</b>
                          </p>
                          <p>
                            <b>${record?.name}</b>
                          </p>
                          <p>
                            <b>${record?.email}</b>
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Inter;font-size:20px;line-height:1;text-align:left;color:black;">
                          <h3>Event Details</h3>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:black;font-family:Inter;font-size:20px;line-height:22px;table-layout:auto;width:100%;border:none;">
                          <tr>
                            <td style="padding: 5px 0px"><b>Name</b></td>
                            <td style="padding: 5px 0px">${eventTitle}</td>
                          </tr>
                          <tr>
                            <td style="padding: 5px 0px"><b>Date</b></td>
                            <td style="padding: 5px 0px">${formatDate(
                              eventDate
                            )}</td>
                          </tr>
                          <tr>
                            <td style="padding: 5px 0px"><b>Time</b></td>
                            <td style="padding: 5px 0px">${iso1806ToTime(
                              eventDate
                            )}</td>
                          </tr>
                          <tr>
                            <td style="padding: 5px 0px"><b>Location</b></td>
                            <td style="padding: 5px 0px">${eventLocation}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:50px;word-break:break-word;">
                        <div style="font-family:Inter;font-size:18px;line-height:1.5;text-align:left;color:black;">
                          <p> Best, <br /> Graphic Design Club, RIT Dubai </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:50px;word-break:break-word;">
                        <div style="font-family:Inter;font-size:14px;line-height:1.5;text-align:left;color:gray;">
                          <p>
                            <a href="https://www.instagram.com/ritd_gdclub/">Instagram</a>
                          </p>
                          <p>
                            <a href="https://www.linkedin.com/company/ritd-graphic-design-club/posts/?feedView=all">LinkedIn</a>
                          </p>
                          <p>
                            <a href="https://gdclub.ritdubai.ae">Website</a>
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Inter;font-size:10px;line-height:1.5;text-align:left;color:gray;">
                          <p> You are receiving this email because you registered for an event. </p>
                          <p> RIT Dubai, P.O. Box 341055, Dubai Silicon Oasis, Dubai, U.A.E </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>`,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

Deno.serve(handler);

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-confirmation-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

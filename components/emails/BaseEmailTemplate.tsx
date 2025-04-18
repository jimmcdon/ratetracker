interface BaseEmailTemplateProps {
  previewText?: string;
  heading: string;
  bodyContent: string | React.ReactNode;
  footerText?: string;
  logoUrl?: string;
  primaryColor?: string;
  backgroundColor?: string;
}

export const BaseEmailTemplate = ({
  previewText = "Email from Rate Tracker",
  heading,
  bodyContent,
  footerText = "© Rate Tracker. All rights reserved.",
  logoUrl = "https://ratetracker.us/rtrakerlogo_transparentbg.png", // Logo in root public folder
  primaryColor = "#ff5722", // Updated to match logo orange color
  backgroundColor = "#f9f9f9",
}: BaseEmailTemplateProps) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <title>${heading}</title>
        <!--[if mso]>
          <style>
            table {border-collapse: collapse;}
            td,th,div,p,a {font-family: Arial, sans-serif;}
          </style>
        <![endif]-->
      </head>
      <body style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: ${backgroundColor};
        color: #333333;
      ">
        <div style="display: none; max-height: 0; overflow: hidden;">${previewText}</div>
        
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: ${backgroundColor};
        ">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              ">
                <!-- Logo Header -->
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <img 
                      src="${logoUrl}" 
                      alt="Rate Tracker" 
                      width="150" 
                      style="display: block; outline: none; border: none; text-decoration: none;"
                    />
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="
                    background-color: #ffffff; 
                    padding: 30px; 
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                  ">
                    <h1 style="
                      color: ${primaryColor};
                      margin-top: 0;
                      margin-bottom: 20px;
                      font-size: 24px;
                      font-weight: 600;
                    ">${heading}</h1>
                    
                    <div style="
                      color: #555555;
                      font-size: 16px;
                      line-height: 1.5;
                    ">
                      ${bodyContent}
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <p style="
                      color: #888888;
                      font-size: 14px;
                      margin: 0;
                    ">${footerText}</p>
                    <p style="
                      color: #888888;
                      font-size: 12px;
                      margin-top: 8px;
                    ">
                      <a href="https://ratetracker.us" style="color: ${primaryColor}; text-decoration: none;">
                        ratetracker.us
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}; 
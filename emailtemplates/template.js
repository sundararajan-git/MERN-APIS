
export const verificationTemplate = (token, software) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet">
    <style>
    *{
      font-family: Verdana, Geneva, Tahoma, sans-serif !important;
    }
    </style>
  </head>

  <body style="margin:0; padding:0; background-color:#f9f9f9;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:auto; padding:20px; font-family:'Questrial', Arial, sans-serif; line-height:1.6; color:#000;">
      <tr>
        <td style="text-align:center; padding:10px;">
          <h2 style="margin:0; color:#4169e1; font-family:'Questrial', Arial, sans-serif;">VERIFY YOUR EMAIL</h2>
        </td>
      </tr>

      <tr>
        <td style="padding:20px; background-color:#ffffff; border-radius:8px;">
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">Hello,</p>
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">Thank you for signing up!</p>
          <p style="margin:0 0 5px 0; font-weight:600; font-family:'Questrial', Arial, sans-serif;">Verification code</p>
          
          <div style="text-align:center; margin:20px 0;">
            <span style="font-size:32px; font-weight:bold; letter-spacing:5px; color:#4169e1; font-family:'Questrial', Arial, sans-serif;">
              ${token}
            </span>
          </div>

          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">
            Enter this code on the verification page to complete your registration.
          </p>
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">This code will expire in 15 minutes.</p>
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">If you didn't create an account with us, please ignore this email.</p>

          <div style="margin-top:20px; font-family:'Questrial', Arial, sans-serif;">
            <span>Best regards,</span>
            <div style="display:flex; flex-direction:row; align-items:center; gap:0.5em; margin-top:5px;">
              <p style="color:#4169e1; font-weight:600; font-family:'Questrial', Arial, sans-serif;">${software}</p>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="text-align:center; margin-top:20px; color:#888888; font-size:0.8em; padding-top:10px; font-family:'Questrial', Arial, sans-serif;">
          <p style="margin:0;">This is an automated message, please do not reply to this email.</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`

export const sendWelcomeTemplate = (software) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet">
     <style>
    *{
      font-family: Verdana, Geneva, Tahoma, sans-serif !important;
    }
    </style>
  </head>

  <body style="margin:0; padding:0; background-color:#f9f9f9;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:auto; padding:20px; font-family:'Questrial', Arial, sans-serif; line-height:1.6; color:#000;">
      
      <tr>
        <td style="text-align:center; padding:10px;">
          <h2 style="margin:0; color:#4169e1; font-family:'Questrial', Arial, sans-serif;">Welcome</h2>
        </td>
      </tr>

      <tr>
        <td style="padding:20px; background-color:#ffffff; border-radius:8px;">
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">Hi ,</p>
          <p style="margin:0 0 10px 0; font-weight:600; font-family:'Questrial', Arial, sans-serif;">Welcome to</p>

          <div style="text-align:center; margin:20px 0;">
            <span style="font-size:32px; font-weight:bold; color:#4169e1; font-family:'Questrial', Arial, sans-serif;">
              ${software}
            </span>
          </div>

          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">Thanks for registering.</p>
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">If you didn't create an account with us, please ignore this email.</p>

          <div style="margin-top:20px; font-family:'Questrial', Arial, sans-serif;">
            <span>Best regards,</span>
            <div style="display:flex; flex-direction:row; align-items:center; gap:0.5em; margin-top:5px;">
              <p style="color:#4169e1; font-weight:600; font-family:'Questrial', Arial, sans-serif;">${software}</p>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="text-align:center; margin-top:20px; color:#888888; font-size:0.8em; padding-top:10px; font-family:'Questrial', Arial, sans-serif;">
          <p style="margin:0;">This is an automated message, please do not reply to this email.</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`

export const forgotPasswordTemplate = (link, software) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet">
     <style>
    *{
      font-family: Verdana, Geneva, Tahoma, sans-serif !important;
    }
    </style>
  </head>

  <body style="margin:0; padding:0; background-color:#f9f9f9;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:auto; padding:20px; font-family:'Questrial', Arial, sans-serif; line-height:1.6; color:#333;">
      
      <tr>
        <td style="text-align:center; padding:20px;">
          <h1 style="margin:0; color:#4169e1; font-family:'Questrial', Arial, sans-serif;">RESET PASSWORD</h1>
        </td>
      </tr>

      <tr>
        <td style="padding:20px; background-color:#ffffff; border-radius:8px;">
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">Hello,</p>
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">
            We received a request to reset your password. If you didn't make this request, please ignore this email.
          </p>
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">To reset your password, click the button below:</p>

          <div style="text-align:center; margin:30px 0;">
            <a href="${link}" style="background-color:#4169e1; color:white; padding:12px 20px; text-decoration:none; border-radius:10px; font-weight:bold; font-family:'Questrial', Arial, sans-serif;">
              Reset Password
            </a>
          </div>

          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">This link will expire in 1 hour.</p>

          <div style="margin-top:20px; font-family:'Questrial', Arial, sans-serif;">
            <span>Best regards,</span>
            <div style="display:flex; flex-direction:row; align-items:center; gap:0.5em; margin-top:5px;">
              <p style="color:#4169e1; font-weight:600; font-family:'Questrial', Arial, sans-serif;">${software}</p>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="text-align:center; margin-top:20px; color:#888888; font-size:0.8em; padding-top:10px; font-family:'Questrial', Arial, sans-serif;">
          <p style="margin:0;">This is an automated message, please do not reply to this email.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`


export const resetSuccessTemplate = (software) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Successful</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet">
     <style>
    *{
      font-family: Verdana, Geneva, Tahoma, sans-serif !important;
    }
    </style>
  </head>

  <body style="margin:0; padding:0; background-color:#f9f9f9;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:auto; padding:20px; font-family:'Questrial', Arial, sans-serif; line-height:1.6; color:#333;">
      
      <tr>
        <td style="text-align:center; padding:10px;">
          <h2 style="margin:0; color:#4169e1; font-family:'Questrial', Arial, sans-serif;">PASSWORD RESET SUCCESSFUL</h2>
        </td>
      </tr>

      <tr>
        <td style="padding:20px; background-color:#ffffff; border-radius:8px;">
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">Hello,</p>
          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">
            We're writing to confirm that your password has been successfully reset.
          </p>

          <div style="text-align:center; margin:20px 0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="#4169e1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">
            If you did not initiate this password reset, please contact our support team immediately.
          </p>

          <p style="margin:0 0 5px 0; font-family:'Questrial', Arial, sans-serif;">For security reasons, we recommend that you:</p>
          <ul style="margin:0 0 10px 20px; font-family:'Questrial', Arial, sans-serif;">
            <li>Use a strong, unique password</li>
            <li>Enable two-factor authentication if available</li>
            <li>Avoid using the same password across multiple sites</li>
          </ul>

          <p style="margin:0 0 10px 0; font-family:'Questrial', Arial, sans-serif;">Thank you for helping us keep your account secure.</p>

          <div style="margin-top:20px; font-family:'Questrial', Arial, sans-serif;">
            <span>Best regards,</span>
            <div style="display:flex; flex-direction:row; align-items:center; gap:0.5em; margin-top:5px;">
              <p style="color:#4169e1; font-weight:600; font-family:'Questrial', Arial, sans-serif;">${software}</p>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="text-align:center; margin-top:20px; color:#888888; font-size:0.8em; padding-top:10px; font-family:'Questrial', Arial, sans-serif;">
          <p style="margin:0;">This is an automated message, please do not reply to this email.</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`

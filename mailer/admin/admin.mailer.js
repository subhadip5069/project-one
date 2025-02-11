const nodemailer = require("nodemailer");

 const sendAdminNotificationEmail = async (formData) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.Email,  // Replace with your email
          pass: process.env.password,   // Replace with your email password or app-specific password
        },
      });
  
      const mailOptions = {
        from: process.env.Email,
        to: "rahulshop4560000@gmail.com",   // Replace with the admin's email
        subject: `Form Updated succesfully: ${formData.Name}`,
        html: `
        <h3>Candidate Form Updated Successfully</h3>
        <p>The form for <strong>${formData.Name}</strong> (UID: ${formData.Uid}) has been updated.</p>
        <table style="border-collapse: collapse; width: 100%; margin-top: 15px;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Field</th>
              <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Full Name</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${formData.Name}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">UID</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${formData.Uid}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Designation</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${formData.Designation}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Work</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${formData.Work}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Area</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${formData.Area}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Validity</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${formData.ValidityStart} to ${formData.ValidityEnd}</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 15px;">Thank you!</p>
      `,
      };      
  
      await transporter.sendMail(mailOptions);
      console.log('Email sent to admin successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  module.exports = sendAdminNotificationEmail;
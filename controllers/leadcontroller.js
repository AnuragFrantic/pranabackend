const Lead = require("../models/Lead");
const nodemailer = require("nodemailer");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

exports.createLead = async (req, res) => {
    const { name, mobile, profession, mode, city, state } = req.body;

    try {
        // 1️⃣ Save to MongoDB
        const newLead = new Lead({
            name,
            mobile,
            profession,
            mode,
            city,
            state,
        });

        await newLead.save();

        // 2️⃣ Email to Admin
        const mailOptions = {
            from: `"Green Prana Franchise" <${process.env.GMAIL_USER2}>`,
            to: process.env.ADMIN_EMAILS.split(","), // support multiple admins
            subject: `🌿 New Franchise Inquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #eef7ee; padding: 25px;">
                    <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; 
                                box-shadow: 0 3px 12px rgba(0,0,0,0.10);">
                        
                        <h2 style="background-color: #0c7a36; color: white; padding: 18px 25px; 
                                   margin: 0; border-radius: 10px 10px 0 0;">
                            🌿 New Franchise Lead – Green Prana
                        </h2>

                        <div style="padding: 25px;">
                            <p style="font-size: 16px;">Hello Admin,</p>
                            <p style="font-size: 15px; margin-top: -8px;">
                                A new franchise inquiry has been submitted from the Green Prana website.
                            </p>

                            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 15px;">
                                <tr>
                                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;
                                               background-color: #f5fff5;">Name</td>
                                    <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
                                </tr>

                                <tr>
                                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;
                                               background-color: #f5fff5;">Mobile</td>
                                    <td style="padding: 10px; border: 1px solid #ddd;">${mobile}</td>
                                </tr>

                                <tr>
                                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;
                                               background-color: #f5fff5;">Profession</td>
                                    <td style="padding: 10px; border: 1px solid #ddd;">${profession}</td>
                                </tr>

                                <tr>
                                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;
                                               background-color: #f5fff5;">Franchise Mode</td>
                                    <td style="padding: 10px; border: 1px solid #ddd;">${mode}</td>
                                </tr>

                                <tr>
                                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;
                                               background-color: #f5fff5;">City</td>
                                    <td style="padding: 10px; border: 1px solid #ddd;">${city}</td>
                                </tr>

                                <tr>
                                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;
                                               background-color: #f5fff5;">State</td>
                                    <td style="padding: 10px; border: 1px solid #ddd;">${state}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Lead saved and email sent successfully!",
        });
    } catch (error) {
        console.error("Lead creation error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit franchise inquiry.",
        });
    }
};

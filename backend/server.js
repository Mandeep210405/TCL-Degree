import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import session from "express-session";
import cors from "cors";
import multer from 'multer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
const app = express();
const port = 3000;
let fname;
// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'allvax'
});

app.use(session({
    secret: 'rd_is_best',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, 
        secure: false,
        sameSite: 'lax',
        httpOnly: true
    },
    name: 'sessionId' 
}));

db.connect((err) => {
    if(err){
        console.error("Error connecting to database:", err);
        return;
    }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       return cb(null, '../certis');
    },
    filename: function (req, file, cb) {
      return cb(null, Date.now()+ file.originalname);
    }
  });
const upload = multer({ storage: storage });

app.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    if(!name || !email || !subject || !message){
        return res.status(400).json({error: "All fields are required"});
    }
    
    const sql = "INSERT INTO `contact_us`(`name`, `email`, `subject`, `message`) VALUES (?,?,?,?);";
    db.query(sql, [name, email,subject, message], (err, result) => {
        if(err){
            console.error("Error inserting contact us:", err);
            return res.status(500).json({error: "Failed to insert contact us"});
        }
        return res.json({success: "Contact us inserted successfully"});
    });
});

app.get("/vaccines", (req, res) => {
    const sql = "SELECT vaccinename FROM `vaccines`";
    db.query(sql, (err, result) => {
        if(err){
            console.error("Error fetching vaccines:", err);
            return res.status(500).json({error: "Failed to fetch vaccines"});
        }
        const vaccineNames = result.map(item => item.vaccinename);
        return res.json({data:vaccineNames});
    });
});

app.get("/user/profile", (req, res) => {
    if(!req.session.userEmail){
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql = "SELECT `fullname`,`email`, `adharnumber`, `contact`, `dob` FROM `login` WHERE email =?";
    db.query(sql,[req.session.userEmail], (err, result) => {
        if(err){
            console.error("Error fetching profile:", err);
            return res.status(500).json({error: "Failed to fetch profile"});
        }
        
        const prof= {
            fullName: result[0].fullname,
            email: result[0].email,
            adharNumber: result[0].adharnumber,
            contactNumber: result[0].contact,
            dateOfBirth: result[0].dob
        };
        return res.json({data:prof});
    });
});

app.put("/user/profile", (req, res) => {
    const {fullName, email, adharNumber, contactNumber, dateOfBirth} = req.body;
    if(!fullName || !email || !adharNumber || !contactNumber || !dateOfBirth){
        return res.status(400).json({error: "All fields are required"});
    }  
    if(!req.session.userEmail){
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql = "UPDATE `login` SET `fullname`=?,`email`=?,`adharnumber`=?,`contact`=?,`dob`=? WHERE email=?";
    db.query(sql, [fullName, email, adharNumber, contactNumber, dateOfBirth, req.session.userEmail], (err, result) => {
        if(err){
            console.error("Error updating profile:", err);
            return res.status(500).json({error: "Failed to update profile"});
        }
        return res.json({success: "Profile updated successfully"});
    });
});

app.get("/healthcare-centers", (req, res) => {
    const sql = "SELECT `id`, `boothName`, `boothAddress` FROM `booth_login` ";
    db.query(sql, (err, result) => {
        if(err){
            console.error("Error fetching centers:", err);
            return res.status(500).json({error: "Failed to fetch centers"});
        }
        const centers = result.map(item => ({id: item.id, name: item.boothName + "-"+item.boothAddress}));
        return res.json({data:centers});
    });
});

app.get("/user/family-members", (req, res) => {
    if (!req.session.userEmail) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql = "SELECT * FROM `family_member` WHERE `user_email` = ?";
    db.query(sql, [req.session.userEmail], (err, result) => {
        if(err){
            console.error("Error fetching family members:", err);
            return res.status(500).json({error: "Failed to fetch family members"});
        }
        const fmyName = result.map(item => ({id: item.id, name: item.fmy_name, adhar: item.fmy_adhar, dob: item.dob}));
        return res.json({data:fmyName});
    });
});

app.post("/user/family-members",(req,res)=>{
    const {name, birthday , adharNumber} = req.body;
    if(!name || !birthday || !adharNumber ){
        return res.status(400).json({error: "All fields are required"});
    }
    if(!req.session.userEmail){
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql = "INSERT INTO `family_member`(`fmy_name`, `fmy_adhar`, `dob`, `user_email`) VALUES (?,?,?,?);";
    db.query(sql, [name, adharNumber,birthday , req.session.userEmail  ], (err, result) => {
        if(err){
            console.error("Error inserting family member:", err);
            return res.status(500).json({error: "Failed to add family member"});
        }
        
       
        return res.json({success: "family member added   successfully"});
    });
});

app.put("/user/family-members/:id",(req,res)=>{
    const {name, birthday , adharNumber} = req.body;
    const id = req.params.id;
    if(!name || !birthday || !adharNumber|| !id){
        return res.status(400).json({error: "All fields are required"});
    }
    if(!req.session.userEmail){
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql = "UPDATE `family_member` SET `fmy_name`=?,`fmy_adhar`=?,`dob`=? WHERE id=? && user_email=?";
    db.query(sql, [name, adharNumber,birthday ,id, req.session.userEmail  ], (err, result) => {
        if(err){
            console.error("Error updating family member:", err);
            return res.status(500).json({error: "Failed to update family member"});
        }
        
       
        return res.json({success: "family member updated successfully"});
    });
});

app.delete("/user/family-members/:id",(req,res)=>{
    const id = req.params.id;
    if( !id ){
        return res.status(400).json({error: "All fields are required"});
    }
    if(!req.session.userEmail){
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql = "DELETE FROM `family_member` WHERE id=? && user_email=?;";
    db.query(sql, [id, req.session.userEmail  ], (err, result) => {
        if(err){
            console.error("Error deleting family member:", err);
            return res.status(500).json({error: "Failed to delete family member"});
        }
        return res.json({success: "family member deleted successfully"});
    });
});

app.post("/user/register", (req, res) => {
    
    const {fullName, email, password , adharNumber,contactNumber, dateOfBirth} = req.body;
    if(!fullName || !email || !password || !adharNumber || !contactNumber || !dateOfBirth){
        return res.status(400).json({error: "All fields are required"});
    }
    const sql = "INSERT INTO `login`(`fullname`, `password`, `email`, `adharnumber`, `contact`, `dob`) VALUES (?,?,?,?,?,?);";
    db.query(sql, [fullName,  password, email,adharNumber, contactNumber, dateOfBirth], (err, result) => {
        if(err){
            console.error("Error inserting user:", err);
            return res.status(500).json({error: "Failed to register user"});
        }
        db.query("INSERT INTO `family_member`( `fmy_name`, `fmy_adhar`, `dob`, `user_email`) VALUES (?,?,?,?);", [ fullName, adharNumber,dateOfBirth,email], (err, result) => {
            if(err){
                console.error("Error inserting family member:", err);
                return res.status(500).json({error: "Failed to register family member"});
            }
        });
        req.session.userEmail = email;
        return res.json({success: "User registered successfully"});
    });
    
});

app.post("/user/logout", (req, res) => {
    if (req.session.userEmail) {
        
        req.session.destroy((err) => {
            if(err){
                console.error("Error destroying session:", err);
                return res.status(500).json({error: "Failed to logout"});
            }
           
            return res.json({success: "Logged out successfully"});
        });
    } else {
        
        return res.status(500).json({error: "No active session found"});
    }
});

app.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    if(!email || !password ){
        return res.status(400).json({error: "All fields are required"});
    }
    const sql = "SELECT id FROM `login` WHERE email =? && password =?;";
    db.query(sql, [email, password], (err, result) => {
        if(err){
            console.error("Error Finding user:", err);
            return res.status(500).json({error: "Failed to log user"});
        }
        if (result.length === 0) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        req.session.userEmail = email;
        return res.json({success: "User Logged in successfully"});
    });
});

app.post("/booth/register", (req, res) => { 
    
    const {boothName, boothAddress, boothContactNumber , password} = req.body;
    if(!boothName || !boothAddress || !boothContactNumber || !password){
        return res.status(400).json({error: "All fields are required"});
    }
    const sql = "INSERT INTO `booth_login_request`(`boothName`, `boothAddress`, `boothContactNumber`, `password`) VALUES (?,?,?,?)";
    db.query(sql, [boothName,  boothAddress,boothContactNumber, password,], (err, result) => {
        if(err){
            console.error("Error inserting user:", err);
            return res.status(500).json({error: "Failed to register booth user"});
        }
        return res.json({success: "Booth registered successfully"});
    });
    
});

app.post("/booth/logout", (req, res) => {
    if (req.session.boothEmail) {
        req.session.destroy((err) => {
            if(err){
                console.error("Error destroying session:", err);
                return res.status(500).json({error: "Failed to logout"});
            }
            return res.json({success: "Logged out successfully"});
        });
    } else {
       
        return res.status(400).json({error: "No active session found"});
    }
});

app.post("/booth/login", (req, res) => {
    
    const { boothNumber, password } = req.body;
    if(!boothNumber || !password ){
        return res.status(400).json({error: "All fields are required"});
    }
    const sql = "SELECT id,boothName, boothAddress FROM `booth_login` WHERE id =? && password =?;";
    db.query(sql, [   boothNumber,password], (err, result) => {
        if(err){
            console.error("Error Finding user:", err);
            return res.status(500).json({error: "Failed to log user"});
        }
        if (result.length === 0) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        req.session.boothEmail = boothNumber;
        let booth = result[0].boothName+ "-"+ result[0].boothAddress;
        req.session.booth= booth;
        return res.json({success: "User Logged in successfully"});
    });
   
  
});

app.get("/user/vaccine-records", (req, res) => {
    if (!req.session.userEmail) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql = "SELECT * FROM vaccine_records WHERE user_email = ?";
    db.query(sql, [req.session.userEmail], (err, result) => {
        if (err) {
            console.error("Error fetching vaccine records:", err);
            return res.status(500).json({ error: "Failed to fetch vaccine records" });
        }
        
        return res.json(result);
    });
});


app.get("/user/upcoming-vaccinations", (req, res) => {
    if (!req.session.userEmail) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql = "SELECT * FROM upcoming_vaccinations WHERE user_email = ?";
    db.query(sql, [req.session.userEmail], (err, result) => {
        if (err) {
            console.error("Error fetching upcoming vaccinations:", err);
            return res.status(500).json({ error: "Failed to fetch upcoming vaccinations" });
        }
        return res.json(result);
    });
});

function compareDates(startDate, weeks, checkDate) {
    let start = new Date(startDate);
    let check = new Date(checkDate);
    
    // Add the given number of weeks to the start date
    let newDate = new Date(start);
    newDate.setDate(start.getDate() + (weeks * 7));
    
    // Return true if checkDate is on or after newDate, otherwise false
    return check >= newDate;
}

app.post("/user/schedule-vaccination",(req,res)=>{
    const {vaccineName, familyMember , healthcareCenter,date} = req.body;
    if(!vaccineName || !familyMember || !healthcareCenter || !date ){
        return res.status(400).json({error: "All fields are required"});
    }
    if(!req.session.userEmail){
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql5 = "SELECT `id` FROM `vaccine_records` WHERE user_email=? and vaccine_name=? and family_member=? ";
                        db.query(sql5, [ req.session.userEmail,vaccineName,familyMember ], (err, result) => {
                            if(err){
                                console.error("Error scheduling vaccination:", err);
                                return res.status(500).json({error: "Failed to schedule vaccination"});
                            }
                            if(result[0]){console.log("already vaccinated"); return res.status(400).json({error: "Failed to schedule vaccination"});}
    const sql1 = "SELECT `id` FROM `upcoming_vaccinations` WHERE user_email=? and vaccine_name=? and family_member=? ";
                        db.query(sql1, [ req.session.userEmail,vaccineName,familyMember ], (err, result) => {
                            if(err){
                                console.error("Error scheduling vaccination:", err);
                                return res.status(500).json({error: "Failed to schedule vaccination"});
                            }
                            if(result[0]){return res.status(400).json({error: "Failed to schedule vaccination"});}
    const sql1 = "SELECT `vaccinename1`, `period` FROM `vaccine_duration` WHERE vaccinename2=? ";
    db.query(sql1, [ vaccineName ], (err, result) => {
        if(err){
            console.error("Error scheduling vaccination:", err);
            return res.status(500).json({error: "Failed to schedule vaccination"});
        }
        console.log("result of vacine dur");
        console.log(result);
        
        if(result[0]){ 
            const vc1=result[0].vaccinename1;
            const prd= result[0].period;
            const sql2 = "SELECT `date` FROM `vaccine_records` WHERE family_member =? && vaccine_name=? && user_email =?;";
            db.query(sql2, [ familyMember,vc1,req.session.userEmail], (err, result) => {
             if(err){
                console.error("Error scheduling vaccination:", err);
                 return res.status(500).json({error: "Failed to schedule vaccination"});
                }
                console.log("result of vaccine record before");
                console.log(result);
                if(!result[0]){
                     res.status(400).json({error:"patient has not taken previous Dose"});
                     }
                     else{
                         if(compareDates(result[0].date,prd,date)){
                            const sql = "INSERT INTO `upcoming_vaccinations`(`user_email`, `vaccine_name`, `due_date`, `family_member`,`healthcareCenter`) VALUES (?,?,?,?,?)";
                            db.query(sql, [ req.session.userEmail,vaccineName,date,familyMember,healthcareCenter ], (err, result) => {
                                if(err){
                                    console.error("Error scheduling vaccination:", err);
                                    return res.status(500).json({error: "Failed to schedule vaccination"});
                                }
                                console.log("data insert if before data is found valid");
                                addSuggestion(req.session.userEmail,vaccineName,date,familyMember,healthcareCenter);
                                deleteSuggestion(req.session.userEmail,vaccineName,familyMember);
                                return res.json({success: "vaccination scheduled successfully"});
                            });}
                            else {
                                return res.status(400).json({error: "Failed to schedule vaccination"});
                            }
                        }
                    });}
                    else{ 
                        const sql1 = "SELECT `id` FROM `upcoming_vaccinations` WHERE user_email=? and vaccine_name=? and family_member=? ";
                        db.query(sql1, [ req.session.userEmail,vaccineName,familyMember ], (err, result) => {
                            if(err){
                                console.error("Error scheduling vaccination:", err);
                                return res.status(500).json({error: "Failed to schedule vaccination"});
                            }
                            if(result[0]){return res.status(400).json({error: "Failed to schedule vaccination"});}
                        const sql = "INSERT INTO `upcoming_vaccinations`(`user_email`, `vaccine_name`, `due_date`, `family_member`,`healthcareCenter`) VALUES (?,?,?,?,?)";
                        db.query(sql, [ req.session.userEmail,vaccineName,date,familyMember,healthcareCenter ], (err, result) => {
                            if(err){
                                console.error("Error scheduling vaccination:", err);
                                return res.status(500).json({error: "Failed to schedule vaccination"});
                            }
                            console.log("data is inserted as no before dose required");
                            addSuggestion(req.session.userEmail,vaccineName,date,familyMember,healthcareCenter);
                            deleteSuggestion(req.session.userEmail,vaccineName,familyMember);
                            return res.json({success: "vaccination scheduled successfully"});
                        });});
                    }
                });});});
            });

function deleteSuggestion(mail,vname,fm){
    const sql1 = "DELETE FROM `vaccine_suggest` WHERE vaccine_name=? and user_email=? and family_member=?;";
    db.query(sql1, [ vname,mail,fm ], (err, result) => {
        if(err){
            console.error("Error scheduling vaccination:", err);
            throw new Error("Error fetch vaccine");
        }
    console.log("deleted suggestion");
    });
}

function addSuggestion(mail,vname,dt,fm,hcc) {
    const sql1 = "SELECT `vaccinename2`, `period` FROM `vaccine_duration` WHERE vaccinename1=? ";
    db.query(sql1, [ vname ], (err, result) => {
        if(err){
            console.error("Error scheduling vaccination:", err);
            throw new Error("Error fetch vaccine");
        }
        console.log(result);
        if(result[0]){
            const resultdate = new Date(dt);
            resultdate.setDate(resultdate.getDate() + result[0].period* 7);
            const sql = "INSERT INTO `vaccine_suggest`(`user_email`, `vaccine_name`, `due_date`, `family_member` ) VALUES (?,?,?,?)";
            db.query(sql, [ mail,result[0].vaccinename2,resultdate,fm], (err, result) => {
                if(err){
                    console.error("Error scheduling vaccination:", err);
                    throw new Error("Error in inserting");
                }
            });
         }

        });
}

app.get("/booth/bookings",(req,res)=>{
    if(!req.session.boothEmail){
        return res.status(401).json({ error: "Not authenticated" });
    }
    
        const sql = "SELECT `id`, `vaccine_name`, `due_date`, `family_member`, `status` FROM `upcoming_vaccinations` WHERE healthcareCenter=? ";
        db.query(sql,[req.session.booth], (err, result) => {
        if(err){
            console.error("Error fetching bookings:", err);
            return res.status(500).json({error: "Failed to fetch bookings"});
        }
        const booking = result.map(item => ({id: item.id, vax_name:item.vaccine_name, date: item.due_date, familyMember:item.family_member,status:item.status }));
        return res.json({data:booking});
    });
       
    
});

app.get("/booth/bookings/:id/approve",(req,res)=>{
    const id = req.params.id; 
    if (!req.session.boothEmail) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql = "UPDATE `upcoming_vaccinations` SET `status`=? WHERE id =?";
    db.query(sql, ["approved",id], (err, result) => {
        if (err) {
            console.error("Error fetching upcoming vaccinations:", err);
            return res.status(500).json({ error: "Failed to fetch upcoming vaccinations" });
        }
        const sql2 = "SELECT  `user_email`, `vaccine_name`, `due_date`, `family_member`, `healthcareCenter` FROM `upcoming_vaccinations` WHERE id=?;";
        db.query(sql2, [id], (err, result) => {
            if (err) {
                console.error("Error fetching upcoming vaccinations:", err);
                return res.status(500).json({ error: "Failed to fetch upcoming vaccinations" });
            }
            console.log(result[0].user_email);
            sendVaccineNotification(result[0].family_member,result[0].due_date,result[0].vaccine_name,result[0].user_email,result[0].healthcareCenter);
        });
        return res.sendStatus(200);
    });
});


async function sendVaccineNotification(patient_name, date, vaccine, user_email, health_care_center) {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rathindave7@gmail.com',
            pass: 'revkkbyqfvpmehkp'
        }
    });

    // Email content
    const mailOptions = {
        from: '"Vaccine Scheduler" rathindave7@gmail.com',
        to: 'co.41rathindave@gmail.com',
        subject: `Vaccine Appointment Confirmation for ${patient_name}`,
        html: `
            <h3>Dear User,</h3>
            <p>Your request for the <strong>${vaccine}</strong> vaccine has been successfully scheduled.</p>
            <p>
                <strong>Patient Name:</strong> ${patient_name}<br>
                <strong>Date:</strong> ${date}<br>
                <strong>Healthcare Center:</strong> ${health_care_center}
            </p>
            <p>Please ensure to reach the center on time and carry a valid ID proof.</p>
            <br>
            <p>Regards,<br>
            Vaccine Scheduler Team</p>
        `
    };

    // Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}




async function sendVaccinationCertificateEmail(patient_name, vaccine_name, date, user_email, healthcare_center, pdfFilePath) {
    // Create the transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rathindave7@gmail.com',
            pass: 'revkkbyqfvpmehkp'
        }
    });
    console.log(pdfFilePath);
    const filePath = path.join('../certis',pdfFilePath);
    // Email content
    const mailOptions = {
        from: '"Vaccine Authority" <your_email@gmail.com>',
        to: 'co.41rathindave@gmail.com',
        subject: `Vaccination Certificate for ${patient_name}`,
        html: `
            <h2>Congratulations, ${patient_name}!</h2>
            <p>We are pleased to inform you that you have successfully received the <strong>${vaccine_name}</strong> vaccine.</p>
            <p>
                <strong>Healthcare Center:</strong> ${healthcare_center}<br>
                <strong>Date:</strong> ${date}
            </p>
            <p>Your vaccination certificate is attached to this email. Please keep it safe for future reference.</p>
            <br>
            <p>Wishing you good health,<br>
            <strong>Vaccination Department</strong></p>
        `,
        attachments: [
            {
                filename: 'Vaccination_Certificate.pdf',
                path: filePath,
                contentType: 'application/pdf'
            }
        ]
    };

    // Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Certificate email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending certificate email:', error);
    }
}


app.get("/booth/bookings/:id/complete",(req,res)=>{
    const id = req.params.id; 
    if (!req.session.boothEmail) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const sql1 = "SELECT  `family_member`, `vaccine_name`,`due_date`,`user_email`,`healthcareCenter` FROM `upcoming_vaccinations` WHERE id=?;";
    db.query(sql1, [id], (err, result) => {
        if (err) {
            console.error("Error fetching upcoming vaccinations:", err);
            return res.status(500).json({ error: "Failed to fetch upcoming vaccinations" });
        }
        const detail = result.map(item => ({name: item.family_member, vaccinename : item.vaccine_name, date: item.due_date, uemail: item.user_email, hc: item.healthcareCenter}));
       
  let  dt = formatDate(detail[0].date);
    generateCertificate(detail[0].name, detail[0].vaccinename, dt);
   
    const sql = "UPDATE `upcoming_vaccinations` SET `status`=? WHERE id =?";
    db.query(sql, ["complete",id], (err, result) => {
        if (err) {
            console.error("Error fetching upcoming vaccinations:", err);
            return res.status(500).json({ error: "Failed to fetch upcoming vaccinations" });
        }
        const sql = "INSERT INTO `vaccine_records`(`user_email`, `vaccine_name`, `date`, `family_member`,`healthcarecenter`,`proof_document`) values (?,?,?,?,?,?);  ";
    db.query(sql, [detail[0].uemail,detail[0].vaccinename,detail[0].date,detail[0].name,detail[0].hc,fname], (err, result) => {
        if (err) {
            console.error("Error fetching upcoming vaccinations:", err);
            return res.status(500).json({ error: "Failed to fetch upcoming vaccinations" });
        }
        
        const sql = "DELETE FROM `upcoming_vaccinations` WHERE id =? ";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching upcoming vaccinations:", err);
            return res.status(500).json({ error: "Failed to fetch upcoming vaccinations" });
        }
        sendVaccinationCertificateEmail(detail[0].name,detail[0].date,detail[0].vaccinename,detail[0].uemail,detail[0].hc,fname);
        return res.sendStatus(200);
    });
        
    });
        
    });
});
});

app.post("/user/vaccine-records",upload.single('proofDocument') ,(req,res)=>{
    const { vaccineName, date, familyMember, healthcareCenter} = req.body;
    if (!req.session.userEmail) {
                return( res.status(401).json({ error: "Not authenticated" }));
            }
            if(!vaccineName || !familyMember || !healthcareCenter || !date ){
                return res.status(400).json({error: "All fields are required"});
            }
const sql5 = "SELECT `id` FROM `vaccine_records` WHERE user_email=? and vaccine_name=? and family_member=? ";
db.query(sql5, [ req.session.userEmail,vaccineName,familyMember ], (err, result) => {
if(err){
    console.error("Error scheduling vaccination:", err);
    return res.status(500).json({error: "Failed to schedule vaccination"});
}

//if yes then return 

if(result[0]){console.log("already vaccinated"); return res.status(400).json({error: "Failed to schedule vaccination"});}
const sql1 = "SELECT `id` FROM `upcoming_vaccinations` WHERE user_email=? and vaccine_name=? and family_member=? ";
db.query(sql1, [ req.session.userEmail,vaccineName,familyMember ], (err, result) => {
if(err){
console.error("Error scheduling vaccination:", err);
return res.status(500).json({error: "Failed to schedule vaccination"});
}

//if yes then return 
if(result[0]){return res.status(400).json({error: "Failed to schedule vaccination"});}



//---not vaccinated and not schedule check previous dose is taken or not ---//
const sql1 = "SELECT `vaccinename1`, `period` FROM `vaccine_duration` WHERE vaccinename2=? ";
db.query(sql1, [ vaccineName ], (err, result) => {
if(err){
console.error("Error scheduling vaccination:", err);
return res.status(500).json({error: "Failed to schedule vaccination"});
}

//if previous is there check it is taken or not 
if(result[0]){ 
const vc1=result[0].vaccinename1;   
const sql2 = "SELECT `date` FROM `vaccine_records` WHERE family_member =? && vaccine_name=? && user_email =?;";
db.query(sql2, [ familyMember,vc1,req.session.userEmail], (err, result) => {
if(err){
console.error("Error scheduling vaccination:", err);
return res.status(500).json({error: "Failed to schedule vaccination"});
}
console.log("result of vaccine record before");
console.log(result);

//previous dose is not taken error
if(!result[0]){res.status(400).json({error:"patient has not taken previous Dose"});}

//taken then
else{

const sql = "INSERT INTO vaccine_records (user_email, vaccine_name, date, family_member, proof_document,healthcarecenter) VALUES (?, ?, ?, ?, ?,?)";
db.query(sql, [req.session.userEmail, vaccineName, date, familyMember,req.file.filename , healthcareCenter], (err, result) => {
    if (err) {
        console.error("Error adding vaccine record:", err);
        return res.status(500).json({ error: "Failed to add vaccine record" });
    }
    console.log("data insert if before data is found valid");
    addSuggestion(req.session.userEmail,vaccineName,date,familyMember,healthcareCenter);
    return res.json({success: "vaccination successfully"});
    });
}
                            
});
}
else{ 
const sql1 = "SELECT `id` FROM `upcoming_vaccinations` WHERE user_email=? and vaccine_name=? and family_member=? ";
db.query(sql1, [ req.session.userEmail,vaccineName,familyMember ], (err, result) => {
if(err){
console.error("Error scheduling vaccination:", err);
return res.status(500).json({error: "Failed to schedule vaccination"});
}
if(result[0]){return res.status(400).json({error: "Failed to schedule vaccination"});}
const sql = "INSERT INTO vaccine_records (user_email, vaccine_name, date, family_member, proof_document,healthcarecenter) VALUES (?, ?, ?, ?, ?,?)";
db.query(sql, [req.session.userEmail, vaccineName, date, familyMember,req.file.filename , healthcareCenter], (err, result) => {
    if (err) {
        console.error("Error adding vaccine record:", err);
        return res.status(500).json({ error: "Failed to add vaccine record" });
    }
console.log("data is inserted as no before dose required");
addSuggestion(req.session.userEmail,vaccineName,date,familyMember,healthcareCenter);
return res.json({success: "vaccination successfully"});
});});
}
});});});
            
});

function generateCertificate(name, course, date) {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    const fileName = `certificate_${name.replace(/\s+/g, '_')}_${course}_${date}.pdf`;
    const filePath = path.join('../certis', fileName);
    
    // Ensure the directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Background
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f8f8f8');

    // Certificate Border
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke('#000');

    // Title
    doc.font('Helvetica-Bold').fontSize(40).fillColor('#000')
       .text('Certificate of Vaciination', { align: 'center' })
       .moveDown(1);

    // Awarded To
    doc.font('Helvetica').fontSize(25).fillColor('#444')
       .text('This is to certify that', { align: 'center' })
       .moveDown(1);

    doc.font('Helvetica-Bold').fontSize(30).fillColor('#000')
       .text(name, { align: 'center' })
       .moveDown(1);

    // Course Details
    doc.font('Helvetica').fontSize(22).fillColor('#444')
       .text(`has successfully recieved the vaccine`, { align: 'center' })
       .moveDown(1);

    doc.font('Helvetica-Bold').fontSize(28).fillColor('#000')
       .text(course, { align: 'center' })
       .moveDown(1);

    // Date
    doc.font('Helvetica').fontSize(20).fillColor('#444')
       .text(`Date: ${date}`, { align: 'center' })
       .moveDown(1);

    // Signature
    doc.font('Helvetica-Bold').fontSize(15)
       .text('Authorized Signatory', doc.page.width - 220, doc.page.height - 150, { align: 'center' });
    doc.font('Helvetica-Bold').fontSize(15)
       .text('AllvaxConnect.com', doc.page.width - 220, doc.page.height - 100, { align: 'center' });

    doc.end();

    stream.on('finish', () => {
        
        fname= fileName;

    });
}
function formatDate2(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    let day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    return `${year}-${month}-${day}`;
}

app.get("/booth/statistics/:timeRange",(req,res)=>{
    const tr = req.params.timeRange;
    if(!tr){
        return res.status(401).json({ error: "parameter fail" });
    }
    if(!req.session.boothEmail){
        res.status(401).json({ error: "Not authenticated" });
    }
   
    let currentDate = new Date();

// Get date one week ago
let oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

// Get date one month ago
let oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

// Get date one year ago
let oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

oneWeekAgo =formatDate2(oneWeekAgo);
currentDate=formatDate2(currentDate);
oneMonthAgo=formatDate2(oneMonthAgo);
oneYearAgo=formatDate2(oneYearAgo);
let todate;
if(tr =='month'){
    todate =oneMonthAgo;
}
else if(tr=='week'){
    todate=oneWeekAgo;
}
else if(tr=='year'){
    todate=oneYearAgo;
} let labels=[];
let counts=[];
    const sql = "SELECT  `date`,`total_vax` FROM `booth_stats` WHERE boothName =? and date between ? and ?;";
    db.query(sql, [req.session.booth, todate, currentDate ], (err, result) => {
        if (err) {
            console.error("Error  fetching booth record :", err);
            return res.status(500).json({ error: "Failed tofetching booth record " });
        }
       
        const data =result.map(item =>({label :item.date.toISOString().split('T')[0] ,count: item.total_vax}));
        for(let i =0 ; i<result.length;i++){
       
        labels.push(data[i].label);
        counts.push(data[i].count);
    }
        return res.json({labels: labels, counts: counts});
    });

});

app.get("/filename/:recordId",(req,res)=>{
    const pdfname= req.params.recordId;
    const filePath = path.join('../certis',pdfname); // Replace with your PDF file path
  res.download(filePath,pdfname, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error occurred while downloading the file.');
    }
  });
});

app.get("/user/vaccine-suggestions",(req,res)=>{
    const currentDate = new Date();
const formatted = currentDate.toISOString().split('T')[0];

const resultdate = new Date(formatted);
resultdate.setDate(resultdate.getDate() + 2* 7);

const sql1 = "SELECT * FROM `vaccine_suggest` WHERE user_email=? and due_date BETWEEN ? AND ?";
    db.query(sql1, [ req.session.userEmail,formatted,resultdate ], (err, result) => {
        if(err){
            console.error("Error scheduling vaccination:", err);
            return res.status(500).json({error: "Failed to schedule vaccination"});
        }
        
        const suggested = result.map(item => ({id: item.id, vaccineName: item.vaccine_name,familyMember:item.family_member ,recommendedDate:item.due_date}));
        return res.json({data:suggested});
    });
});


app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

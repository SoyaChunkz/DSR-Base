require("dotenv").config();

const mongoose = require("mongoose");
const CombinedModel = require("./models/user.model");
const Department = require("./models/dsr.model");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer(); // For handling multipart/form-data



const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://dsr-three.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.ATLAS_DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

//Create Account 
app.post('/create-account', async (req, res) => {
  const { fullName, email, password, role, departments } = req.body;

  try {
    // Basic validation
    if (!fullName) {
      return res
        .status(400)
        .json({
          error: true,
          message: "Full Name is required"
        });
    }
    if (!email) {
      return res
        .status(400)
        .json({
          error: true,
          message: "Email is required"
        });
    }
    if (!password) {
      return res
        .status(400)
        .json({
          error: true,
          message: "Password is required"
        });
    }
    if (!role) {
      return res
        .status(400)
        .json({
          error: true,
          message: "Role is required"
        });
    }
    if (!departments) {
      return res
        .status(400)
        .json({
          error: true,
          message: "Department is required"
        });
    }

    // Check if the user already exists
    const isUser = await CombinedModel.findOne({ email });
    if (isUser) {
      return res.json({
        error: true,
        message: 'User already exists'
      });
    }

    // Create a new user based on the CombinedModel schema
    const newUser = new CombinedModel({
      fullName,
      email,
      password,
      role,
      departments
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT access token
    const accessToken = jwt.sign({ user: newUser }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '36000m'
    });

    // Respond with success message and user details
    return res.json({
      error: false,
      user: newUser,
      accessToken,
      message: 'Registration Successful'
    });
  } catch (error) {
    console.error('Error creating account:', error);
    return res.status(500).json({
      error: true,
      message: 'Internal Server Error'
    });
  }
});

//Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  const userInfo = await CombinedModel.findOne({
    email: email,
  });

  if (!userInfo) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = {
      user: userInfo,
    };

    // console.log("ACCESS_TOKEN_SECRET during token verification:", process.env.ACCESS_TOKEN_SECRET);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successfull",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

//Get user Info
app.get('/get-user', authenticateToken, async (req, res) => {
  try {
    const user = await CombinedModel.findById(req.user.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // console.log("user->"+user);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Get all Entries
app.get('/get-all-entries', authenticateToken, async (req, res) => {
  const { department, lab, section } = req.query;

  try {
    const departmentData = await Department.findOne({ deptName: department });
    if (!departmentData) return res.json({ entries: [] });

    const labData = departmentData.labs.find(labObj => labObj.labName === lab);
    if (!labData) return res.json({ entries: [] });

    const sectionData = labData.sections.find(sectionObj => sectionObj.sectionName === section);
    if (!sectionData) return res.json({ entries: [] });

    return res.json({ entries: sectionData.dsrEntries });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while fetching entries." });
  }
});

//Add a new DSR entry
app.post('/add-dsr-entry', authenticateToken, async (req, res) => {
  // console.log("inside");
  const { selectedDept, selectedLab, selectedSection, ...dsrData } = req.body;
  // console.log('Received request body:', req.body);

  try {
    const department = await Department.findOne({ deptName: selectedDept });
    if (!department) {
      console.error('Department not found');
      return res.status(404).json({ error: 'Department not found' });
    }

    const lab = department.labs.find(lab => lab.labName === selectedLab);
    if (!lab) {
      console.error('Lab not found');
      return res.status(404).json({ error: 'Lab not found' });
    }

    const section = lab.sections.find(section => section.sectionName === selectedSection);
    if (!section) {
      console.error('Section not found');
      return res.status(404).json({ error: 'Section not found' });
    }

    // console.log("found the dept, lab, sec")
    section.dsrEntries.push(dsrData);
    // console.log("added")
    await department.save();
    // console.log("saved")

    res.status(201).json({ message: 'DSR entry added successfully' });
  } catch (err) {
    console.error('Internal server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Update an existing DSR entry
app.put('/update-dsr-entry/:entryId', authenticateToken, async (req, res) => {
  // console.log("inside");
  const { entryId } = req.params;
  const { selectedDept, selectedLab, selectedSection, ...updatedData } = req.body;
  // console.log('Received request body:', req.body);

  try {
    // Find the department by deptName
    const department = await Department.findOne({ deptName: selectedDept });
    if (!department) {
      console.error('Department not found');
      return res.status(404).json({ error: 'Department not found' });
    }

    // Find the lab within the department
    const lab = department.labs.find(lab => lab.labName === selectedLab);
    if (!lab) {
      console.error('Lab not found');
      return res.status(404).json({ error: 'Lab not found' });
    }

    // Find the section within the lab
    const section = lab.sections.find(section => section.sectionName === selectedSection);
    if (!section) {
      console.error('Section not found');
      return res.status(404).json({ error: 'Section not found' });
    }

    // Find the entry within the section
    const entryIndex = section.dsrEntries.findIndex(entry => entry._id.toString() === entryId);
    if (entryIndex === -1) {
      console.error('DSR entry not found');
      return res.status(404).json({ error: 'DSR entry not found' });
    }

    // console.log("found the dept, lab, sec, entry");

    // Update the entry
    section.dsrEntries[entryIndex] = { ...section.dsrEntries[entryIndex]._doc, ...updatedData };
    // console.log("updated");

    // Save the department document
    await department.save();
    // console.log("saved");

    res.status(200).json({ message: 'DSR entry updated successfully' });
  } catch (err) {
    console.error('Internal server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Delete entry
app.delete('/delete-dsr-entry/:entryId', authenticateToken, async (req, res) => {
  // console.log("inside");
  const { entryId } = req.params;
  const { selectedDept, selectedLab, selectedSection } = req.query;
  // console.log(selectedDept, selectedLab, selectedSection, entryId);

  try {
    // Find the department by deptName
    const department = await Department.findOne({ deptName: selectedDept });
    if (!department) return res.status(404).json({ error: 'Department not found' });

    // Find the specific lab within the department
    const lab = department.labs.find(lab => lab.labName === selectedLab);
    if (!lab) return res.status(404).json({ error: 'Lab not found' });

    // Find the specific section within the lab
    const section = lab.sections.find(section => section.sectionName === selectedSection);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    // Find the DSR entry to delete
    const entryIndex = section.dsrEntries.findIndex(entry => entry._id.toString() === entryId);
    if (entryIndex === -1) return res.status(404).json({ error: 'DSR entry not found' });

    // console.log("found the dept, lab, sec, entry");

    // Remove the entry from the section
    section.dsrEntries.splice(entryIndex, 1);

    // console.log("deleted")

    // Save the updated department document
    await department.save();
    // console.log("saved")

    res.status(200).json({ message: 'DSR entry deleted successfully' });
  } catch (err) {
    console.error('Internal server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Mail Pdf
app.post('/send-email', upload.single('attachment'), async (req, res) => {
  const { email, body } = req.body;
  const pdfFile = req.file;
  // console.log("body" + email, body);

  // console.log(req.body)
  try {
    // Find the user to get email credentials and department details
    const user = await CombinedModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve HOD and Principal emails
    const hod = await CombinedModel.findOne({
      role: 'HOD',
      departments: { $elemMatch: { name: req.body.selectedDept } }
    });

    // console.log(req.body.selectedDept);

    // console.log("hod" + hod);
    if (!hod) {
      return res.status(404).json({ error: 'HOD not found' });
    }

    // Create Nodemailer transporter with the user's credentials
    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_TRANSPORTER_SERVICE, // Replace with your email service
      auth: {
        user: process.env.MAILER_AUTH_ID , // Your email
        pass: process.env.MAILER_AUTH_PASS , // Your email password or app password
      },
    });

    // Email options, sending to logged-in user, HOD, and Principal
    const mailOptions = {
      from: process.env.MAILER_FROM_ID,
      to: user.email, // Send to the logged-in user
      cc: `${hod.email}`, // CC HOD and Principal
      subject: 'DSR Report',
      text: body,
      attachments: [
        {
          filename: pdfFile.originalname,
          content: pdfFile.buffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }
      // console.log('Email sent:', info.response);
      res.status(200).send('Email sent');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

//Create Department
app.post('/create-department-structure', async (req, res) => {
  const departmentData = req.body;

  try {
    const newDepartment = new Department(departmentData);
    await newDepartment.save();
    res.status(201).json({ message: 'Department structure created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all departments
app.get('/get-all-departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
});

app.put('/edit-department/:department_id', async (req, res) => {
  const { department_id } = req.params;
  const updatedDepartmentData = req.body;

  try {
    const department = await Department.findByIdAndUpdate(
      department_id,
      updatedDepartmentData,
      { new: true } // Return the updated document
    );

    if (!department) {
      return res.status(404).json({
        error: true,
        message: 'Department not found',
      });
    }

    res.json({
      error: false,
      message: 'Department updated successfully',
      department,
    });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
});

app.delete('/delete-department/:department_id', async (req, res) => {
  const { department_id } = req.params;

  try {
    // Find the department by ID and delete it
    const deletedDepartment = await Department.findByIdAndDelete(department_id);

    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a lab from a department
app.delete('/delete-lab/:department_id/:lab_id', async (req, res) => {
  const { department_id, lab_id } = req.params;

  try {
    const department = await Department.findById(department_id);

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const labIndex = department.labs.findIndex(lab => lab._id.toString() === lab_id);
    if (labIndex === -1) {
      return res.status(404).json({ error: 'Lab not found' });
    }

    department.labs.splice(labIndex, 1); // Remove lab from the array
    await department.save();
    
    res.status(200).json({ message: 'Lab deleted successfully' });
  } catch (error) {
    console.error('Error deleting lab:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a section from a lab
app.delete('/delete-section/:department_id/:lab_id/:section_id', async (req, res) => {
  const { department_id, lab_id, section_id } = req.params;

  try {
    const department = await Department.findById(department_id);

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const lab = department.labs.id(lab_id);
    if (!lab) {
      return res.status(404).json({ error: 'Lab not found' });
    }

    const sectionIndex = lab.sections.findIndex(section => section._id.toString() === section_id);
    if (sectionIndex === -1) {
      return res.status(404).json({ error: 'Section not found' });
    }

    lab.sections.splice(sectionIndex, 1); // Remove section from the array
    await department.save();
    
    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all departments
app.get('/get-all-departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
});

app.put('/edit-department/:department_id', async (req, res) => {
  const { department_id } = req.params;
  const updatedDepartmentData = req.body;

  try {
    const department = await Department.findByIdAndUpdate(
      department_id,
      updatedDepartmentData,
      { new: true } // Return the updated document
    );

    if (!department) {
      return res.status(404).json({
        error: true,
        message: 'Department not found',
      });
    }

    res.json({
      error: false,
      message: 'Department updated successfully',
      department,
    });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
});

app.delete('/delete-department/:department_id', async (req, res) => {
  const { department_id } = req.params;

  try {
    // Find the department by ID and delete it
    const deletedDepartment = await Department.findByIdAndDelete(department_id);

    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a lab from a department
app.delete('/delete-lab/:department_id/:lab_id', async (req, res) => {
  const { department_id, lab_id } = req.params;

  try {
    const department = await Department.findById(department_id);

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const labIndex = department.labs.findIndex(lab => lab._id.toString() === lab_id);
    if (labIndex === -1) {
      return res.status(404).json({ error: 'Lab not found' });
    }

    department.labs.splice(labIndex, 1); // Remove lab from the array
    await department.save();
    
    res.status(200).json({ message: 'Lab deleted successfully' });
  } catch (error) {
    console.error('Error deleting lab:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a section from a lab
app.delete('/delete-section/:department_id/:lab_id/:section_id', async (req, res) => {
  const { department_id, lab_id, section_id } = req.params;

  try {
    const department = await Department.findById(department_id);

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const lab = department.labs.id(lab_id);
    if (!lab) {
      return res.status(404).json({ error: 'Lab not found' });
    }

    const sectionIndex = lab.sections.findIndex(section => section._id.toString() === section_id);
    if (sectionIndex === -1) {
      return res.status(404).json({ error: 'Section not found' });
    }

    lab.sections.splice(sectionIndex, 1); // Remove section from the array
    await department.save();
    
    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
app.get('/get-all-users', async (req, res) => {
  try {
    // console.log("2")
    const users = await CombinedModel.find();
    // console.log(users);
    res.json(users);
  } catch (error) { 
    res.status(500).send('Server Error');
  }
});

// Route to add a new user
app.post('/add-user', async (req, res) => {
  const { fullName, email, password, role, department, labs } = req.body;

  // console.log('1');
  // console.log(req.body);
  // console.log(labs);

  try {
    // Create the new user with the nested structure
    const newUser = new CombinedModel({
      fullName,
      email,
      password,
      role,
      departments: [
        {
          name: department,
          labs: labs.map(lab => ({
            name: lab.labName,
            sections: lab.sections.map(section => ({ name: section }))
          }))
        }
      ]
    });

    // console.log(newUser);

    // console.log(newUser.departments[0].labs[0]);

    await newUser.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_TRANSPORTER_SERVICE, // Replace with your email service
      auth: {
        user: process.env.MAILER_AUTH_ID, // Your email
        pass: process.env.MAILER_AUTH_PASS, // Your email password or app password
      },
    });

    // Construct email body including lab and section details
    let labsAndSections = '';
    newUser.departments.forEach(dept => {
      dept.labs.forEach(lab => {
        labsAndSections += `Lab: ${lab.name}\nSections: ${lab.sections.map(section => section.name).join(', ')}\n\n`;
      });
    });

    // Send email with new user details
    const mailOptions = {
      from: process.env.MAILER_FROM_ID, // Sender address
      to: newUser.email, // User's email
      subject: 'Welcome! Your New Account Has Been Created', // Subject line
      text: `Hello ${newUser.fullName},\n\nYour account has been successfully created.\n\nHere are your account details:\n\nFull Name: ${newUser.fullName}\nEmail: ${newUser.email}\nPassword: ${password}\nRole: ${newUser.role}\n${newUser.role !== 'Admin'
          ? `Department: ${newUser.departments.map(dept => dept.name).join(', ')}\n\nLabs and Sections:\n${labsAndSections}\n`
          : ''
        }To log in to the DSR system, please use the above credentials and link:\n\nLogin Link: https://dsr-final.vercel.app\n\nFor any queries, please contact the admin at systems.dsr@gmail.com.\n\nBest regards,\nVidyalankar Institute Of Technology.\n\nThis is an auto-generated email. Please do not reply to this email.`, // Plain text body
    };


    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
});

// Edit User
app.put('/edit-user/:id', async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, role, department, labs } = req.body;

  // console.log(req.body);
  // console.log(labs);

  try {
    // Create the updated data structure
    const updatedData = {
      fullName,
      email,
      password,
      role,
      departments: [
        {
          name: department,
          labs: labs.map(lab => ({
            name: lab.labName,
            sections: lab.sections.map(section => ({ name: section }))
          }))
        }
      ]
    };

    // console.log(updatedData);

    // Update the user in the database
    const updatedUser = await CombinedModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_TRANSPORTER_SERVICE, // Replace with your email service
      auth: {
        user: process.env.MAILER_AUTH_ID, // Your email
        pass: process.env.MAILER_AUTH_PASS, // Your email password or app password
      },
    });

    // Construct email body including lab and section details
    let labsAndSections = '';
    updatedUser.departments.forEach(dept => {
      dept.labs.forEach(lab => {
        labsAndSections += `Lab: ${lab.name}\nSections: ${lab.sections.map(section => section.name).join(', ')}\n\n`;
      });
    });

    // Send email with updated user details
    const mailOptions = {
      from: process.env.MAILER_FROM_ID, // Sender address
      to: updatedUser.email, // User's email
      subject: 'Your Details Have Been Updated', // Subject line
      text: `Hello ${updatedUser.fullName},\n\nYour account has been successfully updated.\n\nHere are your updated details:\n\nFull Name: ${updatedUser.fullName}\nEmail: ${updatedUser.email}\nPassword: ${password}\nRole: ${updatedUser.role}\n${updatedUser.role !== 'Admin'
          ? `Department: ${updatedUser.departments.map(dept => dept.name).join(', ')}\n\nLabs and Sections:\n${labsAndSections}\n`
          : ''
        }To log in to the DSR system, please use the above credentials and link:\n\nLogin Link: https://dsr-final.vercel.app\n\nFor any queries, please contact the admin at systems.dsr@gmail.com.\n\nBest regards,\nVidyalankar Institute Of Technology.\n\nThis is an auto-generated email. Please do not reply to this email.`, // Plain text body
    };


    // Send the email
    await transporter.sendMail(mailOptions);

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete a user
app.delete('/delete-user/:id', async (req, res) => {
  try {
    await CombinedModel.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get departments for selection
app.get('/get-departments', async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, function () {
  console.log('Server listening on port 5000!');
});

module.exports = app;

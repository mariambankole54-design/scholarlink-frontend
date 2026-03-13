import React, { useState } from 'react';
import axios from 'axios';

const StudentProfile = () => {
    const user = JSON.parse(localStorage.getItem('student')) || {};
    const token = localStorage.getItem("token");
    const [file, setFile] = useState(null);
    const [uploadMsg, setUploadMsg] = useState("");
    console.log(user);

        const [StudentData, setStudentData] = useState({
            firstName: '',
            lastName: '',
            email: user.email || '',
            country: '',
            mobile: '',
            gender: '',
            dob: '',
            studyLevel: '',
            courseType: '',
            courseChoice1: '',
            courseChoice2: '',
            courseChoice3: '',
            document: "",
            budget: '',
            
            targetCountries: []
        });
    
        const handleChange = (e) => {
            setStudentData({ ...StudentData, [e.target.name]: e.target.value });
        };
    
        console.log("change started")
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
              /*  const data = new FormData();
                Object.keys(FormData).forEach((key) => {
                    data.append(key, FormData[key]);
                }); */
                await axios.post(`http://localhost:5005/api/auth/updateprofile`, StudentData, {
                    headers: {
                        "x-auth-token": token
                    }
                });
                console.log("Profile updated");
            } catch (err) {
                console.log(err);
            }
        };

    
        const handleUploadDocs = async () => {
            if (!file) return setUploadMsg("Select a file first");
            console.log(file.type)
            const data = new FormData();
            data.append('document', file);
    
            console.log("to handle document")
    
            try {
                setUploadMsg("Uploading...");
                const response = await axios.post("http://localhost:5005/api/auth/upload-docs", data, {
                    headers: {
                        "x-auth-token": token,
                        //"Content-Type": "multipart/form-data"
                    }
                });
                console.log(response.data)
                setStudentData({...StudentData, document: response.data.url})
                setUploadMsg("Document Uploaded!");
            } catch (err) {
                setUploadMsg("Upload failed");
            }
        }; 

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // to send directly without formData
            await axios.post("http://localhost:5005/api/auth/updateprofile", Data, {
                headers: { "x-auth-token": token }
            });
            console.log("Profile text updated!");
        } catch (err) {
            console.error("Profile update failed");
        }
    }; */

    return (
        <div className="profile-form-container">
            <h2>Student Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">

                {/* Student basic information */}
                <div className="form-row">
                    <input name="firstName" placeholder="First Name" onChange={handleChange} required />
                    <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <input name="email" placeholder="Email Address" onChange={handleChange} required />
                    <input name="mobile" placeholder="Mobile No" onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <select name="gender" onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="date" name="dob" onChange={handleChange} required />
                </div>

                {/* Study Level */}
                <div className="form-group">
                    <label>Level of Studies</label>
                    <select name="studyLevel" onChange={handleChange} required>
                        <option value="">Select Level</option>
                        <option value="Undergraduate Diploma">Undergraduate Diploma</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="PhD">PhD</option>
                        <option value="Professional Training">Professional Training</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                {/* Course Type or rather the model they want sha */}
                <div className="form-group">
                    <label>Course Type</label>
                    <select name="courseType" onChange={handleChange} required>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Online">Online</option>
                    </select>
                </div>

                {/* Course Choices 1-3 */}
                <div className="form-group">
                    <label>Desired Courses (Top 3 Choices)</label>
                    <input name="courseChoice1" placeholder="Choice 1 (e.g. Computer Science)" onChange={handleChange} />
                    <input name="courseChoice2" placeholder="Choice 2" onChange={handleChange} />
                    <input name="courseChoice3" placeholder="Choice 3" onChange={handleChange} />
                </div>

                {/* I am adding the budget and country they want to study here */}
                <div className="form-row">
                    <input name="budget" placeholder="Your Budget (e.g. $10,000/year)" onChange={handleChange} />
                    <select name="country" onChange={handleChange}>
                        <option value="">Current Country</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Ivory Coast">Ivory Coast</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Algeria">Algeria</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Angola">Angola</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Gambia">Gambia</option>
                        {/*I will add more countries later*/}
                    </select>
                </div>

                <div className="form-group">
                    <label>Upload Academic Documents</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <button type="button" onClick={handleUploadDocs}>Upload Document</button>
                    <p>{uploadMsg}</p>
                </div>

                <button type="submit" className="save-btn">Save Profile</button>
            </form>
        </div>
    );
};

export default StudentProfile;
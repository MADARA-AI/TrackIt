import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Style/UserProfile.css';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  <button 
  className="back-button"
  onClick={() => navigate(-1)}
>
  <i className="fas fa-arrow-left"></i> Back to Course
</button>

  // Sample user data
  const [userData, setUserData] = useState({
    personalInfo: {
      name: "Name",
      email: "email@example.com",
      phone: "000000000",
      location: "Egypt",
      avatar: "/user-avatar.jpg",
      bio: "Bio."
    },
    enrolledCourses: [
      {
        id: 1,
        title: "Title Enrolled Courses",
        progress: 65,
        lastAccessed: "2025-04-1",
        instructor: "Instructor",
        certification: true
      },
      {
        id: 2,
        title: "Title Enrolled Courses",
        progress: 30,
        lastAccessed: "2025-04-1",
        instructor: " Instructor",
        certification: false
      }
    ],
    workExperience: [
      {
        id: 1,
        position: "position",
        company: "company",
        duration: "duration",
        responsibilities: [
          "responsibilities",
          "responsibilities",
        ]
      },
      {
        id: 2,
        position: "position",
        company: "company",
        duration: "duration",
        responsibilities: [
          "responsibilities",
          "responsibilities",
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: "Computer Science",
        institution: "AIU",
        year: "2026"
      }
    ],
    skills: [
      "skills ", "skills", "skills", 
    ],
    resume: {
      file: "/resume.pdf",
      lastUpdated: "2025-04-1"
    }
  });

  // Sample available courses for enrollment
  const availableCourses = [
    {
      id: 3,
      title: "title",
      instructor: "Instructor",
      duration: "0 hours"
    },
    {
      id: 4,
      title: "title",
      instructor: "Instructor",
      duration: "0 hours"
    }
  ];

  const handleInputChange = (section, field, value) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addNewExperience = () => {
    const newExperience = {
      id: Date.now(),
      position: "",
      company: "",
      duration: "",
      responsibilities: [""]
    };
    setUserData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience]
    }));
  };

  const updateExperience = (id, field, value) => {
    setUserData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const updateResponsibility = (expId, index, value) => {
    setUserData(prev => {
      const updatedExperience = prev.workExperience.map(exp => {
        if (exp.id === expId) {
          const updatedResponsibilities = [...exp.responsibilities];
          updatedResponsibilities[index] = value;
          return { ...exp, responsibilities: updatedResponsibilities };
        }
        return exp;
      });
      return { ...prev, workExperience: updatedExperience };
    });
  };

  const addResponsibility = (expId) => {
    setUserData(prev => {
      const updatedExperience = prev.workExperience.map(exp => {
        if (exp.id === expId) {
          return { ...exp, responsibilities: [...exp.responsibilities, ""] };
        }
        return exp;
      });
      return { ...prev, workExperience: updatedExperience };
    });
  };

  const enrollInCourse = (courseId) => {
    const courseToEnroll = availableCourses.find(course => course.id === courseId);
    if (courseToEnroll) {
      const newEnrolledCourse = {
        ...courseToEnroll,
        progress: 0,
        lastAccessed: new Date().toISOString().split('T')[0],
        certification: false
      };
      setUserData(prev => ({
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, newEnrolledCourse]
      }));
    }
  };

  return (
    <div className="user-profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="avatar-container">
          <img src={userData.personalInfo.avatar} alt="User Avatar" className="profile-avatar" />
          {editMode && (
            <button className="avatar-upload-button">
              <i className="fas fa-camera"></i> Change Photo
            </button>
          )}
        </div>
        
        <div className="profile-info">
          {editMode ? (
            <input
              type="text"
              value={userData.personalInfo.name}
              onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
              className="edit-input"
            />
          ) : (
            <h1>{userData.personalInfo.name}</h1>
          )}
          
          {editMode ? (
            <>
              <input
                type="text"
                value={userData.personalInfo.bio}
                onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
                className="edit-input bio-input"
              />
            </>
          ) : (
            <p className="profile-bio">{userData.personalInfo.bio}</p>
          )}
          
          <div className="profile-meta">
            {editMode ? (
              <div className="meta-grid">
                <div className="meta-item">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={userData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="edit-input"
                  />
                </div>
                <div className="meta-item">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={userData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className="edit-input"
                  />
                </div>
                <div className="meta-item">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={userData.personalInfo.location}
                    onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                    className="edit-input"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="meta-item">
                  <i className="fas fa-envelope"></i>
                  <span>{userData.personalInfo.email}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-phone"></i>
                  <span>{userData.personalInfo.phone}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{userData.personalInfo.location}</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="profile-actions">
          <button 
            className={`edit-profile-button ${editMode ? 'save-mode' : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Save Profile' : 'Edit Profile'}
          </button>
          <button className="download-resume-button">
            <i className="fas fa-download"></i> Download Resume
          </button>
        </div>
      </div>

      {/* Profile Navigation */}
      <nav className="profile-nav">
        <button 
          className={`nav-button ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <i className="fas fa-book-open"></i> My Courses
        </button>
        <button 
          className={`nav-button ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          <i className="fas fa-briefcase"></i> Experience
        </button>
        <button 
          className={`nav-button ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          <i className="fas fa-graduation-cap"></i> Education
        </button>
        <button 
          className={`nav-button ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <i className="fas fa-star"></i> Skills
        </button>
        <button 
          className={`nav-button ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => setActiveTab('resume')}
        >
          <i className="fas fa-file-alt"></i> Resume
        </button>
      </nav>

      {/* Profile Content */}
      <div className="profile-content">
        {activeTab === 'courses' && (
          <div className="courses-tab">
            <h2>My Courses</h2>
            
            <div className="enrolled-courses">
              {userData.enrolledCourses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-header">
                    <h3>{course.title}</h3>
                    <span className="instructor">by {course.instructor}</span>
                  </div>
                  
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{course.progress}% Complete</span>
                  </div>
                  
                  <div className="course-meta">
                    <div className="meta-item">
                      <i className="fas fa-calendar-alt"></i>
                      <span>Last accessed: {course.lastAccessed}</span>
                    </div>
                    {course.certification && (
                      <div className="meta-item">
                        <i className="fas fa-certificate"></i>
                        <span>Certification available</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="course-actions">
                    <button className="continue-button">
                      <i className="fas fa-play"></i> Continue
                    </button>
                    <button className="view-button">
                      <i className="fas fa-eye"></i> View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <h3>Available Courses</h3>
            <div className="available-courses">
              {availableCourses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-header">
                    <h3>{course.title}</h3>
                    <span className="instructor">by {course.instructor}</span>
                  </div>
                  
                  <div className="course-meta">
                    <div className="meta-item">
                      <i className="fas fa-clock"></i>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="enroll-button"
                    onClick={() => enrollInCourse(course.id)}
                  >
                    <i className="fas fa-plus"></i> Enroll Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="experience-tab">
            <h2>Work Experience</h2>
            
            {userData.workExperience.map(exp => (
              <div key={exp.id} className="experience-card">
                {editMode ? (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Position</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          className="edit-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="edit-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Duration</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                          className="edit-input"
                        />
                      </div>
                    </div>
                    
                    <div className="responsibilities">
                      <label>Responsibilities</label>
                      {exp.responsibilities.map((resp, index) => (
                        <div key={index} className="responsibility-item">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) => updateResponsibility(exp.id, index, e.target.value)}
                            className="edit-input"
                          />
                          {index === exp.responsibilities.length - 1 && (
                            <button 
                              className="add-responsibility"
                              onClick={() => addResponsibility(exp.id)}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="experience-header">
                      <h3>{exp.position}</h3>
                      <span className="company">{exp.company}</span>
                      <span className="duration">{exp.duration}</span>
                    </div>
                    
                    <ul className="responsibilities-list">
                      {exp.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
            
            {editMode && (
              <button 
                className="add-experience-button"
                onClick={addNewExperience}
              >
                <i className="fas fa-plus"></i> Add Experience
              </button>
            )}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="education-tab">
            <h2>Education</h2>
            
            {userData.education.map(edu => (
              <div key={edu.id} className="education-card">
                {editMode ? (
                  <div className="form-row">
                    <div className="form-group">
                      <label>Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
                        className="edit-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleInputChange('education', 'institution', e.target.value)}
                        className="edit-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Year</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => handleInputChange('education', 'year', e.target.value)}
                        className="edit-input"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>{edu.degree}</h3>
                    <div className="education-meta">
                      <span className="institution">{edu.institution}</span>
                      <span className="year">{edu.year}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {editMode && (
              <button className="add-education-button">
                <i className="fas fa-plus"></i> Add Education
              </button>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="skills-tab">
            <h2>Skills</h2>
            
            {editMode ? (
              <div className="skills-edit">
                <div className="skills-input-container">
                  {userData.skills.map((skill, index) => (
                    <div key={index} className="skill-tag">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...userData.skills];
                          newSkills[index] = e.target.value;
                          setUserData(prev => ({ ...prev, skills: newSkills }));
                        }}
                        className="edit-input"
                      />
                      <button 
                        className="remove-skill"
                        onClick={() => {
                          const newSkills = userData.skills.filter((_, i) => i !== index);
                          setUserData(prev => ({ ...prev, skills: newSkills }));
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  className="add-skill-button"
                  onClick={() => {
                    setUserData(prev => ({ ...prev, skills: [...prev.skills, ""] }));
                  }}
                >
                  <i className="fas fa-plus"></i> Add Skill
                </button>
              </div>
            ) : (
              <div className="skills-list">
                {userData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="resume-tab">
            <h2>My Resume</h2>
            
            <div className="resume-container">
              <div className="resume-preview">
                <i className="fas fa-file-pdf"></i>
                <span>Resume_{userData.personalInfo.name.replace(/\s+/g, '_')}.pdf</span>
                <span className="last-updated">Last updated: {userData.resume.lastUpdated}</span>
              </div>
              
              <div className="resume-actions">
                <button className="upload-button">
                  <i className="fas fa-upload"></i> Upload New Resume
                </button>
                <button className="download-button">
                  <i className="fas fa-download"></i> Download Resume
                </button>
              </div>
              
              <div className="resume-builder">
                <h3>Resume Builder</h3>
                <p>Customize your resume with the information from your profile</p>
                
                <div className="builder-options">
                  <div className="option">
                    <input type="checkbox" id="include-experience" defaultChecked />
                    <label htmlFor="include-experience">Include Work Experience</label>
                  </div>
                  <div className="option">
                    <input type="checkbox" id="include-education" defaultChecked />
                    <label htmlFor="include-education">Include Education</label>
                  </div>
                  <div className="option">
                    <input type="checkbox" id="include-skills" defaultChecked />
                    <label htmlFor="include-skills">Include Skills</label>
                  </div>
                  <div className="option">
                    <input type="checkbox" id="include-courses" defaultChecked />
                    <label htmlFor="include-courses">Include Enrolled Courses</label>
                  </div>
                </div>
                
                <div className="template-selection">
                  <h4>Select Template:</h4>
                  <div className="templates">
                    <div className="template-option active">
                      <div className="template-preview template-1"></div>
                      <span>Professional</span>
                    </div>
                    <div className="template-option">
                      <div className="template-preview template-2"></div>
                      <span>Modern</span>
                    </div>
                    <div className="template-option">
                      <div className="template-preview template-3"></div>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>
                
                <button className="generate-resume-button">
                  <i className="fas fa-magic"></i> Generate Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
        
    );
};
    
    export default UserProfile;
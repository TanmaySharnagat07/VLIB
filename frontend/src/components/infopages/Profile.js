import React, { useState } from "react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="container emp-profile">
        <style>
          {`
                    body {
                        background: -webkit-linear-gradient(left, #3931af, #00c6ff);
                    }
                    .emp-profile {
                        padding: 3%;
                        margin-top: 3%;
                        margin-bottom: 3%;
                        border-radius: 0.5rem;
                        background: #fff;
                    }
                    .profile-img {
                        text-align: center;
                    }
                    .profile-img img {
                        width: 70%;
                        height: 100%;
                    }
                    .profile-head h5 {
                        color: #333;
                    }
                    .profile-head h6 {
                        color: #0062cc;
                    }
                    .proile-rating {
                        font-size: 12px;
                        color: #818182;
                        margin-top: 5%;
                    }
                    .proile-rating span {
                        color: #495057;
                        font-size: 15px;
                        font-weight: 600;
                    }
                    .profile-head .nav-tabs {
                        margin-bottom: 5%;
                    }
                    .profile-head .nav-tabs .nav-link {
                        font-weight: 600;
                        border: none;
                    }
                    .profile-head .nav-tabs .nav-link.active {
                        border: none;
                        border-bottom: 2px solid #0062cc;
                    }
                    .profile-work {
                        padding: 14%;
                        margin-top: -15%;
                    }
                    .profile-work p {
                        font-size: 12px;
                        color: #818182;
                        font-weight: 600;
                        margin-top: 10%;
                    }
                    .profile-work a {
                        text-decoration: none;
                        color: #495057;
                        font-weight: 600;
                        font-size: 14px;
                    }
                    .profile-tab label {
                        font-weight: 600;
                    }
                    .profile-tab p {
                        font-weight: 600;
                        color: #0062cc;
                    }
                `}
        </style>
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                  alt="Profile"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>Kshiti Ghelani</h5>
                <h6>Web Developer and Designer</h6>
                <p className="proile-rating">
                  RANKINGS : <span>8/10</span>
                </p>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "about" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("about")}
                    >
                      About
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "timeline" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("timeline")}
                    >
                      Timeline
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="#">Website Link</a>
                <br />
                <a href="#">Bootsnipp Profile</a>
                <br />
                <a href="#">Bootply Profile</a>
                <br />
                <p>SKILLS</p>
                <a href="#">Web Designer</a>
                <br />
                <a href="#">Web Developer</a>
                <br />
                <a href="#">WordPress</a>
                <br />
                <a href="#">WooCommerce</a>
                <br />
                <a href="#">PHP, .Net</a>
                <br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab">
                {activeTab === "about" && (
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>User Id</label>
                      </div>
                      <div className="col-md-6">
                        <p>Kshiti123</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>Kshiti Ghelani</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>kshitighelani@gmail.com</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>123 456 7890</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6">
                        <p>Web Developer and Designer</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "timeline" && (
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Experience</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Hourly Rate</label>
                      </div>
                      <div className="col-md-6">
                        <p>10$/hr</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      <div className="col-md-6">
                        <p>230</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>English Level</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Availability</label>
                      </div>
                      <div className="col-md-6">
                        <p>6 months</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Your Bio</label>
                        <br />
                        <p>Your detail description</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;

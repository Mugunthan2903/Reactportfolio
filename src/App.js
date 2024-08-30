import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Typed from 'typed.js';
import ScrollReveal from 'scrollreveal';
import { db } from './Firebase';
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [errors, setErrors] = useState({
    Fullname: false,
    Email: false,
    Emailval: false,
    Mobile: false,
    ValidMobile: false,
    Work: false,
    ValEmpty: false
  });



  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleReadMore1 = () => {
    setIsExpanded1(!isExpanded1);
  };
  const toggleReadMore2 = () => {
    setIsExpanded2(!isExpanded2);
  };


  useEffect(() => {

    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    };

    /*============= scroll section active link ================*/
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
      sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
          navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
          });
        };
      });
      /*============= sticky navbar ================*/
      let header = document.querySelector('header');

      header.classList.toggle('sticky', window.scrollY > 100);

      /*============= remove toggle icon and navbar when click navbar icon ================*/
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    };


    /*============= scroll reveal ================*/
    ScrollReveal({
      // reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

    // /*============= typed js ================*/

    const typed = new Typed('.multiple-text', {
      strings: ['Frontend Developer', 'Backend developer', 'Mobile Application', 'E-commerce Website'],
      typeSpeed: 100,
      backSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, [])

  const datasaved = () => {

    let isValid = true;

    var Fullname = document.getElementById("Fullname").value;
    var Email = document.getElementById("Email").value;
    var Mobile = document.getElementById("Mobile").value;
    var Work = document.getElementById("Work").value;
    // var ValidMobile= document.getElementById("ValidMobile").value;

    let errors = {
      Fullname: false,
      Email: false,
      Mobile: false,
      Work: false,
      Emailval: false,
      ValEmpty: false,
      ValidMobile: false
    };

    if (!Fullname) {
      errors.Fullname = true
      errors.ValEmpty = true
      isValid = false;
    }
    if (!Work) {
      errors.Work = true
      errors.ValEmpty = true
      isValid = false;
    }

    if (!Email) {
      errors.Email = true
      errors.ValEmpty = true
      isValid = false;
    }
    else if (Email && Email.trim().length > 0 && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email) == false)) {
      errors.ValEmpty = true;
      isValid = false;
      errors.Emailval = true;
    }

    if (!Mobile) {
      errors.Mobile = true
      errors.ValEmpty = true
      isValid = false;
    }
    else if (Mobile && Mobile.trim().length > 0) {
      var phone = Mobile
      var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (phone.match(phoneNum)) {
        errors.ValidMobile = false
        errors.ValEmpty = false
        isValid = true;
      } else {
        errors.ValidMobile = true
        errors.ValEmpty = true
        isValid = false;

      }

    }

    if (isValid) {
      errors.ValEmpty = false
      setErrors({ ...errors });
      handleAddUser();

    } else {
      setErrors({ ...errors });

    }
  }

  const Closedata = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.getElementById("Fullname").value= "";
    document.getElementById("Email").value= "";
    document.getElementById("Mobile").value= "";
    document.getElementById("Work").value= "";
    document.getElementById("TextArea").value= "";
  }

  const handleAddUser = async () => {
    let UserName = document.getElementById("Fullname").value;
    let user = {}
    user.Fullname = document.getElementById("Fullname").value;
    user.Email = document.getElementById("Email").value;
    user.Mobile = document.getElementById("Mobile").value;
    user.Work = document.getElementById("Work").value;
    user.TextArea = document.getElementById("TextArea").value;

    try {

      // Adds a new document with a generated ID
      const docRef = await addDoc(collection(db, UserName), {
        Reactportfolio: user,
      });
      // await addDoc(collection(db, "Portfolio"), {
      //   text: JSON.stringify(user),
      //   timestamp: new Date(),
      //   uid: user.Email,
      //   displayName: user.Fullname,
      // });
      console.log("Document written with ID: ", "");
      var modal = document.getElementById("myModal");
      modal.style.display = "block";

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <div classname="App">
        <header className="header">
          <a href="#" className="logo">Portfolio</a>
          <i className="bx bx-menu" id="menu-icon" />
          <nav className="navbar">
            <a href="#home" className="active">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#Experience">Experience </a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className="home" id="home">
          <div className="home-content">
            <h3>Hello, It's Me</h3>
            <h1>Mugunthan M</h1>
            <h3>And I'm a <span className="multiple-text" /></h3>
            <p>I am a passionate front-end and back-end developer, blending creativity with coding to craft seamless user experiences.
              From responsive websites to robust server-side applications, I thrive on turning ideas into reality and delivering impactful solutions.
              Let's build extraordinary digital experiences together!</p>
            <div className="social-media">
              <a href="https://www.facebook.com/profile.php?id=100007432395887&mibextid=ZbWKwL/"><i className="bx bxl-facebook" /></a>
              <a href="#"><i className="bx bxl-twitter" /></a>
              <a href="https://www.instagram.com/mugunthan_str?igsh=MWl6a3Nxc3JjNjkweQ=="><i className="bx bxl-instagram" /></a>
              <a href="https://www.linkedin.com/in/mugunthan-m-93928b174/"><i className="bx bxl-linkedin" /></a>
              <a href="https://github.com/Mugunthan2903/"><i className="bx bxl-github" /></a>

            </div>
            <a href="images/Mugunthan_Resume.pdf" download="Mugunthan_Resume.pdf" className="btn">Download CV</a>
          </div>
          <div className="home-img">
            <img src="images/profile-pic 3.webp" style={{ height: "320px", borderRadius: "180px" }} />
          </div>
        </section>
        {/*about section design*/}
        <section className="about" id="about">
          <div className="about-img" >
            <img src="images/profile-pic 3.webp" style={{ height: "440px", borderRadius: "250px" }} />
          </div>
          <div className="about-content">
            <h2 className="heading">About <span>Me</span></h2>
            <h3>Junior Fullstack Developer!</h3>
            <p style={{ margin: "1rem 0 1rem" }}> I am Full stack developer from Bangalore, India with 3 years of experience. Proficient in
              creating Web applications/ Mobile applications / data APIs.
              <p style={{ margin: "1rem 0 1rem" }}>Database : Mysql | Sql Server </p>
              <p style={{ margin: "1rem 0 1rem" }}>Backend : C# | Asp.Net core| Asp.Net Web Api | Rest Api </p>
              <p style={{ margin: "1rem 0 1rem" }}>Frontend : React .js | Redux | React Native | Html | Css | javascript | Ajax  </p> </p>
            <a href="#" className="btn">Read More</a>
          </div>
        </section>
        {/*services section design*/}
        <section className="services" id="services">
          <h2 className="heading"> Our <span>Services</span></h2>
          <div className="services-container">
            <div className="services-box">
              <i className="bx bx-code-alt" />
              <h3>Web Develoment </h3>

              {isExpanded && <p>In the ever-evolving digital landscape, a
                compelling online presence is vital for
                businesses and individuals alike. As a skilled web developer,
                I am committed to crafting innovative and user-friendly
                websites that captivate visitors and drive results.
                Whether it's a sleek and responsive corporate website or a
                dynamic e-commerce platform, my expertise in HTML, CSS,
                JavaScript, and other cutting-edge technologies allows me t
                o create custom solutions tailored to your specific needs.
                From concept to launch,
                I ensure a seamless and optimized user experience,
                leveraging the latest industry trends and best practices
                to deliver a strong online foundation for your brand.
                Provides Product Design & Development, Debugging, Testing ,Production to Release solutions.</p>}

              {!isExpanded && <p>In the ever-evolving digital landscape, a
                compelling online presence is vital for
                businesses and individuals alike. As a skilled web developer,
                I am committed to crafting innovative and user-friendly
                websites that captivate visitors and drive results.
                Whether it's a sleek and responsive corporate website or a
                dynamic e-commerce platform, my expertise in HTML, CSS,
                JavaScript, and other cutting-edge technologies allows me t
                o create custom solutions tailored to your specific needs.
              </p>}

              {!isExpanded ? (
                <a className="btn" onClick={toggleReadMore}>Read More</a>
              ) : (
                (
                  <a className="btn" onClick={toggleReadMore}>Show Less</a>
                )
              )}


            </div>
            <div className="services-box">
              <i className="bx bx-globe" />
              <h3>Backend & Database Services </h3>
              {isExpanded1 && <p>
                Developed robust backend services using ASP.NET Core to efficiently retrieve and
                process data from external web APIs. Implemented comprehensive data retrieval logic,
                ensuring secure and optimized API calls.
                Developed robust backend services using ASP.NET Core to efficiently retrieve and
                process data from external web APIs. Implemented comprehensive data retrieval logic,
                ensuring secure and optimized API calls.Designed and implemented a structured data storage
                solution by integrating the backend with a SQL Server database.
                Utilized Entity Framework Core for seamless data modeling,
                migration, and CRUD operations.Created and optimized SQL queries
                to store and manipulate data efficiently, enhancing data retrieval performance
                and ensuring data integrity and consistency across multiple systems.
              </p>}
              {!isExpanded1 && <p>
                Developed robust backend services using ASP.NET Core to efficiently retrieve and
                process data from external web APIs. Implemented comprehensive data retrieval logic,
                ensuring secure and optimized API calls.Designed and implemented a structured data storage
                solution by integrating the backend with a SQL Server database.
                Utilized Entity Framework Core for
                seamless data modeling,
                migration, and CRUD operations.
                <br />

              </p>}

              {!isExpanded1 ? (
                <a className="btn" onClick={toggleReadMore1}>Read More</a>
              ) : (
                (
                  <a className="btn" onClick={toggleReadMore1}>Show Less</a>
                )
              )}
            </div>
            <div className="services-box">
              <i className="bx bx-data" />
              <h3>APIs and Dashboard </h3>
              {isExpanded2 && <p>
                Designed and developed scalable RESTful APIs using ASP.NET Core to deliver
                JSON-formatted data tailored for dashboarding and front-end applications.
                Ensured APIs were robust, secure, and optimized for high performance. Engineered custom data APIs to
                aggregate and format data from multiple sources, enabling seamless
                integration with various front-end frameworks such as React to ensure maintainability and
                scalability for future enhancements..
                Implemented advanced data serialization and deserialization techniques to
                efficiently handle complex data structures,
                providing a consistent and structured data flow for client-side consumption.
                Collaborated closely with front-end developers and UI/UX designers to ensure that APIs met
                functional requirements and supported a dynamic, user-friendly experience.

              </p>}
              {!isExpanded2 && <p>
                Designed and developed scalable RESTful APIs using ASP.NET Core to deliver
                JSON-formatted data tailored for dashboarding and front-end applications.
                Ensured APIs were robust, secure, and optimized for high performance. Engineered custom data APIs to
                aggregate and format data from multiple sources, enabling seamless
                integration with various front-end frameworks such as React to ensure maintainability
                and scalability for future enhancements..

              </p>}
              {!isExpanded2 ? (
                <a className="btn" onClick={toggleReadMore2}>Read More</a>
              ) : (
                (
                  <a className="btn" onClick={toggleReadMore2}>Show Less</a>
                )
              )}
            </div>
          </div>
        </section>



        {/*portfolio section design*/}
        <section className="portfolio" style={{ minHeight: "115vh" }} id="Experience">

          <h2 className="heading">Experience & <span>Education</span></h2>

          <div style={{ width: "50%", float: "left" }}>
            <h3 style={{ fontSize: "20px", color: "gray" }}>1. March 2022 - Present | 2.10 years</h3>
            <h1 style={{ fontSize: "15px", color: "cadetblue" }}> Full stack at Webstorm Information Technology</h1>

            <h2 style={{ fontSize: "20px", color: "goldenrod", marginBottom: "0rem", marginTop: "1rem" }}>Mobile App Development with React Native:</h2>
            <p style={{ fontSize: "15px", color: "white" }}>Developed a cross-platform mobile app integrating secure payment options, including
              a POS payment system in Android Studio. Created a
              mobile app for Heathrow Express train ticket ordering and Oyster card And London pass tickets.</p>
            <h2 style={{ fontSize: "20px", color: "goldenrod", marginBottom: "0rem", marginTop: "1rem" }}>API Integration :</h2>
            <p style={{ fontSize: "15px", color: "white" }}>Integrated over 10 third-party services
              (Big Bus, LondonTheatre, Golden Tours, Musement ,Tootbus and Core E-sim Apis) using C# Asp.net core Web API and data analytics from Sql database ,
              enhancing functionality and user experiences.</p>
            <h2 style={{ fontSize: "20px", color: "goldenrod", marginBottom: "0rem", marginTop: "1rem" }}>E-Commerce Web Application:</h2>
            <p style={{ fontSize: "15px", color: "white" }}>Built a London shopping app in React.js,
              focusing on user-friendly design and scalability. I played a key role in developing
              a comprehensive eCommerce web application tailored for the London market,
              implemented in React.js. The project involved creating a highly responsive and
              intuitive user interface that catered to both desktop and web application users.</p>
            <h2 style={{ fontSize: "20px", color: "goldenrod", marginBottom: "0rem", marginTop: "1rem" }}>React Websites for Services:</h2>
            <p style={{ fontSize: "15px", color: "white" }}>Developed React websites for car transfers,
              Uber, hotel bookings, theatre bookings, Tours , Activities ,Bus tickets and
              London pass using third-party APIs for seamless integration.
              I have extensive experience in enterprise-level application development,
              covering the full cycle of code development, optimization, and bug fixing.</p>


            <h3 style={{ fontSize: "20px", color: "gray", marginTop: "2rem" }}>2. Nov 2021 - Mar 2022| 5 Months</h3>
            <h1 style={{ fontSize: "15px", color: "cadetblue", marginBottom: "1rem", }}>Software Engineer Trainee at Webstorm Information Technology</h1>
            <p style={{ fontSize: "15px", color: "white" }}>Developed a dynamic customer information dashboard
              using React Hooks, effectively consuming REST APIs to deliver realtime data and insights,
              enhancing user experience and decision making capabilities.</p>
          </div>


          <div style={{ width: "40%", float: "right" }}>
            <h3 style={{ fontSize: "20px", color: "gray" }}>1. 2016-2020</h3>
            <h1 style={{ fontSize: "15px", color: "cadetblue" }}> Bachelor of Engineering</h1>
            <h2 style={{ fontSize: "20px", color: "white", marginBottom: "0rem", marginTop: "1rem" }}>Anna University College of Engineering,<br /> Dindigul (6.70)</h2>

            <h3 style={{ fontSize: "20px", color: "gray", marginTop: "2rem" }}>2. 2014-2016</h3>
            <h1 style={{ fontSize: "15px", color: "cadetblue" }}>Higher Secondary Education</h1>
            <h2 style={{ fontSize: "20px", color: "white", marginBottom: "0rem", marginTop: "1rem" }}>Bmhss, Salem, Tamil Nadu (84.75)</h2>

            <h3 style={{ fontSize: "20px", color: "gray", marginTop: "2rem" }}>3. 2013-2014</h3>
            <h1 style={{ fontSize: "15px", color: "cadetblue" }}> Secondary Education</h1>
            <h2 style={{ fontSize: "20px", color: "white", marginBottom: "0rem", marginTop: "1rem" }}>Bmhss, Salem, Tamil Nadu (88.20)</h2>


          </div>
        </section>


        <section className="portfolio" id="Experience">
          <h2 className="heading">latest <span>Project</span></h2>
          <div className="portfolio-container">


            <div className="portfolio-box">
              <img src="images/Frontend.jpg" style={{ height: "200px" }} />
              <div className="portfolio-layer">
                <h4>Web development</h4>
                <p>Build a Complete Responsive Personal Portfolio Website using HTML CSS and Javascript</p>
                <a href="#"><i className="bx bx-link-external" /></a>
              </div>
            </div>
            <div className="portfolio-box">
              <img src="images/backend.jpeg" style={{ height: "200px" }} />
              <div className="portfolio-layer">
                <h4>Backend</h4>
                <p>Build a Complete data using C# ,Asp.Net Core and Web Api</p>
                <a href="#"><i className="bx bx-link-external" /></a>
              </div>
            </div>
            <div className="portfolio-box">
              <img src="images/database.jpeg" style={{ height: "200px" }} />
              <div className="portfolio-layer">
                <h4>Database</h4>
                <p>Build a  Complete data using SQL</p>
                <a href="#"><i className="bx bx-link-external" /></a>
              </div>
            </div>


          </div>
          <div style={{ fontSize: "15px", marginTop: "5rem", color: "aliceblue" }}>
            <p>* Familiarity with code versioning tools such as GitHub</p>
            <p>* Experience with browser-based debugging and performance testing software.</p>
            <p>* Proficiency in JavaScript, including DOM manipulation and the JavaScript object model.</p>
            <p>* Through understanding of React.js workflows (such as Redux) and its core principles.</p>
            <p>* Knowledge of modern authorization mechanisms, such as JSON Web Token.</p>
            <p>* Experience with RESTFul APIs, testing using Postman.</p>
            <p>* Excellent problem-solving skills and ability.</p>
            <p>* Implement clean, smooth animations to provide an excellent user interface.</p>
            <p>* Proven ability to write clean, efficient, and maintainable code.</p>
            <p>* Create front-end modules with maximum code reusability and efficiency.</p>
            <p>* Capable of estimating effort, providing technical solutions, and managing risks.</p>
            <p>* Strong proficiency in English with excellent communication and teamwork skills.</p>
          </div>
        </section>






        {/*contact section design*/}
        <section className="contact" id="contact">
          <h2 className="heading">Contact <span>Me!</span></h2>
          <form>
            <div className="input-box">
              <input autoComplete='off' id="Fullname" type="text" placeholder="Full Name" />
              <input autoComplete='off' id="Email" type="email" placeholder="Email Address" />
            </div>
            <div className="input-box">
              <input autoComplete='off' id="Mobile" type="number" placeholder="Mobile Number" />
              <input autoComplete='off' id="Work" type="text" placeholder="Designation" />
            </div>
            <textarea autoComplete='off' name id="TextArea" cols={30} rows={10} placeholder="Your Message" defaultValue={""} />
            {/* <input type="submit" defaultValue="Send Message" className="btn" onClick={datasaved()} /> */}

            {errors.ValEmpty && <div className="ErrMsgs">
              <div className="Error">
                <div className="ErrMsgsRf">
                  <div><img src="images/update-error.svg" style={{ width: 30, marginLeft: 20 }} /></div>
                  <div style={{ marginLeft: 5, color: "red", fontSize: 20 }}>Error :</div>
                  <div style={{ textAlign: 'justify', color: "white", fontSize: 15, fontWeight: "bold", marginTop: 3, marginLeft: 10 }} >
                    {errors.Fullname && <div>Enter Your Fullname</div>}
                    {errors.Email && <div >Enter Your Email</div>}
                    {errors.Emailval && <div >Enter Your Valid Email</div>}
                    {errors.Work && <div >Enter Your Designation</div>}
                    {errors.Mobile && <div>Enter Your Mobile Number</div>}
                    {errors.ValidMobile && <div>Enter Your Valid  Mobile Number</div>}

                  </div>
                </div>
              </div>
            </div>}

            <a className="btn" onClick={datasaved}>Submit</a>



          </form>
        </section>

        <footer className="footer">
          <div className="footer-text">
            <p>Copyright © 2024 by  Mugunthan M  <br /> All Rights Reserved.</p>
            <div className="social-media">
              <a href="https://www.facebook.com/profile.php?id=100007432395887&mibextid=ZbWKwL/"><i className="bx bxl-facebook" /></a>
              <a href="#"><i className="bx bxl-twitter" /></a>
              <a href="https://www.instagram.com/mugunthan_str?igsh=MWl6a3Nxc3JjNjkweQ=="><i className="bx bxl-instagram" /></a>
              <a href="https://www.linkedin.com/in/mugunthan-m-93928b174/"><i className="bx bxl-linkedin" /></a>
              <a href="https://github.com/Mugunthan2903/"><i className="bx bxl-github" /></a>

            </div>
          </div>
          <div className="footer-text">
            <p>Address: <br /> 6/4 , Kurumbar Street,
              <br />Kondayampalli , Salem <br />
              TamilNadu - 636110<br />
              e-mail : mugunthanr77@gmail.com<br />
              ⓟ +91-7402004830.</p>
          </div>
          <div className="footer-iconTop">
            <a href="#home"><i className="bx bx-up-arrow-alt" /></a>
          </div>
        </footer>


      </div>

      <div id="myModal" className="modal">
        <div className="modal-content">
          <div><img src="images/download.jpeg" style={{ width: 30, marginLeft: 10, marginTop: 15 }} />
          </div>

          <h2 style={{ color: "black", fontSize: 20, fontWeight: "bold", marginTop: -30, marginLeft: 50 }}>Your information has been successfully saved.</h2>
          <h1 style={{ color: "cadetblue", fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 50 }}>We'll get in touch with you shortly.</h1>
          <h1 style={{ color: "black", fontSize: 15, marginTop: 20, marginLeft: 50 }}> I appreciate your submission.</h1>
          <a className="btn" style={{ marginLeft: 40, marginTop: 20, cursor: "pointer" }} onClick={Closedata}>Close</a>
        </div>
      </div>


    </>
  );
}

export default App;

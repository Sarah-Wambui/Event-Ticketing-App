import React from 'react'


function Footer() {

  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We are your premier event management platform, providing a seamless
            experience for planning and attending events.
          </p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@example.com</p>
          <p>Phone: +254-456-7890</p>
          <p>Address: 123 Some Street, Nairobi</p> {/* Additional content */}
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Stay connected with us on social media:</p>
          <div className="social-icons">
            <a href="/#">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="/#">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/#">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="/#">
              <i className="fa fa-linkedin"></i> 
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>&copy; 2023 EventGo. All rights reserved.</p>
        </div>
        <div className="footer-bottom-right">
          <p>Privacy Policy | Terms of Use</p> 
        </div>
      </div>
    </footer>
  );
}
export default Footer
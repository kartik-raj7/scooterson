// Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import the icons
import styles from '../../styles/homepage.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.socialIcons}>
        {/* Use react-icons components for social icons */}
        <a href="https://your-facebook-profile-url" target="_blank" rel="noopener noreferrer">
          <FaFacebook className={styles.socialIcon} style={{color:'#61638a'}}/>
        </a>
        <a href="https://your-twitter-profile-url" target="_blank" rel="noopener noreferrer">
          <FaTwitter className={styles.socialIcon} style={{color:'#61638a'}}/>
        </a>
        <a href="https://your-instagram-profile-url" target="_blank" rel="noopener noreferrer">
          <FaInstagram className={styles.socialIcon} style={{color:'#61638a'}}/>
        </a>
        {/* Add more social icons as needed */}
      </div>
    </div>
  );
};

export default Footer;

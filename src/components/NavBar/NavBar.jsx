import React, { useContext, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Logo from '../../assets/images/logo.png';
import { IoIosSearch } from "react-icons/io";
import styles from './NavBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { VideoContext } from '../../contexts/VideoContext';
import avatar from '../../assets/images/avatar.png';

const NavBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const { handleSearch } = useContext(VideoContext);
  const navigate = useNavigate();

  // debounce the handleSearch function to limit the number of calls
  const debouncedHandleSearch = useCallback(
    debounce((keyword) => handleSearch(keyword), 300),
    [handleSearch]
  );

  // handle changes to the search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedHandleSearch(value);
  };

  // handle clicking on the profile icon to navigate to the profile page
  const handleProfileClick = () => {
    navigate('/profile'); // redirect to profile page
  };

  // handle clicking on the logo to reset search input and navigate to home page
  const handleLogoClick = () => {
    setSearchInput(''); // clear search input
    handleSearch(''); // reset video list
    navigate('/'); // redirect to home page
  };

  return (
    <div className={styles.topnav}>
      <div className={styles.leftnav}>
        {/* link to home page when clicking on the logo */}
        <div onClick={handleLogoClick}>
          <img className={styles.navLogo} src={Logo} alt='logo' />
        </div>
        <div className={styles.searchContainer}>
          <IoIosSearch className={styles.searchIcon} />
          <input
            className={styles.searchBar}
            type="text"
            placeholder="Search.."
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className={styles.rightNav}>
        <div className={styles.profileContainer} onClick={handleProfileClick} title="View your uploaded videos">
          <img
            src={avatar}
            className={styles.profileIcon}
            alt="profile"
          />
        </div>
        <Link to='/create' className={styles.createLink}>Create Your Video</Link>
      </div>
    </div>
  );
};

export default NavBar;

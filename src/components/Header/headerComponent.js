import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { setSearchTerm } from "../../app/redditSlice";
import Subreddits from "../Subreddits/Subreddits";

import './header.css'


const Header = () => {
    const asideRef = useRef(null);
    const buttonRef = useRef(null)
    const [searchTermLocal, setSearchTermLocal] = useState('');
    const searchTerm = useSelector((state) => state.reddit.searchTerm);
    const dispatch = useDispatch();

    const onChangeLocal = (e) => {
        setSearchTermLocal(e.target.value);
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal))
    }

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);



    const [isAsideVisible, setIsAsideVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 768); // Adjust breakpoint as needed
      };
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleAside = () => {
      setIsAsideVisible(!isAsideVisible);
    };


    useEffect(() => {
        // ... other code
    
        const handleClickOutside = (event) => {
          if (isAsideVisible && !asideRef.current.contains(event.target) && isAsideVisible && !buttonRef.current.contains(event.target)) {
            setIsAsideVisible(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => document.removeEventListener('click', handleClickOutside);
      }, [isAsideVisible]);


    return (
        <header className="container">

            <div className="logo-container">
                <img src="./reddit-logo.png" alt="Reddit logo"/>
                <p>Reddit<span>Lite</span></p>
            </div>
            
                <form className="search" onSubmit={onSearchSubmit}>
                    <input value={searchTermLocal} onChange={onChangeLocal} type="text" placeholder="Search" />
                    <button type="submit" onClick={onSearchSubmit}>
                    <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
        </svg>
                    </button>
                </form>

                {isSmallScreen && (
                    <div className="button-container">
                    <button className="list-icon" ref={buttonRef} onClick={toggleAside}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                      </svg>
                    </button>
                  </div>
                )}
                <aside ref={asideRef} className={`aside-container ${isAsideVisible ? 'aside-visible' : ''}`}>
                  <Subreddits />
                </aside>

        </header>
    )
}

export default Header;
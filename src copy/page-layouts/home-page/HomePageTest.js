// src/page-layouts/HomePagesTest.js
"use client";

import React, { useState, useEffect } from 'react';
import classes from "../../../styles/HomePageTest.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import user from "../../theme/home_page/user.png";
import threedots from "../../theme/home_page/threedots.png";
import recent from "../../theme/home_page/recent.png";
import playlist from "../../theme/home_page/playlist.png";
import home from "../../theme/home_page/home.png";
import history from "../../theme/home_page/history.png";
import ARIS_Logo from "../../theme/home_page/logo.png";

function HomePageTest() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // state variable to track client-side rendering
  const [activityLogs, setActivityLogs] = useState([]);

  const modelViewer = () => {
    router.push("/upload");
  };

  useEffect(() => {
    setIsClient(true); // set isClient to true once the component has mounted on the client

    // Try to get logs from localStorage once the component has mounted
    const logs = localStorage.getItem('activityLogs');
    if (logs) {
      setActivityLogs(JSON.parse(logs));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      // check if currently on the client side before accessing localStorage
      localStorage.setItem('activityLogs', JSON.stringify(activityLogs));
    }
  }, [activityLogs, isClient]);

  return (
    <html className={classes.myGlobalStyles}>
      <body class="dark-theme">
        <section>
          <section className={classes.main_container}>
            <section className={classes.main_content}>
              <h1 className={classes.section_title}>Home</h1>
              <section className={classes.main_grid}>
                <section className={classes.main_thumbnail}>
                  <button onClick={modelViewer} className={classes.thumbnail_box} />
                </section>
                <section className={classes.main_canvas_heading}>
                  <h2 className={classes.main_text}>
                    <span>ModelViewer</span>
                    <br />
                    <span>Aug. 13</span>
                  </h2>
                </section>
              </section>

              <section className={classes.main_grid}>
                <section className={classes.main_thumbnail}>
                  <section className={classes.thumbnail_box}></section>
                </section>
                <section className={classes.main_canvas_heading}>
                  <h2 className={classes.main_text}>
                    <span>Nightly News Full Broadcast </span>
                    <br />
                    <span>Aug. 13</span>
                  </h2>
                </section>
              </section>
              <h1 className={classes.section_title}>Recent</h1>
              <section className={classes.main_grid}>
                <section className={classes.main_thumbnail}>
                  <section className={classes.recentthumbnail_box}></section>
                </section>
                <section className={classes.main_canvas_heading}>
                  <h2 className={classes.main_text}>
                    <span>Recent News Full Broadcast </span>
                    <br />
                    <span>Aug. 14</span>
                  </h2>
                </section>
              </section>
              <section className={classes.main_grid}>
                <section className={classes.main_thumbnail}>
                  <section className={classes.recentthumbnail_box}></section>
                </section>
                <section className={classes.main_canvas_heading}>
                  <h2 className={classes.main_text}>
                    <span>Recent News Full Broadcast </span>
                    <br />
                    <span>Aug. 14</span>
                  </h2>
                </section>
              </section>
            </section>
          </section>
          <section className={classes.main_banner_container}>
            <section className={classes.main_banner}>
              <section className={classes.main_end}>
                <button className={classes.main_banner_options}>
                  <span className={classes.nav_banner_text}>
                    <span>Import</span>
                  </span>
                </button>
                <button className={classes.main_sign_in_box}>
                  <div className={classes.main_sign_in_box_icon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.89 2C7.37001 2 2.89001 6.48 2.89001 12C2.89001 17.52 7.37001 22 12.89 22C18.41 22 22.89 17.52 22.89 12C22.89 6.48 18.41 2 12.89 2ZM12.89 3C17.85 3 21.89 7.04 21.89 12C21.89 13.42 21.55 14.76 20.96 15.96C19.43 14.24 16.98 13.07 13.58 12.93C14.5058 12.7687 15.3451 12.2863 15.9504 11.5675C16.5558 10.8488 16.8884 9.9397 16.89 9C16.89 6.79 15.1 5 12.89 5C10.68 5 8.89001 6.79 8.89001 9C8.89001 10.97 10.32 12.6 12.2 12.93C8.80001 13.07 6.35001 14.24 4.82001 15.96C4.23001 14.76 3.89001 13.42 3.89001 12C3.89001 7.04 7.93001 3 12.89 3ZM9.89001 9C9.89001 7.35 11.24 6 12.89 6C14.54 6 15.89 7.35 15.89 9C15.89 10.65 14.54 12 12.89 12C11.24 12 9.89001 10.65 9.89001 9ZM12.89 21C9.73001 21 6.95001 19.36 5.34001 16.88C6.90001 14.93 9.50001 13.9 12.89 13.9C16.28 13.9 18.88 14.93 20.44 16.88C18.83 19.36 16.05 21 12.89 21Z"
                        fill="rgb(255,255,255,255)"
                      />
                    </svg>
                  </div>
                  <span className={classes.nav_banner_text}>
                    <span>Profile</span>
                  </span>
                </button>
              </section>
            </section>
          </section>

          <section id="nav-bar" className={classes.main_nav_bar}>
            <section id="nav-box-upper" className={classes.main_nav_box_upper}>
              <section
                id="nav-grid-upper"
                className={classes.main_nav_grid_upper}
              >
                <section className={classes.nav_box}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classes.main_yticon}
                  >
                    <path
                      d="M4 21V10.08L12 3.12L20 10.08V21H14V15H10V21H4Z"
                      fill="rgba(113, 114, 116, 255)" // Thay đổi màu ở đây
                    />
                  </svg>
                  <h3 className={classes.nav_text}>
                    <span>Home</span>
                  </h3>
                </section>
                <section className={classes.nav_box}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classes.main_yticon}
                  >
                    <path
                      d="M10 18V12L15 15L10 18ZM17 3H7V4H17V3ZM20 6H4V7H20V6ZM22 9H2V21H22V9ZM3 10H21V20H3V10Z"
                      fill="rgba(113, 114, 116, 255)" // Thay đổi màu ở đây
                    />
                  </svg>
                  <h3 className={classes.nav_text}>
                    <span>Shorts</span>
                  </h3>
                </section>
                <section className={classes.nav_box}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classes.main_yticon}
                  >
                    <path
                      d="M11 7L17 10.5L11 14V7ZM18 20H4V6H3V21H18V20ZM21 18H6V3H21V18ZM7 17H20V4H7V17Z"
                      fill="rgba(113, 114, 116, 255)" // Thay đổi màu ở đây
                    />
                  </svg>
                  <h3 className={classes.nav_text}>
                    <span>Library</span>
                  </h3>
                </section>
                <section className={classes.nav_box}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classes.main_yticon}
                  >
                    <path
                      d="M14.97 16.95L9.99999 13.87V7H12V12.76L16.03 15.25L14.97 16.95ZM22 12C22 17.51 17.51 22 12 22C6.48999 22 1.99999 17.51 1.99999 12H2.99999C2.99999 16.96 7.03999 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C8.80999 3 5.91999 4.64 4.27999 7.38C4.16999 7.56 4.05999 7.75 3.96999 7.94L3.93999 8H7.99999V9H1.95999V3H2.95999V7.74C2.99999 7.65 3.02999 7.57 3.06999 7.49C3.17999 7.27 3.29999 7.07 3.41999 6.86C5.21999 3.86 8.50999 2 12 2C17.51 2 22 6.49 22 12Z"
                      fill="rgba(113, 114, 116, 255)" // Thay đổi màu ở đây
                    />
                  </svg>
                  <h3 className={classes.nav_text}>
                    <span>History</span>
                  </h3>
                </section>
              </section>
            </section>
          </section>
        </section>
        <footer>
          <footer className={classes.main_footer}></footer>
        </footer>
      </body>
    </html>
  );
}

export default HomePageTest;

//src/page-layouts/HomePagesTest.js
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
  const [isClient, setIsClient] = useState(false);  // state variable to track client-side rendering
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    setIsClient(true);  // set isClient to true once the component has mounted on the client

    // Try to get logs from localStorage once the component has mounted
    const logs = localStorage.getItem('activityLogs');
    if (logs) {
      setActivityLogs(JSON.parse(logs));
    }
  }, []);

  useEffect(() => {
    if (isClient) {  // check if currently on the client side before accessing localStorage
      localStorage.setItem('activityLogs', JSON.stringify(activityLogs));
    }
  }, [activityLogs, isClient]);

  const modelViewer = () => {

    const newLog = {
      title: "You used the Model Viewer.",
      date: new Date().toLocaleDateString(),  // This should be dynamic based on the current date
      route: "/upload" // This route should take the user back to the ModelViewer
    };

    // Add the card to the list of activity cards
    setActivityLogs(prevLogs => [...prevLogs, newLog]);
    router.push("/upload");
  };

  const navigateToModelViewer = () => {
    // Logic to navigate users back to the Model Viewer feature
    addActivityLog("You used the Model Viewer.", "/upload");

    // Navigate to Model Viewer page
    router.push("/upload");
  };

  return (
    <section>
      
      <section className={classes.main_container}>
        <section className={classes.main_content}>
          <h1 className={classes.section_title}>Home</h1>
          <section className={classes.main_grid}>
            <section className={classes.main_thumbnail}>
              <button onClick={modelViewer} className={classes.thumbnail_box}/>
            </section>
            <section className={classes.main_canvas_heading}>
              <h2 className={classes.main_text}>
                <span>ModelViewer</span>
              </h2>
            </section>
          </section>
          <section className={classes.main_grid}>
            <section className={classes.main_thumbnail}>
              <section className={classes.thumbnail_box}></section>
            </section>
            <section className={classes.main_canvas_heading}>
              <h2 className={classes.main_text}>
                <span>Image Tracking</span>

              </h2>
            </section>
          </section>
          <section className={classes.main_grid}>
            <section className={classes.main_thumbnail}>
              <section className={classes.thumbnail_box}></section>
            </section>
            <section className={classes.main_canvas_heading}>
              <h2 className={classes.main_text}>
                <span>Face Tracking</span>
              </h2>
            </section>
          </section>
          <h1 className={classes.section_title}>Recent</h1>
          {activityLogs.map((log, index) => (
          <section className={classes.main_grid} key={index} onClick={() => router.push(log.route)}>
            <section className={classes.main_thumbnail}>
              <section className={classes.recentthumbnail_box}></section>
            </section>
            <section className={classes.main_canvas_heading}>
              <h2 className={classes.main_text}>
                <span>{log.title}</span>
                <br />
                <span>{log.date}</span>
              </h2>
            </section>
          </section>
        ))}
          <section className={classes.main_grid}>
            <section className={classes.main_thumbnail}>
              <section className={classes.recentthumbnail_box}></section>
            </section>
          </section>
          <section className={classes.main_grid}>
            <section className={classes.main_thumbnail}>
              <section className={classes.recentthumbnail_box}></section>
            </section>
            <section className={classes.main_canvas_heading}>
              <h2 className={classes.main_text}>
                <span>Recent News Full Broadcast -</span>
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
              {/* <Image
                src={threedots}
                className={classes.main_button_settings}
                width={40}
                height={40}
                alt="Settings"
              /> */}
            </button>
            <button className={classes.main_sign_in_box}>
              <Image
                src={user}
                className={classes.main_button_settings}
                width={24}
                height={24}
                alt="user"
              />
              <span className={classes.nav_text}>
                <span>Profile</span>
              </span>
            </button>
            {/* <section className={classes.main_divlogo}>
              <Image
                alt="ARIS_Logo"
                src={ARIS_Logo}
                className={classes.main_bannerlogo}
                width={80}
                height={80}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </section> */}
          </section>
        </section>
      </section>
      <section id="nav-bar" className={classes.main_nav_bar}>
        <section id="nav-box-upper" className={classes.main_nav_box_upper}>
          <section id="nav-grid-upper" className={classes.main_nav_grid_upper}>
          {/* <button className={classes.main_sign_in_box}>
              <Image
                src={user}
                className={classes.main_button_settings}
                width={24}
                height={24}
                alt="user"
              />
              <span className={classes.nav_text}>
                <span>Profile</span>
              </span>
            </button> */}
            <section className={classes.nav_box}>
              <Image
                src={home}
                className={classes.main_yticon}
                alt="Home"
                width={24}
                height={24}
              />
              <h3 className={classes.nav_text}>
                <span>Home</span>
              </h3>
            </section>
            <section className={classes.nav_box}>
              <Image
                src={playlist}
                className={classes.main_yticon}
                alt="Shorts"
                width={24}
                height={24}
              />
              <h3 className={classes.nav_text}>
                <span>Shorts</span>
              </h3>
            </section>
            <section className={classes.nav_box}>
              <Image
                src={recent}
                className={classes.main_yticon}
                alt="Library"
                width={24}
                height={24}
              />
              <h3 className={classes.nav_text}>
                <span>Library</span>
              </h3>
            </section>
            <section className={classes.nav_box}>
              <Image
                src={history}
                className={classes.main_yticon}
                alt="History"
                width={24}
                height={24}
              />
              <h3 className={classes.nav_text}>
                <span>History</span>
              </h3>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}

export default HomePageTest;

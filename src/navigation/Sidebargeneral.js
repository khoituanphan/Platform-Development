import React from 'react';
import Image from 'next/image';
import home from '@/src/theme/home_page/home.png'
import playlist from '@/src/theme/home_page/playlist.png';
import recent from '@/src/theme/home_page/recent.png';
import history from '@/src/theme/home_page/history.png';
import classes from '@/styles/HomePageTest.module.css';
import { useRouter } from 'next/navigation';
import user from '@/src/theme/home_page/user.png';

function Sidebargeneral() {
  const router = useRouter();

  const asset = () => {
    router.push('/assetspage');
  };

  return (
    <div>
        <section className={classes.main_banner_container}>
			<section className={classes.main_banner}>
				<section className={classes.main_end}>
					<button className={classes.main_sign_in_box}>
						<Image
							src={user}
							className={classes.main_button_settings}
							width={24}
							height={24}
							alt="user"/>
					<span className={classes.nav_text}>
					    <span>Profile</span>
					</span>
					</button>
				</section>
		    </section>
		</section>

        <section id="nav-bar" className={classes.main_nav_bar}>
        <section id="nav-box-upper" className={classes.main_nav_box_upper}>
            <section id="nav-grid-upper" className={classes.main_nav_grid_upper}>
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
            <section className={classes.nav_box} onClick={asset}>
                <Image
                src={playlist}
                className={classes.main_yticon}
                alt="Shorts"
                width={24}
                height={24}
                />
                <h3 className={classes.nav_text}>
                <span>Assets</span>
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
    </div>
  );
}

export default Sidebargeneral;

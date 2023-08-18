import classes from '../../styles/starting-page.module.css';
import Layout from '../navigation/layout';

function StartingPage() {
	// Show Link to Login page if NOT auth

	return (
		<Layout>
			<section className={classes.starting}>
				<h1>Welcome on Board!</h1>
			</section>
		</Layout>
	);
}
export default StartingPage;

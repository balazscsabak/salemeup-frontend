import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import AuthGate from '../components/AuthGate';
import InitPageLoader from '../components/InitPageLoader';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<InitPageLoader>
				<Header />
				<div>
					{Component.auth ? (
						<AuthGate>
							<Component {...pageProps} />
						</AuthGate>
					) : (
						<Component {...pageProps} />
					)}
				</div>
			</InitPageLoader>
		</SessionProvider>
	);
}

export default MyApp;

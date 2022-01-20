import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthGate({ children }) {
	const { data, status } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/signin");
		}
	}, [status]);

	if (status === "authenticated") {
		return children;
	}

	return null;
}

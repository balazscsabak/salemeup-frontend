import { useSession } from "next-auth/react";
import React from "react";

export default function InitPageLoader({ children }) {
	const { status } = useSession();

	if (status === "loading") {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<div>
					<div
						style={{ borderTopColor: "transparent" }}
						className="w-16 h-16 border-4 border-yellow-600 border-dotted rounded-full animate-spin "
					></div>
				</div>
			</div>
		);
	} else {
		return children;
	}
}

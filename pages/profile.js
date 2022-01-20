import React from "react";
import { signOut } from "next-auth/react";

export default function profile() {
	return (
		<div>
			profile
			<div>
				<button onClick={() => signOut()}>signOut</button>
			</div>
		</div>
	);
}

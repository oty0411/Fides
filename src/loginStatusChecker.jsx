import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import {AuthUser} from "../utils/auth/authUser"

function LoginStatusChecker() {
	const router = useRouter();

	useEffect(() => {
		console.log("LoadLoadLoadLoadLoadLoadLoadLoad");
		if (!AuthUser.GetAuthenticated()) {
			router.replace("/");
		}
	});
	
	return (
		<div>
		</div>
	);
}

export default LoginStatusChecker;
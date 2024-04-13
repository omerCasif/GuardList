import Router from "next/router";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";


export default function WelcomePage() {
    useEffect(() => {
        async function handleLogout() {
            const response = await fetch('./api/logoutapi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        }
        handleLogout()

    }, [])
    const [isSignup, setIsSignup] = useState(false)
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [signupUsername, setSignupUsername] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        try {
            const requestData = {
                action: "login",
                username: loginUsername,
                password: loginPassword,
            }
            const response = await fetch('./api/loginapi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            if (response.ok) {
                Router.push('/dashboard')
            }
            else {
                setLoading(false)
                try {
                    const errorData = await response.json();
                    alert(errorData.message);
                } catch (error) {
                    alert('An error occurred. Please try again.');
                }
            }
        }
        catch {
            console.error('Error:', error.message);
        }
    }

    function isValidEmail(email) {
        // Regular expression for a basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSignup = async () => {
        if (!isValidEmail(signupEmail) || signupUsername === '' || signupPassword === '') {
            alert("User not valid");
            return;
        }
        try {
            const requestData = {
                action: "signup",
                username: signupUsername,
                password: signupPassword,
                email: signupEmail,
            }
            const response = await fetch('./api/signupapi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            if (response.ok) {
                alert("Signup successful")
                setIsSignup(false)
                setSignupUsername('')
                setSignupPassword('')
                setSignupEmail('')
            }
            else {
                alert("Signup error")
            }
        }
        catch {
            console.error('Error:', error.message);
        }
    }

    const handleLoginUserNameChange = (e) => setLoginUsername(e.target.value)
    const handleLoginPasswordChange = (e) => setLoginPassword(e.target.value)
    const handleSignupUserNameChange = (e) => setSignupUsername(e.target.value)
    const handleSignupPasswordChange = (e) => setSignupPassword(e.target.value)
    const handleSignupEmailChange = (e) => setSignupEmail(e.target.value)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
            <div
                className="bg-gray-700 text-white font-bold text-4xl p-36 absolute -top-60 -left-72 rounded-full transform translate-x-1/2 translate-y-1/2"
                style={{ zIndex: 0 }}
            >
                {!isSignup ? "LOGIN" : "SIGNUP"}
            </div>
            {loading ? <Spinner /> : <div className="flex-grow flex items-center justify-center" style={{ zIndex: 1 }}>
                {!isSignup && (
                    <div className="text-center">
                        <div className="bg-white p-8 rounded shadow-md mb-4">
                            <label className="block mb-2 font-bold">
                                Username
                                <input
                                    className="input-field mx-2 font-normal"
                                    type="text"
                                    value={loginUsername}
                                    onChange={handleLoginUserNameChange}
                                />
                            </label>
                            <label className="block mb-2 font-bold">
                                Password
                                <input
                                    className="input-field mx-2 font-normal"
                                    type="password"
                                    value={loginPassword}
                                    onChange={handleLoginPasswordChange}
                                />
                            </label>
                            <button className="btn-primary mb-2 rounded border bg-gray-700 text-white font-bold" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                        <p className="text-sm">
                            Don't have an account?{" "}
                            <button
                                className="text-blue-500 underline"
                                onClick={() => setIsSignup(true)}
                            >
                                Signup
                            </button>
                        </p>
                    </div>
                )}
                {isSignup && (
                    <div className="text-center">
                        <div className="bg-white p-8 rounded shadow-md mb-4">
                            <label className="block mb-2 font-bold">
                                Username
                                <input
                                    className="input-field mx-2 font-normal"
                                    type="text"
                                    value={signupUsername}
                                    onChange={handleSignupUserNameChange}
                                />
                            </label>
                            <label className="block mb-2 font-bold">
                                Password
                                <input
                                    className="input-field mx-2 font-normal"
                                    type="password"
                                    value={signupPassword}
                                    onChange={handleSignupPasswordChange}
                                />
                            </label>
                            <label className="block mb-2 font-bold">
                                Email
                                <input
                                    className="input-field mx-2 font-normal"
                                    type="email"
                                    value={signupEmail}
                                    onChange={handleSignupEmailChange}
                                />
                            </label>
                            <button className="btn-primary mb-2 font-bold bg-gray-700 text-white" onClick={handleSignup}>
                                Sign Up
                            </button>
                        </div>
                        <p className="text-sm">
                            Already have an account?{" "}
                            <button
                                className="text-blue-500 underline"
                                onClick={() => setIsSignup(false)}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                )}
            </div>}
        </div>

    );

}
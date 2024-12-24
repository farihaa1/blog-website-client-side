import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import googleImg from "../assets/google.png";

const LoginPage = () => {
  const { loginUser, handleGoogleLogin, loading, setLoading, handleGithubLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((res) => {
        console.log("Logged in user", res.user);
        setError("");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Login error", err.message);
        setError("Invalid email or password");
      });
  };

  const fetchGithubEmail = async (token) => {
    try {
      const response = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }

      const emails = await response.json();

      if (Array.isArray(emails)) {
        const primaryEmail = emails.find((email) => email.primary && email.verified);
        return primaryEmail?.email || null;
      }

      throw new Error("Invalid email response format");
    } catch (error) {
      console.error("Error fetching GitHub email:", error);
      throw error;
    }
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    try {
      const res = await handleGithubLogin();
      const token = res._tokenResponse.oauthAccessToken;

      console.log("GitHub sign-in user:", res.user);

      // Fetch user's email if not directly available
      let email = res.user.email;
      if (!email) {
        email = await fetchGithubEmail(token);
      }

      console.log("GitHub user email:", email);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("GitHub login error:", err.message);
      setError("Failed to sign in with GitHub. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    handleGoogleLogin()
      .then((res) => {
        console.log("Google sign-in user", res.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Google login error:", err.message);
        setError("Failed to sign in with Google. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="py-6 w-8/12 mx-auto">
            Log in to your account to access your dashboard, manage your posts, and interact with the community.
          </p>
        </div>
        <div className="card w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered dark:bg-gray-800 dark:text-gray-300"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered dark:bg-gray-800 dark:text-gray-300"
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt dark:text-white link link-hover"
                >
                  Forgot password?
                </a>
              </label>
              {error && <p className="text-red-500 text-center mb-2">{error}</p>}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary text-white">Login</button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p>OR</p>
            <button
              onClick={handleGoogleSignIn}
              className="btn mb-6 mt-2"
              disabled={loading}
            >
              <img className="w-8 h-8" src={googleImg} alt="Google" />
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
            <button
              onClick={handleGithubSignIn}
              className="btn mb-6 mt-2"
              disabled={loading}
            >
              <img className="w-8 h-8" src={googleImg} alt="GitHub" />
              {loading ? "Signing in..." : "Sign in with GitHub"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth.js";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await handleRegister({
      email: formData.email,
      username: formData.username,
      password: formData.password,
    });
    console.log("Register submitted:", formData);
    navigate("/");
    // TODO: integrate with auth API
  }
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">
      {/* ── Left Panel: Form ── */}
      <div className="flex w-full flex-col justify-between px-8 py-10 sm:px-12 lg:w-[45%] lg:px-20">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-indigo-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="text-lg font-semibold tracking-tight">
            SearchMind
          </span>
        </div>

        {/* Form Area */}
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Fill in the details below to get started
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-zinc-300"
              >
                Username
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 pr-3 pl-9 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 pr-3 pl-9 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 pr-3 pl-9 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-indigo-600 text-sm font-semibold tracking-wide text-white uppercase transition-all hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Bottom Link */}
        <p className="text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-white underline underline-offset-4 hover:text-indigo-400 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* ── Right Panel: Decorative ── */}
      <div
        className="relative hidden overflow-hidden rounded-l-3xl lg:flex lg:w-[55%] lg:items-center lg:justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(9,9,11,0.72), rgba(24,24,27,0.6)), url('https://images.unsplash.com/photo-1524351543168-8e38787614e9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Abstract geometric lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-zinc-500/30"
              style={{
                width: `${320 + i * 70}px`,
                height: `${320 + i * 70}px`,
                top: `${50 + i * 15}%`,
                right: `${-10 + i * -5}%`,
                transform: "rotate(-35deg)",
                borderRadius: "12px",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-md px-12">
          <p className="text-2xl leading-relaxed font-light text-zinc-200">
            A new way to experience{" "}
            <span className="font-semibold text-white">intelligent search</span>{" "}
            in the infinite digital space.
          </p>
          <a
            href="#"
            className="mt-6 inline-block text-xs font-semibold tracking-wider text-white uppercase underline underline-offset-4 hover:text-indigo-400 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;

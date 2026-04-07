import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function AuthPage() {
  const navigate = useNavigate();
  const { login, signup } = useStore();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const result = mode === "login" ? login(form) : signup(form);
    if (result.ok) {
      navigate("/account");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">Client Access</p>
        <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        {mode === "signup" ? (
          <input
            className="text-input"
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        ) : null}
        <input
          className="text-input"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <input
          className="text-input"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />
        <button className="btn btn--primary" type="submit">
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
        {message ? <p className="error-text">{message}</p> : null}
        <button type="button" className="text-link" onClick={() => setMode((prev) => (prev === "login" ? "signup" : "login"))}>
          {mode === "login" ? "Need an account? Sign up" : "Already registered? Login"}
        </button>
        <p className="muted">Demo account: `demo@veloura.com` / `demo123`</p>
      </form>
    </div>
  );
}

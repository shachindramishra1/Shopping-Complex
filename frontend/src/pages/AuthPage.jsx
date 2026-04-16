import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function AuthPage() {
  const navigate = useNavigate();
  const { login, signup } = useStore();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", mobile: "", identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    const result =
      mode === "login"
        ? await login({ identifier: form.identifier, password: form.password })
        : await signup(form);

    setIsSubmitting(false);
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
          <>
            <input
              className="text-input"
              placeholder="Full name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            <input
              className="text-input"
              placeholder="Mobile number"
              type="tel"
              value={form.mobile}
              onChange={(event) => setForm((prev) => ({ ...prev, mobile: event.target.value }))}
            />
          </>
        ) : null}
        <input
          className="text-input"
          placeholder={mode === "login" ? "Email or mobile number" : "Email"}
          type={mode === "login" ? "text" : "email"}
          value={mode === "login" ? form.identifier : form.email}
          onChange={(event) =>
            setForm((prev) =>
              mode === "login"
                ? { ...prev, identifier: event.target.value }
                : { ...prev, email: event.target.value }
            )
          }
        />
        <input
          className="text-input"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />
        <button className="btn btn--primary" type="submit">
          {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
        </button>
        {message ? <p className="error-text">{message}</p> : null}
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setMode((prev) => (prev === "login" ? "signup" : "login"));
            setMessage("");
          }}
        >
          {mode === "login" ? "Need an account? Sign up" : "Already registered? Login"}
        </button>
        <p className="muted">Create an account with your email, mobile number, and password, then login with either email or mobile.</p>
      </form>
    </div>
  );
}

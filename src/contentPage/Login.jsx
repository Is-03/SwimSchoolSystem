import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // You can add real authentication logic here
    if (email && password) {
      navigate("/dashboard"); // go to dashboard
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ width: "400px" }}>
        <h1 className="text-center mb-4">LOGIN</h1>

        <div className="mb-3 text-start">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn custom-btn w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;

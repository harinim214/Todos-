import { useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"



function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

 const handleSubmit = async () => {
  try {
    const res = await API.post("/auth/login", form)
    localStorage.setItem("token", res.data.token)
    navigate("/dashboard")
  } catch (err) {
    setError(err.response?.data?.message || "Login failed")
  }
}


  return (
    <div className="container">
  <div className="card">
    <h2>Login</h2>

    <input name="email" placeholder="Email" onChange={handleChange} />
    <input name="password" type="password" placeholder="Password" onChange={handleChange} />

    <button onClick={handleSubmit}>Login</button>

    <p className="link">
      Don't have an account? <Link to="/register">Register</Link>
    </p>
  </div>
</div>

  )
}

export default Login

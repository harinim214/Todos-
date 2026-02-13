import { useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"



function Register() {
  const [form, setForm] = useState({
    name: "",
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
    await API.post("/auth/register", form)
    navigate("/")
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed")
  }
}


 return (
  <div className="container">
    <div className="card">
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

  
      {error && <p className="error">{error}</p>}

      <button onClick={handleSubmit}>Register</button>

      <p className="link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
)

}

export default Register

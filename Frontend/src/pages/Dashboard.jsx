import { useEffect, useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const [todos, setTodos] = useState([])
  const [data, setData] = useState("")
  const [editId, setEditId] = useState(null)

  const navigate = useNavigate()

  const fetchTodos = async () => {
    const res = await API.get("/todos")
    setTodos(res.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleAdd = async () => {
  if (!data.trim()) return

  if (editId) {
    await API.put(`/todos/${editId}`, { name: data })
    setEditId(null)
  } else {
    await API.post("/todos", { name: data })
  }

  setData("")
  fetchTodos()
}


  const handleDelete = async (id) => {
    await API.delete(`/todos/${id}`)
    fetchTodos()
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

 return (
  <div className="dashboard">
    <div className="dashboard-header">
      <h2>Todo Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>

    <div style={{ marginTop: "20px" }}>
      <input
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleAdd}>
        {editId ? "Update" : "Add"}
      </button>
    </div>

    <ul>
      {todos.map(todo => (
        <li key={todo._id}>
          {todo.name}

          <div>
            <button onClick={() => {
              setData(todo.name)
              setEditId(todo._id)
            }}>
              Edit
            </button>

            <button onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

}

export default Dashboard

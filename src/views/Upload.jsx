import { useState } from "react"
import { Link } from "react-router-dom"

const Upload = () => {

  const [file, setFile] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("tiedostoa yritetään lähettää")

    console.log("file", file)
    console.log("name", name)
  }

  return <>
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="tiedosto"
        onChange={(event) =>
          setFile(event.target.value)
        }
      /><br />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(event) =>
          setName(event.target.value)
        }
      />
      <button
        type="submit"
      >Upload file</button>
    </form>

    <p>
      <Link to="/">Back to home</Link>
    </p>
  </>
}


export default Upload

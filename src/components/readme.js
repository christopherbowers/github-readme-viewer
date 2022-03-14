import { useState } from 'react'
import axios from 'axios'

export default function ReadMe({user, repoName, defaultBranch}) {

  const [readme, setReadme] = useState(null)

  const getReadMe = async () => {
    await axios
    .get(`https://raw.githubusercontent.com/${user}/${repoName}/${defaultBranch}/README.md`)
    .then(res => {
      setReadme(res.data)
    })
  }

  if (repoName) {
    getReadMe()
  }

  return (
    <>
    { readme !== null ?
      <pre>
         {readme}
      </pre>
    : null }
    </>
  )
}

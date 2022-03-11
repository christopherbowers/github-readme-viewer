import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
 // import { baseUrl } from '../baseUrl'

// https:raw.githubusercontent.com/{user}/{repo}/main/README.md

export default function ReadMe({user, repoName, defaultBranch}) {

  const [readme, setReadme] = useState(null)


  const getReadMe = async () => {
    await axios
    .get(`https://raw.githubusercontent.com/${user}/${repoName}/${defaultBranch}/README.md`)
    .then(res => {
      setReadme(res.data)
      // console.log(res)
    })
  }
  getReadMe()

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

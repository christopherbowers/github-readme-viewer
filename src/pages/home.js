import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import Readme from '../components/readme'
import axios from 'axios'
import { baseUrl } from '../baseUrl'


export default function Home() {

  const { user } = useParams()

  const [repos, setRepos] = useState([])
  const [repo, setRepo] = useState({
    name: '',
    defaultBranch: ''
  })
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const getRepos = async () => {
      await axios.get(`${baseUrl}/${user}/repos`)
      .then(res => {
        setRepos(res.data)
      })
      .then(setLoading(false))
    }
    getRepos()
  },[])


  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
    <h1>{user}{"’"}s Repos</h1>
    <div className="flex-wrapper">
      <Sidebar repos={repos} setRepo={setRepo} />
      <Readme user={user} repoName={repo.name} defaultBranch={repo.defaultBranch} />
    </div>
    </>
  )
}

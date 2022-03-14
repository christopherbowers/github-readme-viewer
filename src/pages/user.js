import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import Readme from '../components/readme'
import axios from 'axios'
import { baseUrl, perPage } from '../constants'


export default function Home() {

  const { user } = useParams()

  const [repos, setRepos] = useState([])
  const [repo, setRepo] = useState({
    name: '',
    defaultBranch: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const observer = useRef()

  const lastRepoElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  useEffect(() => {
    setLoading(true)
    setError(false)
    const getRepos = async () => {
      await axios.get(`${baseUrl}/${user}/repos?per_page=${perPage}&page=${pageNumber}`)
      .then(res => {
        setRepos(previousRepos => {
          return [...previousRepos, ...res.data]
        })
        setHasMore(res.data.length > 0)
        setLoading(false)
      }).catch(error => setError(true))
    }
    getRepos()
  },[pageNumber])


  return (
    <>
    <h1>{user}{"’"}s Repos</h1>
    <div className="flex-wrapper">
      <Sidebar
        loading={loading}
        error={error}
        repos={repos}
        setRepo={setRepo}
        lastRepoElementRef={lastRepoElementRef}
      />
      <Readme user={user} repoName={repo.name} defaultBranch={repo.defaultBranch} />
    </div>
    </>
  )
}

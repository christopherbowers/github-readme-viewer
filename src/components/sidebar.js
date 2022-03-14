export default function Sidebar({loading, error, repos, setRepo, lastRepoElementRef}) {

  const repoDetail = (e) => {
    e.preventDefault()
    setRepo({
      name:  e.target.dataset.name,
      defaultBranch: e.target.dataset.branch
    })
  }

  return (
    <aside>
      <ul>
        {repos.map(({id, name, default_branch}, index) => {
          if (repos.length === index + 1) {
            return (
              <li
                ref={lastRepoElementRef}
                key={id}
                data-name={name}
                data-branch={default_branch}
                onClick={repoDetail}
              >
                {name}
              </li>)
          } else {
            return (
              <li
                key={id}
                data-name={name}
                data-branch={default_branch}
                onClick={repoDetail}
              >
                {name}
              </li>)
          }
        })}
      </ul>
      {loading ? <div>loading...</div> : null}
      {error ? <div>Error</div> : null}
    </aside>
  )
}

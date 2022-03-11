export default function Sidebar({repos, setRepo}) {

  const repoDetail = (e) => {
    e.preventDefault()
    setRepo({
      name:  e.target.dataset.name,
      defaultBranch: e.target.dataset.branch
    })
  }

  return (
    <>
      <ul>
        {repos.map(({id, name, default_branch}) => (
          <li
          key={id}
          data-name={name}
          data-branch={default_branch}
          onClick={repoDetail}
          >
            {name}
          </li>
        ))}
      </ul>
    </>
  )
}

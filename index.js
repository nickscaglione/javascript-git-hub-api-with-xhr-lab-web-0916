
document.getElementsByTagName('form')[0].addEventListener('submit', (event)=> {
  event.preventDefault()
  getRepositories()
})

function getRepositories() {
  const req = new XMLHttpRequest()
  let username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList =
  `<ul>
    ${repos.map(
      r => "<li>"
      + r.name
      + " - <a href='#' data-repo='https://github.com/'"
      + r.owner.login
      + "/" + r.name
      + " onclick='getCommits(\""
      + r.url
      + "\")'>Get Commits</a></li>").join("")
    }
  </ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(url) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `${url}/commits`)
  req.send()
}

function displayCommits(event) {
  var commits = JSON.parse(this.responseText)
  let commitList =
    `<ul>
    ${commits.map(
      c => "<li>" + c.sha + " - " + c.commit.author.name + "</li>"
    ).join("")}
    </ul>`
  document.getElementById("details").innerHTML = commitList
}

const repositoryList = document.querySelector("#repository-list");

function formatStars(stars) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(stars);
}

function renderRepositories(repositories) {
  repositoryList.innerHTML = repositories.map((repository) => `
    <li class="repository">
      <div>
        <h2><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.repository}</a></h2>
        <p class="description">${repository.description}</p>
        <p class="meta">
          <span>${repository.language}</span>
          <span>Starred ${repository.starredAt}</span>
        </p>
      </div>
      <span class="stars" aria-label="${repository.stars} stars">★ ${formatStars(repository.stars)}</span>
    </li>
  `).join("");
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Could not load events.json: ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    repositoryList.innerHTML = '<li class="status">Unable to load starred repositories.</li>';
    console.error(error);
  }
}

loadRepositories();

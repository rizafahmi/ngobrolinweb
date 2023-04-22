async function getEpisodes() {
  const res = await fetch(`./data/episodes.json`)
  const episodes = await res.json()
  return episodes
}

async function main() {
  const episodes = await getEpisodes()

  console.log(episodes)
  renderEpisodes(episodes.items)
}

main()

function renderEpisodes(episodes) {
  if ('content' in document.createElement('template')) {
    const episodesEl = document.querySelector('#episodes')
    const template = document.querySelector('#episode')
    for (let i = 0; i < episodes.length; i++) {
      const clone = template.content.cloneNode(true)
      let img = clone.querySelector('img')
      let title = clone.querySelector('h3')
      let a = clone.querySelector('a')

      img.src = episodes[i].snippet.thumbnails.default.url
      img.height = episodes[i].snippet.thumbnails.default.height
      img.width = episodes[i].snippet.thumbnails.default.width

      title.textContent = episodes[i].snippet.title.split(" - ")[0]
      a.href = `https://youtube.com/watch?v=${episodes[i].contentDetails.videoId}`

      episodesEl.appendChild(clone)

    }
  }
}

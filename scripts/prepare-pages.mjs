import { copyFile, mkdir, writeFile } from 'node:fs/promises'

const routes = [
  'services-pricing',
  'ai-automation',
  'how-it-works',
  'free-consultation',
  'privacy',
  'about',
  'thank-you',
  '404',
]

await copyFile('dist/index.html', 'dist/404.html')
await writeFile('dist/.nojekyll', '')

for (const route of routes) {
  const directory = `dist/${route}`
  await mkdir(directory, { recursive: true })
  await copyFile('dist/index.html', `${directory}/index.html`)
}

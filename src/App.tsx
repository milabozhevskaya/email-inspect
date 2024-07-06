import './app.css'
import { StyledInspectTable } from './components'
import emails from './fake-data'

export default function App() {
  return (
    <main>
      <h1>Email Inspect</h1>
      <StyledInspectTable emails={emails} />
    </main>
  )
}

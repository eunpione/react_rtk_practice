import { useState } from 'react'
import { useSearchReposQuery } from "./features/github/githubApi";
import './App.css'

function App() {
  const [q, setQ] = useState("react");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useSearchReposQuery({
    q,
    page,
    per_page: 10,
  });

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
      <h1>GitHub Repo Explorer</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
        }}
        style={{ display: "flex", gap: 8 }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1, padding: 8 }}
          placeholder="Search keyword (e.g. react)"
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <div style={{ paddingTop: 6 }}>Page {page}</div>
        <button onClick={() => setPage((p) => p + 1)} disabled={isLoading}>
          Next
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {JSON.stringify(error)}</p>}

      <ul>
        {data?.items?.map((r) => (
          <li key={r.id}>
            <a href={r.html_url} target="_blank" rel="noreferrer">
              {r.full_name}
            </a>{" "}
            ⭐ {r.stargazers_count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

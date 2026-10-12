export default function Page() {
  return (
    <main className="launch-page">
      <div className="launch-mark" aria-hidden="true">
        <span />
        <span />
      </div>
      <section className="launch-content" aria-labelledby="launch-title">
        <p className="launch-eyebrow">A new beginning</p>
        <h1 id="launch-title">Launching soon</h1>
        <p className="launch-subtitle">Something thoughtful is on its way.</p>
      </section>
      <p className="launch-footer">Stay tuned</p>
    </main>
  )
}

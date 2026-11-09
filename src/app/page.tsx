export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <main className="flex flex-col items-center gap-4 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          Under Construction
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Project is under construction
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          We are currently working on this website. Please check back soon!
        </p>
      </main>
    </div>
  );
}

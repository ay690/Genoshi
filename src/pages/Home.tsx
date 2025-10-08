import { Sparkles, Cloud, Image, Database, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Smart Assistant",
    desc: "Ask questions, request calculations, or run tool actions — the assistant can handle it.",
    icon: Sparkles,
  },
  {
    title: "Weather & Data",
    desc: "Fetch live weather and query structured data with simple prompts.",
    icon: Cloud,
  },
  {
    title: "Image Generation",
    desc: "Create images from prompts using the integrated image tool.",
    icon: Image,
  },
  {
    title: "Database Queries",
    desc: "Run safe data lookups and get structured answers in seconds.",
    icon: Database,
  },
  {
    title: "Built-in Calculator",
    desc: "Instant math, conversions and numeric insights.",
    icon: Calculator,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <header className="pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 bg-gradient-to-br from-indigo-500 to-blue-500 shadow-md">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Genoshi</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI tools & chat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={() => window.open("https://github.com/ay690", "_blank")}
            >
              GitHub
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => (window.location.href = "/chat")}
            >
              Open Chat
            </Button>
          </div>
        </div>
      </header>

      <main className="px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center py-12">
          {/* Hero */}
          <section className="space-y-6">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">
                AI Assistant for tools, data & creative tasks
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Chat with a helpful assistant that can call tools: fetch
                weather, compute values, generate images, and query data — all
                inside a simple, fast UI.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onClick={() => (window.location.href = "/chat")}
                  className="px-5 py-2 cursor-pointer"
                >
                  Start chatting
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    window.open("https://github.com/ay690", "_blank")
                  }
                  className="cursor-pointer"
                >
                  View on GitHub
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/5 backdrop-blur-md px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong>Live demo</strong>
                  <span className="opacity-80">
                    Try ask “What’s the weather in Mumbai?”
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/5 backdrop-blur-md px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <strong>Extensible</strong>
                  <span className="opacity-80">
                    Add more tools or connect APIs
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Mock preview / card */}
          <aside className="relative">
            <div className="glass-card rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Assistant Preview</h4>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Live
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Assistant</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Hello! Ask me anything — try weather, math, or image
                        generation.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    <strong>User:</strong> What&apos;s the temperature in New
                    York?
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Assistant:</strong> It's 18°C with clear skies.
                  </div>
                </div>
              </div>
            </div>

            {/* small floating badge */}
            <div className="absolute -right-6 -top-6">
              <div className="rounded-full p-3 bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
          </aside>
        </div>

        {/* Features */}
        <section className="max-w-7xl mx-auto py-10">
          <h3 className="text-2xl font-semibold mb-6">Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="p-5 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 backdrop-blur-md shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/40">
                      <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{f.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700/40 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Genoshi — built with ❤️
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={() => (window.location.href = "/chat")}
            >
              Try Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => window.open("https://github.com/ay690", "_blank")}
            >
              GitHub
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

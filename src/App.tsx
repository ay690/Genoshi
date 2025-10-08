import NotFound from "./pages/NotFound";
import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster as Sonner } from "sonner";
import { Chat } from "./pages/Chat";
import Spinner from "./components/Spinner";

const queryClient = new QueryClient();
const Home = lazy(() => import("./pages/Home"));

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              {showContent ? (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              ) : (
                <Spinner />
              )}
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;


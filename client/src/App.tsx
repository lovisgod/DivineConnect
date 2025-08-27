import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AudioProvider } from "@/contexts/audio-context";
import GlobalAudioPlayer from "@/components/audio/global-audio-player";
import NotFound from "@/pages/not-found";
import Home from "./pages/home";
import Messages from "./pages/messages";
import Devotions from "./pages/devotions";
import About from "./pages/about";
import Contact from "./pages/contact";
import Header from "@/components/layout/header";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/messages" component={Messages} />
      <Route path="/devotions" component={Devotions} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pb-20">
              <Router />
            </main>
          </div>
          <GlobalAudioPlayer />
          <Toaster />
        </AudioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

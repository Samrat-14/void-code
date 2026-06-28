import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { Home } from "./screens/home";
import { NewSession } from "./screens/new-session";
import { Session } from "./screens/session";

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="sessions/new" element={<NewSession />} />
          <Route path="sessions/:id" element={<Session />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

const renderer = await createCliRenderer({
  targetFps: 60,
  exitOnCtrlC: false,
});
createRoot(renderer).render(<App />);

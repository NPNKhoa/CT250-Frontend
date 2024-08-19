import LoadingPage from "@pages/LoadingPage";
import NotFoundPage from "@pages/NotFoundPage";
import routes from "@routers";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

const DefaultLayout = lazy(() => import("@layouts/DefaultLayout"));

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Routes>
          {routes.map(({ id, path, element }) => (
            <Route
              key={id}
              path={path}
              element={<DefaultLayout>{element}</DefaultLayout>}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoadingPage, NotFoundPage } from "@pages/index";
import { exampleRoutes, homeRoute } from "@routers";

// import { ExampleLayout } from '@layouts';

const ExampleLayout = lazy(() =>
  import("@layouts").then((module) => ({ default: module.ExampleLayout }))
);

const HomeLayout = lazy(() =>
  import("@layouts").then((module) => ({ default: module.HomeLayout }))
);

const Router = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Routes>
          {exampleRoutes.map(({ id, path, element }) => (
            <Route
              key={id}
              path={path}
              element={<ExampleLayout>{element}</ExampleLayout>}
            />
          ))}

          {homeRoute.map(({ id, path, element }) => (
            <Route
              key={id}
              path={path}
              element={<HomeLayout>{element}</HomeLayout>}
            />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;

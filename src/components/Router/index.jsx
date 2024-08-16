import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoadingPage, NotFoundPage } from "@pages/index";
import { HomeRoute, authRoutes } from "@routers";

const HomeLayout = lazy(() =>
  import("@layouts").then((module) => ({ default: module.HomeLayout }))
);

const AuthLayout = lazy(() =>
  import("@layouts").then((module) => ({ default: module.AuthLayout }))
);

const Router = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Routes>
          {HomeRoute.map(({ id, path, element }) => (
            <Route
              key={id}
              path={path}
              element={<HomeLayout>{element}</HomeLayout>}
            />
          ))}

          {authRoutes.map(({ id, path, element }) => (
            <Route
              key={id}
              path={path}
              element={<AuthLayout>{element}</AuthLayout>}
            />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;

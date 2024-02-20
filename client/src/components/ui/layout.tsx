import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

function Layout(): ReactElement {
  return (
    <>
      <main className="h-screen w-screen bg-zinc-800 text-white gap-6 flex flex-1 flex-col items-center justify-center overflow-y-auto">
        <Outlet />
      </main>
    </>
  );
}

export { Layout };

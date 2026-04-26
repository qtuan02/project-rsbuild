import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-4">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <span className="text-xl font-bold">PT</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Phòng Trọ Pro</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Giải pháp quản lý phòng trọ toàn diện
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

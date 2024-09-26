import React from "react";
import { DriverRequest } from "../Components/index";

export default function DriverDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row w-full gap-4">
        <DriverRequest />
      </div>
    </div>
  );
}

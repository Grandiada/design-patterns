import { Status, changeStatus } from "@/app/api/project-controller";
import React from "react";

export const StatusSelector: React.FC<{
  status: Status;
  componentId: string;
}> = (props) => {
  return (
    <select
      value={props.status}
      onChange={async (e) => {
        changeStatus(props.componentId, e.target.value as Status);
      }}
    >
      {Object.values(Status).map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

import { Status, changeStatus } from "@/app/api/project-controller";
import { Select } from "antd";
import React from "react";

export const StatusSelector: React.FC<{
  status: Status;
  componentId: string;
}> = (props) => {
  return (
    <Select<Status>
      style={{ width: 120 }}
      value={props.status}
      onChange={async (value) => {
        changeStatus(props.componentId, value);
      }}
    >
      {Object.values(Status).map((status) => (
        <Select.Option key={status} value={status}>
          {status}
        </Select.Option>
      ))}
    </Select>
  );
};

"use client";

import React, { useState } from "react";
import * as Styled from "./page.styled";
import { Spin } from "antd";
import { Tasks } from "./components/Task";

export default function TasksPage() {
  const [isConnected, setIsConnected] = useState(false);
  return (
    <>
      {!isConnected && (
        <Styled.LoaderWrapper>
          <Spin size="large" />
        </Styled.LoaderWrapper>
      )}

      <Tasks
        onConnected={() => setIsConnected(true)}
        isConnected={isConnected}
      />
    </>
  );
}

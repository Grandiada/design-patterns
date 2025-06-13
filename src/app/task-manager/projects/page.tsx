"use client";

import { useState } from "react";
import * as Styled from "./page.styled";
import { Spin } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { Projects } from "./_components/Projects";

export default function TaskManager() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      {!isConnected && (
        <Styled.LoaderWrapper>
          <Spin size="large" />
        </Styled.LoaderWrapper>
      )}

      <Projects
        onConnected={() => setIsConnected(true)}
        isConnected={isConnected}
      />
    </>
  );
}

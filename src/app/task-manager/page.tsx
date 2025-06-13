"use client";

import { useState } from "react";
import { undoCommand } from "@/app/api/project-controller";
import * as Styled from "./page.styled";
import { useClientId } from "@/lib";
import { toast, ToastContainer } from "react-toastify";
import { Button, Flex, Layout, Spin, Splitter, Typography } from "antd";
import "@ant-design/v5-patch-for-react-19";
import Link from "next/link";
import { Projects } from "./_components/Projects";

export default function TaskManager() {
  const [isConnected, setIsConnected] = useState(false);
  const id = useClientId();

  return (
    <Styled.Root>
      <Styled.Header>
        <h1>Task Manager | {id}</h1>
      </Styled.Header>
      <Layout>
        <Splitter
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
          }}
        >
          <Splitter.Panel defaultSize="10%" min="10%" max="70%">
            <Flex
              align="center"
              vertical
              style={{ height: "100%", padding: "10px" }}
            >
              <Typography.Text>
                <Link href="/task-manager">Projects List</Link>
              </Typography.Text>
              <Typography.Text>
                <Button
                  onClick={async () => {
                    const result = await undoCommand();
                    if (result?.errorMessage) {
                      toast.error(result.errorMessage);
                    }
                  }}
                >
                  Undo
                </Button>
              </Typography.Text>
            </Flex>
          </Splitter.Panel>
          <Splitter.Panel>
            {!isConnected && (
              <Styled.LoaderWrapper>
                <Spin size="large" />
              </Styled.LoaderWrapper>
            )}

            <Projects
              onConnected={() => setIsConnected(true)}
              isConnected={isConnected}
            />
          </Splitter.Panel>
        </Splitter>
      </Layout>
      <ToastContainer />
    </Styled.Root>
  );
}

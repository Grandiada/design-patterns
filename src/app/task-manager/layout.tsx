"use client";
import { toast, ToastContainer } from "react-toastify";
import * as Styled from "./layout.styled";
import { Button, Flex, Layout, Splitter, Typography } from "antd";
import Link from "next/link";
import { undoCommand } from "../api/project-controller";
import { useClientId } from "@/lib";

export default function TaskManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              align="flex-end"
              vertical
              style={{ height: "100%", padding: "10px" }}
            >
              <Typography.Text>
                <Link href="/task-manager/projects">Projects List</Link>
              </Typography.Text>
              <Typography.Text>
                <Link href="/task-manager/tasks">Tasks List</Link>
              </Typography.Text>
              <Typography.Text style={{ marginTop: "auto" }}>
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
          <Splitter.Panel>{children}</Splitter.Panel>
        </Splitter>
      </Layout>

      <ToastContainer />
    </Styled.Root>
  );
}

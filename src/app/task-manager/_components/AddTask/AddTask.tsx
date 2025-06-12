import { addTask } from "@/app/api/project-controller";
import { CreateTaskComponentRequest } from "@/app/api/project-controller/creationHandler/CreateTaskComponentRequest";
import {
  Button,
  Input,
  Form,
  Modal,
  FormProps,
  Select,
  FormInstance,
  Result,
  Spin,
} from "antd";
import React, { useRef, useState } from "react";
import * as Styled from "./AddTask.styled";

export const AddTask: React.FC<{ parentId: string }> = ({ parentId }) => {
  const [isCreationInProgres, setIsCreationInProgres] = useState(false);
  const formRef = useRef<FormInstance<CreateTaskComponentRequest>>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsCreationInProgres(true);
  };

  const handleCancel = () => {
    setIsCreationInProgres(false);
    setIsSuccess(false);
    setIsLoading(false);
    formRef.current?.resetFields();
  };

  const onFinish: FormProps<CreateTaskComponentRequest>["onFinish"] = async (
    values
  ) => {
    setIsLoading(true);
    await addTask({ ...values, parentId });
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Task/Project
      </Button>
      <Modal
        height={600}
        width={600}
        title="Create Task/Project"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isCreationInProgres}
        destroyOnHidden
        onCancel={handleCancel}
        footer={null}
      >
        <Styled.ContentWrapper>
          {isLoading && (
            <Styled.SpinnerWrapper>
              <Spin size="large" />
            </Styled.SpinnerWrapper>
          )}

          {!isLoading && isSuccess && (
            <Result
              status="success"
              extra={[
                <Button type="primary" key="console" onClick={handleCancel}>
                  Close modal
                </Button>,
              ]}
            />
          )}

          {!isLoading && !isSuccess && (
            <Form
              ref={formRef}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ width: "100%", paddingTop: "20px" }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<CreateTaskComponentRequest>
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<CreateTaskComponentRequest>
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item<CreateTaskComponentRequest>
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select a type!" }]}
              >
                <Select
                  options={[
                    { label: "Task", value: "task" },
                    { label: "Project", value: "project" },
                  ]}
                />
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          )}
        </Styled.ContentWrapper>
      </Modal>
    </>
  );
};

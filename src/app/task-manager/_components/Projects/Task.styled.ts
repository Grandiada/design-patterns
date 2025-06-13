import { Card, List } from "antd";
import styled, { css } from "styled-components";

const taskStyle = css`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
  background-color: wheat;
  color: black;
`;

export const Task = styled(List.Item)`
  cursor: pointer;

  &:hover {
    background-color: wheat;
  }

  transition: background-color 0.3s ease-in-out;
`;

export const TaskList = styled(List)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Project = styled(Card)<{
  $isHighlited?: boolean;
}>`
  ${taskStyle}
  background-color: #f0f0f0;
  ${({ $isHighlited }) =>
    $isHighlited &&
    css`
      background-color: rgb(226, 226, 226);
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      border: 1px solid #ccc;
    `}

  transition: background-color 0.3s ease-in-out;

  & .ant-card-body {
    padding-top: 0;
  }
`;

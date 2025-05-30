import styled, { css } from "styled-components";

const taskStyle = css`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: wheat;
  color: black;
`;

export const Task = styled.li`
  ${taskStyle}
  cursor: move;
`;

export const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 40px;
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Project = styled.ul`
  ${taskStyle}
  background-color: #f0f0f0;
`;

export const Button = styled.button`
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
`;

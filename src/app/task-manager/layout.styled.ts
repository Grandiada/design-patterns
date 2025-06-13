import { Layout } from "antd";
import styled from "styled-components";

export const Root = styled(Layout)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  max-height: 100vh;
  height: 100%;
  overflow: hidden;
`;

export const Header = styled(Layout.Header)`
  background-color: #000;
  color: white;
`;

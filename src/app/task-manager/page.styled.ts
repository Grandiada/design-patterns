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

export const LoaderWrapper = styled.div`
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled(Layout.Header)`
  background-color: #000;
  color: white;
`;

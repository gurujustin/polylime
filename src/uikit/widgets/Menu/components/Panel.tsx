import React from "react";
import styled from "styled-components";
import PanelBody from "./PanelBody";
import PanelFooter from "./PanelFooter";
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "../config";
import { PanelProps, PushedProps } from "../types";

interface Props extends PanelProps, PushedProps {
  showMenu: boolean;
  isMobile: boolean;
}

const StyledPanel = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  position: fixed;
  padding-top: ${({ showMenu }) => (showMenu ? "80px" : 0)};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.nav.background};
  width: ${({ isPushed }) => (isPushed ? `${SIDEBAR_WIDTH_FULL}px` : 0)};
  height: 100%;
  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: ${({ isPushed }) => (isPushed ? "2px solid rgba(133, 133, 133, 0.1)" : 0)};
  z-index: 11;
  overflow: ${({ isPushed }) => (isPushed ? "initial" : "hidden")};
  transform: translate3d(0, 0, 0);
  ${({ isPushed }) => !isPushed && "white-space: nowrap;"};

  ${({ theme }) => theme.mediaQueries.nav} {
    border-right: 2px solid rgba(133, 133, 133, 0.1);
    width: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  }
`;

const RugDoc = styled.a<{ target: string; rel: string; href: string }>`
  margin: 0 2%;
`;
const AssureKyc = styled.a<{ target: string; rel: string; href: string }>`
  margin: 0 2%;
`;

const Panel: React.FC<Props> = (props) => {
  const { isPushed, showMenu } = props;
  return (
    <StyledPanel isPushed={isPushed} showMenu={showMenu}>
      <PanelBody {...props} />
      {/* <AssureKyc target="_blank" rel="noreferrer" href="https://paladinsec.co/polycherry/">
        <img src="/images/audited-by-paladin-standard.png" alt="paladin" />
      </AssureKyc> */}
      <RugDoc target="_blank" rel="noreferrer" href="https://rugdoc.io/project/polycherry/">
        <img src="/images/rugdoc-liquiditylock.png" alt="rugdoc" />
      </RugDoc>
      <RugDoc target="_blank" rel="noreferrer" href="https://rugdoc.io/project/polycherry/">
        <img src="/images/rugdoc-lowrisk.png" alt="rugdoc" />
      </RugDoc>
      <PanelFooter {...props} />
    </StyledPanel>
  );
};

export default Panel;

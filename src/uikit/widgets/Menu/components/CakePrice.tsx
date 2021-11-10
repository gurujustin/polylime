import React from "react";
import styled from "styled-components";
import { LogoIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";

interface Props {
  cakePriceUsd?: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<Props> = ({ cakePriceUsd }) => {
  return cakePriceUsd ? (
    <PriceLink
      href="https://quickswap.exchange/#/swap?outputCurrency=0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E"
      target="_blank"
    >
      <LogoIcon width="48px" mr="8px" />
      <Text color="textSubtle" fontSize="20px">{`$${cakePriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={32} />
  );
};

export default React.memo(CakePrice);

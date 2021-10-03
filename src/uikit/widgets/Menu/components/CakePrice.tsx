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
      href="https://quickswap.exchange/#/swap?outputCurrency=0x64210822e0e260E76DBA23E89F1b0b5E0A37c2b2"
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

import React from 'react'
import styled from 'styled-components'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Skeleton } from 'uikit'

export interface AprProps {
  value: string
  multiplier: string
  lpLabel: string
  tokenAddress?: Address
  quoteTokenAddress?: Address
  cakePrice: BigNumber
  originalValue: number
  hideButton?: boolean
  pid?: number
  lpSymbol?: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({
  value,
  lpLabel,
  tokenAddress,
  quoteTokenAddress,
  cakePrice,
  originalValue,
  hideButton = false,
  pid,
  lpSymbol,
  multiplier
}) => {
  let formattedAPR
  if (value) {
    const dispAPR = value.replaceAll(",","")
    const formats = [
      { value: 1e3, symbol: "K" } , 
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
    ];
    let formatted = value
    formats.forEach(format => {
      if(new BigNumber(dispAPR).gt(format.value)){
        formatted = new BigNumber(dispAPR) && new BigNumber(dispAPR).div(format.value).toNumber().toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        const parts = formatted.match(/([\D]*)([\d.,]+)([\D]*)/)
        formatted=`${parts[1]}${parts[2]}${format.symbol}${parts[3]}`
      }
    });
  
    formattedAPR = formatted
  }

  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <>
          <AprWrapper>{formattedAPR}%</AprWrapper>
          {!hideButton && (
            <ApyButton
              pid={pid}
              lpSymbol={lpSymbol}
              multiplier={multiplier}
              lpLabel={lpLabel}
              cakePrice={cakePrice}
              apr={originalValue}
              displayApr={value}
              addLiquidityUrl={addLiquidityUrl}
            />
          )}
        </>
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue}%</AprWrapper>
    </Container>
  )
}

export default Apr

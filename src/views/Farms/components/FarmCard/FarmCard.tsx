import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton, CardBody, CardFooter } from 'uikit'
import { Farm } from 'state/types'
import { getBscScanAddressUrl } from 'utils/bscscan'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getMasterChefAddress } from 'utils/addressHelpers'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
}

const AccentGradient = keyframes`  
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

const StyledCardAccent1 = styled.div`
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary})`};
  background-size: 400% 400%;
  animation: ${AccentGradient} 2s linear infinite;
  border-radius: 24px;
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -3px;
  left: -1px;
  filter: blur(3px);
  z-index: -1;
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${AccentGradient} 4s linear infinite;
  border-radius: 24px;
  // filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -4px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div<{ isPromotedFarm: boolean }>`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: ${({ theme, isPromotedFarm }) => (isPromotedFarm ? '28px' : theme.radii.card)};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // padding: 24px;
  position: relative;
  text-align: center;
  max-width: 352px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  displayApr: string
  removed: boolean
  cakePrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, displayApr, removed, cakePrice, account }) => {
  console.log('debug4', farm)
  const { t } = useTranslation()
  let formattedAPR
  if (displayApr) {
    const dispAPR = displayApr.replaceAll(",","")
    const formats = [
      { value: 1e3, symbol: "K" } , 
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
    ];
    let formatted = displayApr
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

  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : `$0`
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('LIME')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })

  let addLiquidityUrl
  if (farm.singleToken) {
    addLiquidityUrl =  `https://quickswap.exchange/#/swap/${farm.token.address[137]}`
  } else if (farm.exchange === 'QuickSwap') {
    addLiquidityUrl =  `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  } else if (farm.exchange === 'PolyCat') {
    addLiquidityUrl = `https://polycat.finance/add/${liquidityUrlPathParts}`
  } else {
    addLiquidityUrl = `https://polygon-exchange.jetswap.finance/#/add/${liquidityUrlPathParts}`
  }

  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const isPromotedFarm = farm.token.symbol === 'LIME'
  const depositFee = new BigNumber(farm.depositFee).div(100);
  return (
    <FCard isPromotedFarm={isPromotedFarm}>
      {isPromotedFarm && <StyledCardAccent1 />}
      <CardHeading
        lpLabel={lpLabel}
        singleToken={farm.singleToken}
        multiplier={farm.multiplier}
        isCommunityFarm={farm.isCommunity}
        token={farm.token}
        quoteToken={farm.quoteToken}
        exchange = {farm.exchange}
      />
      <CardBody>
        {!removed && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text>{t('APR')}:</Text>
            <Text bold style={{ display: 'flex', alignItems: 'center' }}>
              {farm.apr ? (
                <>
                  <ApyButton
                    pid={farm.pid}
                    lpSymbol={farm.lpSymbol}
                    multiplier={farm.multiplier}
                    lpLabel={lpLabel}
                    addLiquidityUrl={addLiquidityUrl}
                    cakePrice={cakePrice}
                    apr={farm.apr}
                    displayApr={displayApr}
                  />
                  {formattedAPR}%
                </>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          </Flex>
        )}
        <Flex justifyContent="space-between">
          <Text>{t('Earn')}:</Text>
          <Text bold>{earnLabel}</Text>
        </Flex>
        { depositFee && ( <Flex justifyContent="space-between">
          <Text>Deposit Fee:</Text>
          <Text bold>{depositFee.toNumber()}%</Text>
        </Flex>)}
        <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} />
      </CardBody>
      <CardFooter>
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
        <ExpandingWrapper expanded={showExpandableSection}>
          <DetailsSection
            removed={removed}
            bscScanAddress={getBscScanAddressUrl(getMasterChefAddress())}
            infoAddress={`https://polygonscan.com/token/${farm.singleToken ? farm.token.address[137] : lpAddress}`}
            totalValueFormatted={totalValueFormatted}
            lpLabel={lpLabel}
            addLiquidityUrl={addLiquidityUrl}
            singleToken={farm.singleToken}
          />
        </ExpandingWrapper>
      </CardFooter>
    </FCard>
  )
}

export default FarmCard

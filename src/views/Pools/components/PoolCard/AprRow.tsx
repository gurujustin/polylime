import React from 'react'
import { Flex, TooltipText, IconButton, useModal, CalculateIcon, Skeleton, useTooltip, Text } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { Pool } from 'state/types'
import { BASE_EXCHANGE_URL } from 'config'
import { getAprDatav2 } from 'views/Pools/helpers'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'

interface AprRowProps {
  pool: Pool
  stakedBalance: BigNumber
  performanceFee?: number
}

const AprRow: React.FC<AprRowProps> = ({ pool, stakedBalance, performanceFee = 0 }) => {
  const { t } = useTranslation()
  const { stakingToken, earningToken, isFinished, apr, earningTokenPrice, stakingTokenPrice, userData, isAutoVault } = pool

  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  const tooltipContent = isAutoVault
    ? t('APY includes compounding, APR doesn’t. This pool’s CHERRY is compounded automatically, so we show APY.')
    : t('This pool’s rewards aren’t compounded automatically, so we show APR')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })
  

  const { apr: earningsPercentageToDisplay, autoCompoundFrequency } = getAprDatav2(pool, performanceFee)

  const apyModalLink =
    stakingToken.address &&
    `${BASE_EXCHANGE_URL}/#/swap?outputCurrency=${stakingToken.address[process.env.REACT_APP_CHAIN_ID]}`

  const [onPresentApyModal] = useModal(
    // <ApyCalculatorModal
    //   tokenPrice={earningTokenPrice}
    //   apr={apr}
    //   linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
    //   linkHref={apyModalLink || BASE_EXCHANGE_URL}
    //   earningTokenSymbol={earningToken.symbol}
    //   roundingDecimals={roundingDecimals}
    //   compoundFrequency={compoundFrequency}
    //   performanceFee={performanceFee}
    // />,
    <RoiCalculatorModal
      earningTokenPrice={earningTokenPrice}
      stakingTokenPrice={stakingTokenPrice}
      apr={apr}
      linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink}
      stakingTokenBalance={stakedBalance.plus(stakingTokenBalance)}
      stakingTokenSymbol={stakingToken.symbol}
      earningTokenSymbol={earningToken.symbol}
      autoCompoundFrequency={autoCompoundFrequency}
      performanceFee={performanceFee}
    />,
  )

  const formats = [
    { value: 1e3, symbol: "K" } , 
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
  ];
  let formatted = earningsPercentageToDisplay?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  if (earningsPercentageToDisplay !== Infinity) {
    formats.forEach(format => {
      if(new BigNumber(earningsPercentageToDisplay).gt(format.value)){
        formatted = new BigNumber(earningsPercentageToDisplay) && new BigNumber(earningsPercentageToDisplay).div(format.value).toNumber().toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        const parts = formatted.match(/([\D]*)([\d.,]+)([\D]*)/)
        formatted=`${parts[1]}${parts[2]}${format.symbol}${parts[3]}`
      }
    });
  }

  const formattedAPR = formatted

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef}>{isAutoVault ? `${t('APY')}:` : `${t('APR')}:`}</TooltipText>
      {isFinished || !apr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          <Text>{formattedAPR}%</Text>
          {/* CountUp style */}
          {/* <Balance
            fontSize="16px"
            isDisabled={isFinished}
            value={formattedAPR}
            decimals={2}
            unit="%"
            bold
          /> */}
          <IconButton onClick={onPresentApyModal} variant="text" scale="sm">
            <CalculateIcon color="success" width="18px" />
          </IconButton>
        </Flex>
      )}
    </Flex>
  )
}

export default AprRow

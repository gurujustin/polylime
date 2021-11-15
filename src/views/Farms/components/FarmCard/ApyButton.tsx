import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon } from 'uikit'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { useTranslation } from 'contexts/Localization'
import { useFarmUser, useLpTokenPrice, useGetApiPrices } from 'state/hooks'

export interface ApyButtonProps {
  pid?: number
  lpSymbol?: string
  multiplier?: string
  lpLabel?: string
  cakePrice?: BigNumber
  apr?: number
  displayApr?: string
  addLiquidityUrl?: string
  stakingTokenAddress?: string
  singleToken?: boolean
}

const ApyButton: React.FC<ApyButtonProps> = ({ pid, lpSymbol, multiplier, lpLabel, cakePrice, apr, displayApr, addLiquidityUrl, stakingTokenAddress, singleToken }) => {
  const { t } = useTranslation()
  const prices = useGetApiPrices()
  // console.log('debug5', pid, lpSymbol, multiplier, lpLabel, cakePrice, apr, displayApr, addLiquidityUrl)
  const lpPrice = useLpTokenPrice(lpSymbol)
  const singlePrice = pid === 0 ? cakePrice : prices[stakingTokenAddress.toLocaleLowerCase('en-US')].priceUSD
  const { tokenBalance, stakedBalance } = useFarmUser(pid)
  const [onPresentApyModal] = useModal(
    // <ApyCalculatorModal
    //   linkLabel={t('Get %symbol%', { symbol: lpLabel })}
    //   tokenPrice={cakePrice.toNumber()}
    //   apr={apr}
    //   displayApr={displayApr}
    //   linkHref={addLiquidityUrl}
    //   isFarm
    // />,
    <RoiCalculatorModal
      linkLabel={t('Get %symbol%', { symbol: lpLabel })}
      stakingTokenBalance={stakedBalance.plus(tokenBalance)}
      stakingTokenSymbol={lpSymbol}
      stakingTokenPrice={singleToken ? singlePrice : lpPrice.toNumber()}
      earningTokenPrice={cakePrice.toNumber()}
      apr={apr}
      multiplier={multiplier}
      displayApr={displayApr}
      linkHref={addLiquidityUrl}
      isFarm
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <IconButton onClick={handleClickButton} variant="text" scale="sm" ml="4px">
      <CalculateIcon width="18px" color="success"/>
    </IconButton>
  )
}

export default ApyButton

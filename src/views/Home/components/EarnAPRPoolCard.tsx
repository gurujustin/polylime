import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from 'uikit'
import { ChainId } from '@pancakeswap/sdk'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { useFarms, usePriceCakeBusd, useGetApiPrices } from 'state/hooks'
import { fetchFarmsPublicDataAsync, nonArchivedFarms } from 'state/farms'
import { getFarmApr } from 'utils/apr'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'xl' })`
  line-height: 44px;
`
const EarnAPRPoolCard = () => {
  const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
  const { t } = useTranslation()
  const { data: farmsLP } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const dispatch = useAppDispatch()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const prices = useGetApiPrices()

  // Fetch farm data once to get the max APR
  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        await dispatch(fetchFarmsPublicDataAsync(nonArchivedFarms.map((nonArchivedFarm) => nonArchivedFarm.pid)))
      } finally {
        setIsFetchingFarmData(false)
      }
    }

    if (isIntersecting) {
      fetchFarmData()
    }
  }, [dispatch, setIsFetchingFarmData, isIntersecting])

  const farms = farmsLP.filter((farm) => farm.singleToken === true)
  const highestApr = useMemo(() => {
    if (cakePrice.gt(0)) {
      const aprs = farms.map((farm) => {
        // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
        if (farm.pid !== 0 && farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.quoteToken.busdPrice && prices) {

          const  price = prices[farm.quoteToken.address[137].toLocaleLowerCase('en-US')].priceUSD
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(price)
          const { cakeRewardsApr, lpRewardsApr } = getFarmApr(
            new BigNumber(farm.poolWeight),
            farm.rewardPerBlock,
            cakePrice,
            totalLiquidity,
            farm.lpAddresses[ChainId.MAINNET],
          )
          return cakeRewardsApr + lpRewardsApr
        }
        return null
      })

      const maxApr = max(aprs)
      return maxApr
    }
    return null
  }, [cakePrice, farms, prices])

  const formats = [
    { value: 1e3, symbol: "K" } , 
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
  ];
  let formatted
  formats.forEach(format => {
    if(new BigNumber(highestApr).gt(format.value)){
      formatted = new BigNumber(highestApr) && new BigNumber(highestApr).div(format.value).toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      const parts = formatted.match(/([\D]*)([\d.,]+)([\D]*)/)
      formatted=`${parts[1]}${parts[2]}${format.symbol}${parts[3]}`
    }
  });

  const formattedAPR = formatted

  const aprText = formattedAPR || '-'
  const earnAprText = t('Earn up to %highestApr% APR in Pools', { highestApr: aprText })
  const [earnUpTo, InFarms] = earnAprText.split(aprText)

  return (
    <StyledFarmStakingCard>
      <NavLink exact activeClassName="active" to="/pools" id="farm-apr-cta">
        <CardBody>
          <Heading color="text" scale="lg" mb="24px">
            {earnUpTo}
          </Heading>
          <CardMidContent color="primary" mb="8px">
            {highestApr && !isFetchingFarmData ? (
              `${aprText}%`
            ) : (
              <>
                <Skeleton animation="pulse" variant="rect" height="44px" />
                <div ref={observerRef} />
              </>
            )}
          </CardMidContent>
          <Flex justifyContent="space-between">
            <Heading color="text" scale="lg">
              {InFarms}
            </Heading>
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </NavLink>
    </StyledFarmStakingCard>
  )
}

export default EarnAPRPoolCard

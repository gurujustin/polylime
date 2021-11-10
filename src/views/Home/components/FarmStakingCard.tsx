import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Flex } from 'uikit'
import { harvestFarm } from 'utils/calls'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'
import { useMasterchef } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/2a.png');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { toastError } = useToast()
  const farmsWithBalance = useFarmsWithBalance()
  const masterChefContract = useMasterchef()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.gt(0))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of balancesWithValue) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await harvestFarm(masterChefContract, farmWithBalance.pid)
      } catch (error) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    }
    setPendingTx(false)
  }, [balancesWithValue, masterChefContract, toastError, t])

  const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
    const tokenAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: `https://polylime.finance/images/token.png`,
        },
      },
    })
  
    return tokenAdded
  }

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Farms & Staking')}
        </Heading>
        <Flex style={{verticalAlign: "center"}}>
          <CardImage src="/images/lime.png" alt="LIME logo" width={64} height={64} />
          <Button 
            variant="text"
            style={{height: 32, marginTop: 20, marginLeft: 16, backgroundColor: '#d9d7f2'}}
            onClick={() => registerToken('0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E', 'LIME', 18)}>
            +
            <img src='/images/metamask.png' alt='MetaMask Logo' style={{width: 16, height: 16, marginLeft: 4}}/>
          </Button>
        </Flex>
        <Block>
          <Label>{t('LIME to Harvest')}:</Label>
          <CakeHarvestBalance farmsWithBalance={balancesWithValue} />
        </Block>
        <Block>
          <Label>{t('LIME in Wallet')}:</Label>
          <CakeWalletBalance />
        </Block>
        <Actions>
          {account ? (
            <Flex>
              <Button
                mr="8px"
                id="harvest-all"
                disabled={balancesWithValue.length <= 0 || pendingTx}
                onClick={harvestAllFarms}
                width="100%"
              >
                {pendingTx
                  ? t('Collecting LIME')
                  : t('Harvest all (%count%)', {
                      count: balancesWithValue.length,
                    })}
              </Button>
              <Button 
                target="_blank"
                as='a' 
                href="https://quickswap.exchange/#/swap?outputCurrency=0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E" 
                width="100%"
              >
                Buy LIME
              </Button>
            </Flex>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard

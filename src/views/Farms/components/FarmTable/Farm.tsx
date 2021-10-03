import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { useFarmFromPid, useFarmUser } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text , Image} from 'uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { Token } from 'config/constants/types'
import TokenPairImage from 'components/TokenPairImage'
import { Chip } from '@material-ui/core'
import BigNumber from 'bignumber.js'

export interface FarmProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
  depositFee: string

}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 80px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ token, quoteToken, label, pid }) => {
  const { isDark } = useTheme()
  const { stakedBalance } = useFarmUser(pid)
  const farmInfo = useFarmFromPid(pid);
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Staked')}
        </Text>
      )
    }

    return null
  }
  let url
  if (farmInfo.singleToken) {
    url = token.symbol.toLocaleLowerCase('en-US') 
  } else {
    url = `${token.symbol.toLocaleLowerCase('en-US') === 'wbnb' ? 'bnb' : token.symbol.toLocaleLowerCase('en-US')}-${quoteToken.symbol.toLocaleLowerCase('en-US') === 'wbnb' ? 'bnb' : quoteToken.symbol.toLocaleLowerCase('en-US')}`
  }
  return (
    <Container>
      <TokenWrapper>
      <Image src={`/images/farms/${url}.png`} alt="Farm logo" width={80} height={55} />
      </TokenWrapper>
     <div>
        {handleRenderFarming()}
       
        <Text bold>{label}</Text>
        <Chip  style={{backgroundColor:'transparent', color:`${isDark ? '#649aeb' : '#4b45be'}`, fontWeight:'bold', border: `${isDark ? 'solid 1px #649aeb' : 'solid 1px #4b45be'}`}} label={`Deposit Fee : ${new BigNumber(farmInfo.depositFee).div(100).toNumber()}%` } />
     
      </div>
    </Container>
  )
}

export default Farm

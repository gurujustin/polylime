import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, CardHeader } from 'uikit'
import { PolyCatSwapTag, QuickSwapTag, JetSwapTag } from 'components/Tags'
import { Token } from 'config/constants/types'


export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
  singleToken?:boolean
  exchange?: string
}

const Wrapper = styled(CardHeader)`
  svg {
    margin-right: 4px;
  }
  padding: 24px;
  background: ${({ theme }) => theme.colors.gradients.inverseBubblegum};
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
`
const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`
const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm,singleToken, token, quoteToken, exchange }) => {
  let url
  if (singleToken) {
    url = token.symbol.toLocaleLowerCase('en-US') 
  } else {
    url = `${token.symbol.toLocaleLowerCase('en-US') === 'wbnb' ? 'bnb' : token.symbol.toLocaleLowerCase('en-US')}-${quoteToken.symbol.toLocaleLowerCase('en-US') === 'wbnb' ? 'bnb' : quoteToken.symbol.toLocaleLowerCase('en-US')}`
  }
  return (
    <Wrapper>
      <Flex justifyContent="space-between" alignItems="center">
        <Image src={`/images/farms/${url}.png`} alt="Farm logo" width={120} height={82} />
        {/* <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={64} height={64} /> */}
        <Flex flexDirection="column" alignItems="flex-end">
          <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
          <Flex justifyContent="center">
            {exchange === "PolyCat" ? <PolyCatSwapTag /> : null }
            {exchange === "QuickSwap" ? <QuickSwapTag /> : null }
            {exchange === "JetSwap" ? <JetSwapTag /> : null }
            <MultiplierTag variant="success">{multiplier}</MultiplierTag>
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading

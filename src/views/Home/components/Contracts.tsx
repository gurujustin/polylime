import React from 'react'
import { Card, CardBody, Heading, LinkExternal, Text } from 'uikit'
import styled from 'styled-components'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
  @media screen and (max-width: 556px) {
    display: block;
  }
`

const Contracts = () => {
  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
         Contracts
        </Heading>
        <Row>
          <Text fontSize="14px">MasterChef</Text>
          <LinkExternal href="https://polygonscan.com/address/0xfFFb1781422CC18Ab5786E3DBD55D7C91f9E5d9D#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0xfFFb1781422CC18Ab5786E3DBD55D7C91f9E5d9D</LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">PolyLime</Text>
          <LinkExternal href="https://polygonscan.com/address/0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E</LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">AutoVault</Text>
          <LinkExternal href="https://polygonscan.com/address/0xe3427702c18CB241521e255798aC570695BcecdA#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0xe3427702c18CB241521e255798aC570695BcecdA</LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">TimeLock</Text>
          <LinkExternal href="https://polygonscan.com/address/0xE027aB31Ea5568289c713EC6734b23e626ce4582#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0xE027aB31Ea5568289c713EC6734b23e626ce4582</LinkExternal>
        </Row>
        {/* <Row>
          <Text fontSize="14px">Timelock</Text>
          <LinkExternal href="https://polygonscan.com/address/0xf816863fade5c2349ba6cd0446c193d64f6004d0#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0x303EBbF881583b1ea6BcB128bD9f0cC64101075F</LinkExternal>
        </Row> */}
       
      </CardBody>
    </StyledCakeStats>
  )
}

export default Contracts

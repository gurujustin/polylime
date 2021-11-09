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
          <LinkExternal href="https://polygonscan.com/address/0x55181c30B620bbE2ac5E7f28fbB5458515DCbA05#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0x55181c30B620bbE2ac5E7f28fbB5458515DCbA05</LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">PolyLime</Text>
          <LinkExternal href="https://polygonscan.com/address/0x1345726e34e4e0Cd14Ea78f9563451d857A4b90d#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0x1345726e34e4e0Cd14Ea78f9563451d857A4b90d</LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">AutoVault</Text>
          <LinkExternal href="https://polygonscan.com/address/0xA85156010734480D3F6AEF28a462f020D8116E94#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0xA85156010734480D3F6AEF28a462f020D8116E94</LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">TimeLock</Text>
          <LinkExternal href="https://polygonscan.com/address/0xaa6Cf3Af2fdD86940452cfD1cCb34b66AA351d3e#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0xaa6Cf3Af2fdD86940452cfD1cCb34b66AA351d3e</LinkExternal>
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

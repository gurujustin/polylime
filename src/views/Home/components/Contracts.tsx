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
          <LinkExternal href="https://polygonscan.com/address/0x5DBCEC02F375Ef4885E0Af1F97b3F7adC9C0D196#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0x5DBCEC02F375Ef4885E0Af1F97b3F7adC9C0D196</LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">PolyCherry</Text>
          <LinkExternal href="https://polygonscan.com/address/0xa9446c7A92a8E95F9A7c0B97655F3e1e9ab7cbD6#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0xa9446c7A92a8E95F9A7c0B97655F3e1e9ab7cbD6</LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">AutoVault</Text>
          <LinkExternal href="https://polygonscan.com/address/0x6C8cf34d768928C29B4067946bb704eB07296Ec7#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0x6C8cf34d768928C29B4067946bb704eB07296Ec7</LinkExternal>
        </Row>
        <Row>
          <Text fontSize="14px">TimeLock</Text>
          <LinkExternal href="https://polygonscan.com/address/0x8c1528260952724ca25b13E4CbFB1D0DC04a61a8#readContract" style={{fontWeight: 500, fontSize: '14px', wordBreak: 'break-all'}}>0x8c1528260952724ca25b13E4CbFB1D0DC04a61a8</LinkExternal>
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

import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { BIG_TEN } from 'utils/bigNumber'
import Cookies from 'universal-cookie';
import rot13 from '../encode'
import { isAddress } from '../web3'

const cookies = new Cookies();
const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
  let value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  // if (pid === 0) {
  //   const tx = await masterChefContract.enterStaking(value, options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }
  let ref
  if(cookies.get('ref')) {
    if(isAddress( rot13(cookies.get('ref')) )) {
      ref = rot13(cookies.get('ref'))
    }
  } else {
    ref = "0x0000000000000000000000000000000000000000"
  }
  if (pid === 6 || pid === 8) {
    value = new BigNumber(amount).times(BIG_TEN.pow(6)).toString()
  } else if (pid === 4) {
    value = new BigNumber(amount).times(BIG_TEN.pow(8)).toString()
  }
  const tx = await masterChefContract.deposit(pid, value, ref)
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  let value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 6 || pid === 8) {
    value = new BigNumber(amount).times(BIG_TEN.pow(6)).toString()
  } else if (pid === 4) {
    value = new BigNumber(amount).times(BIG_TEN.pow(8)).toString()
  }

  const tx = await masterChefContract.withdraw(pid, value)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
  // if (pid === 0) {
  //   const tx = await await masterChefContract.leaveStaking('0', options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }
  let ref
  if(cookies.get('ref')) {
    if(isAddress( rot13(cookies.get('ref')) )) {
      ref = rot13(cookies.get('ref'))
    }
  } else {
    ref = "0x0000000000000000000000000000000000000000"
  }

  const tx = await masterChefContract.deposit(pid, '0', ref)
  const receipt = await tx.wait()
  return receipt.status
}

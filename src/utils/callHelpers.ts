import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT } from 'config';
import { ethers } from 'ethers'
import Cookies from 'universal-cookie';
import rot13 from './encode'
import { isAddress } from './web3'

const cookies = new Cookies();
const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const approve = async (lpContract, masterChefContract, account) => {
  const tx = await lpContract.approve(masterChefContract.address, ethers.constants.MaxUint256)
  const receipt = await tx.wait()
      
  return receipt.status;
  // const tx = await lpContract.approve(masterChefContract.options.address, ethers.constants.MaxUint256, options)
  // const receipt  = await tx.wait();
  // return lpContract.methods
  //   .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
  //   .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  let ref
  if(cookies.get('ref')) {
    if(isAddress( rot13(cookies.get('ref')) )) {
      ref = rot13(cookies.get('ref'))
    }
  } else {
    ref = "0x0000000000000000000000000000000000000000"
  }
  const tx = await masterChefContract.deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), ref, options)
  const receipt = await tx.wait()
  return receipt.status;
  // return masterChefContract.methods
  // .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), ref, options)
  // .send({ from: account })
  // .on('transactionHash', (tx) => {
  //   return tx.transactionHash
  //   })
}

export const sousStake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  
  const tx = await masterChefContract.withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), options)
  const receipt = await tx.wait()
  return receipt.status;
  // return masterChefContract.methods
  //   .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), options)
  //   .send({ from: account })
  //   .on('transactionHash', (tx) => {
  //     return tx.transactionHash
  //   })
}

export const sousUnstake = async (sousChefContract, amount, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmegencyUnstake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  let ref
  if(cookies.get('ref')) {
    if(isAddress( rot13(cookies.get('ref')) )) {
      ref = rot13(cookies.get('ref'))
    }
  } else {
    ref = "0x0000000000000000000000000000000000000000"
  }

  const tx = await masterChefContract.deposit(pid, '0', ref, options)
  const receipt = await tx.wait()
  return receipt.status;

  // return masterChefContract.methods
  //   .deposit(pid, '0', ref, options)
  //   .send({ from: account })
  //   .on('transactionHash', (tx) => {
  //     return tx.transactionHash
  //   })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(0) })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

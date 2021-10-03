import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.cake,
    earningToken: tokens.cake,
    contractAddress: {
      97: '',
      137: '0xd5898cA8A4bF89B3DEd3404df5B931ed0b9a443b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 1,
    isFinished: false,
  },
  {
	sousId: 1,
	stakingToken: tokens.cake,
	earningToken: tokens.usdc,
	contractAddress: {
	  97: '', // let empty
	  137: '0x38683555B7A7bA4C97204FC070bb4F1416d22dc4',
	},
	poolCategory: PoolCategory.CORE,
	harvest: true,
	tokenPerBlock: '1000000000000',
	sortOrder: 1,
	isFinished: false,
	
 },
 {
 sousId: 2,
 stakingToken: tokens.cake,
 earningToken: tokens.usdt,
 contractAddress: {
   97: '', // let empty
   137: '0x72d6eD9b7ACED3C542cba59C4970752d162a1ac5',
 },
 poolCategory: PoolCategory.CORE,
 harvest: true,
 tokenPerBlock: '0.02',
 sortOrder: 2,
 isFinished: false,
 
},
//    {
// 		sousId: 2,
// 		stakingToken: tokens.cake,
// 		earningToken: tokens.wbnb,
// 		contractAddress: {
// 		  97: '0x12a3Bd3A865D1659614356D9619C90754bD3DF1d', // let empty
// 		  137: '0x436E8C73698bC9a29E527911C8BDBAD1aFCd8E96', 
// 		},
// 		poolCategory: PoolCategory.CORE,
// 		harvest: true,

// 		tokenPerBlock: '0.00003',
// 		sortOrder: 2,
// 		isFinished: false,
		
// 	 },
// // 0x39a40aF048FcD416DFbe9bA2662d89371cC068b3
//  {
// 		sousId:5 ,
// 		stakingToken: tokens.cake,
// 		earningToken: tokens.cake,
// 		contractAddress: {
// 		  97: '0x12a3Bd3A865D1659614356D9619C90754bD3DF1d', // let empty
// 		  137: '0x39a40aF048FcD416DFbe9bA2662d89371cC068b3', 
// 		},
// 		poolCategory: PoolCategory.CORE,
// 		harvest: true,
	
// 		tokenPerBlock: '0.0006',
// 		sortOrder:6,
// 		isFinished: false,
		
// 	 },
//    {
// 		sousId: 4,
// 		stakingToken: tokens.cake,
// 		earningToken: tokens.uni,
// 		contractAddress: {
// 		  97: '0x12a3Bd3A865D1659614356D9619C90754bD3DF1d', // let empty
// 		  137: '0x8684Bf9e9Fb41E38Ef8759392525Bf33B1712Dbc', 
// 		},
// 		poolCategory: PoolCategory.CORE,
// 		harvest: true,
// 		tokenPerBlock: '0.0006',
// 		sortOrder:7,

// 		isFinished: false,
		
// 	 },
// 	 {
// 		 sousId: 10,
// 		 stakingToken: tokens.cake,
// 		 earningToken: tokens.btcb,
// 		 contractAddress:{
// 			 137:'0x6531b62af394d17ae037f1dddf69FFdF2A6Ab9B4',
// 		 }		 ,
// 		 poolCategory: PoolCategory.CORE, 
// 		 harvest:true,
// 		 tokenPerBlock:'0.0000001',
// 		 sortOrder:10,
// 	 },
// 	 {
// 		sousId: 11,
// 		stakingToken: tokens.cake,
// 		earningToken: tokens.simurgh,
// 		contractAddress:{
// 			137:'0x974a0c43aCC3E8ec5eA1785c3BF7368b7fBC1f53',
// 		}		 ,
// 		poolCategory: PoolCategory.CORE, 
// 		harvest:true,
// 		tokenPerBlock:'0.002',
// 		sortOrder:11,
// 	}
]

export default pools

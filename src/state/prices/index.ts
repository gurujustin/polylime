/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { farmsConfig, poolsConfig } from 'config/constants'
import { Token } from 'config/constants/types'
import { forEach } from 'lodash'
import { useFarms } from 'state/hooks'

import { PriceApiListThunk, PriceApiResponse, PriceApiThunk, PriceState } from 'state/types'

const initialState: PriceState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
}

// Thunks
export const fetchPrices = createAsyncThunk<PriceApiThunk>('prices/fetch', async () => {
	const listTokens : Token[]= []

	const listFarms = farmsConfig;
	const listPools = poolsConfig;
	const newDataPrices ={data:[]  as PriceApiListThunk[], updated_at: ""} as PriceApiThunk;

	for await (const p of listPools){
		const tokenExist = listTokens.includes(p.stakingToken);
		const quoteTokenExist = listTokens.includes(p.earningToken)
		if (!tokenExist) {
			listTokens.push(p.stakingToken);
		}
		if (!quoteTokenExist) {
			listTokens.push(p.earningToken);
		}
		
	  }
	  
	  for await (const f of listFarms){
		const tokenExist = listTokens.includes(f.token);
		const quoteTokenExist = listTokens.includes(f.quoteToken)
		if (!tokenExist) {
			listTokens.push(f.token);
		}
		if (!quoteTokenExist) {
			listTokens.push(f.quoteToken);
		}
		
	  }
	  for await (const token of listTokens) {
		const response = await fetch(`https://api.dex.guru/v1/tokens/${token.address[137]}-polygon`);
		const infoToken = (await response.json()) as PriceApiResponse
		console.log(infoToken)
		const newValue = {

			id: infoToken.id,
			txns24h: infoToken.txns24h,
			volume24h: infoToken.volume24h,
			volume24hUSD: infoToken.volume24hUSD,
			liquidityUSD: infoToken.liquidityUSD,
			liquidityChange24h: infoToken.liquidityChange24h,
			priceUSD: infoToken.priceUSD
		};
		const address = token.address[137].toLocaleLowerCase('en-US')
		newDataPrices.data = { ...newDataPrices.data} ;
		newDataPrices.data[address] = newValue; 
		console.log(newDataPrices.data)
	  }
	
	
	console.log({updated_at: Date.now().toString(),data: newDataPrices.data})
	return {updated_at: Date.now().toString(),...newDataPrices};
	// Return normalized token names
	
  })
 
  export const pricesSlice = createSlice({
	name: 'prices',
	initialState,
	reducers: {
	
	},
	extraReducers: (builder) => {
	  builder.addCase(fetchPrices.pending, (state) => {
		state.isLoading = true
	  })
	  builder.addCase(fetchPrices.fulfilled, (state, action: PayloadAction<PriceApiThunk>) => {
		state.isLoading = false
	
		state.data = action.payload.data
	  })
	},
  })

 
  export default pricesSlice.reducer

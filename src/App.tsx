import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from 'uikit'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollCoreFarmData, useFetchProfile, usePollBlockNumber, useFetchPriceList, useCakeVault, useFetchPool } from 'state/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import { QueryParamProvider } from 'use-query-params'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import Pools from './views/Pools'
import history from './routerHistory'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const NotFound = lazy(() => import('./views/NotFound'))
const Referral = lazy(() => import('./views/Referral'))

let didAskToJoinTelegram = false;
// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchPriceList()
  useFetchPool()
  useFetchProfile()
  usePollCoreFarmData()

  useCakeVault();


  const { toastSuccess} = useToast()
  const v = Math.random();
  if (v < 0.3 && !didAskToJoinTelegram){
    const action = {text:"Join now", url:"https://t.me/polycherryfinance"}
    toastSuccess("Have you joined our Telegram community?", "Come chat with us!", action);
  }
  didAskToJoinTelegram = true;

  return (
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms  />
            </Route>
            <Route path="/poolscherry">
              <Pools  autopool />
            </Route>
            <Route path="/pools">
              <Farms   modeSingleToken />
            </Route>
            <Route path="/dividends">
              <Pools />
            </Route>
          <Route path="/referral">
            <Referral />
          </Route>
          
            {/* Redirect */}
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
         
            

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
      </QueryParamProvider>
    </Router>
  )
}

export default React.memo(App)

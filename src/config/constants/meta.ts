import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PolyLime',
  description:
    'PolyLime - Best DEFi',
  image: 'https://polylime.finance/logo.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('PolyLime')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('PolyLime')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('PolyLime')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('PolyLime')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('PolyLime')}`,
      }
    case '/poolslime':
      return {
        title: `${t('Auto Lime')} | ${t('PolyLime')}`,
      }
    case '/dividends':
      return {
        title: `${t('Dividends')} | ${t('PolyLime')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('PolyLime')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('PolyLime')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('PolyLime')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('PolyLime')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('PolyLime')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('PolyLime')}`,
      }
    default:
      return null
  }
}

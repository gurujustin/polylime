import { MenuEntry } from 'uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  // {
  //   label: 'Layered Farming',
  //   icon: 'LayerIcon',
  //   items: [
  //     {
  //       label: 'Layer 1 - PolyWise',
  //       href: 'https://polywise.finance/',
  //     },
  //     {
  //       label: 'Layer 2 - PolyLime',
  //       href: 'https://polylime.finance/',
  //     },
  //   ],
  // },
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: "Exchange(QuickSwap)",
        href: "https://quickswap.exchange/#/swap?outputCurrency=0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E",
      },
      {
        label: "Liquidity(QuickSwap)",
        href:"https://quickswap.exchange/#/add/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E"
      },
      {
        label: "Exchange(JetSwap)",
        href: "https://polygon-exchange.jetswap.finance/#/swap?outputCurrency=0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E",
      },
      {
        label: "Liquidity(JetSwap)",
        href:"https://polygon-exchange.jetswap.finance/#/add/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E"
      },
     
    ],
  },
  {
    label: t('Farms'),
    icon: 'MountIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'FlowerIcon',
    href: '/pools',
  },
  {
    label: t('Auto Lime'),
    icon: 'IfoIcon',
    href: '/poolslime',
  },
  {
    label: t('Dividends'),
    icon: 'BondsIcon',
    href: '/dividends',
  },
  {
    label: t('Vaults'),
    icon: 'SunIcon',
    href: 'https://yieldwolf.finance/polygon/polylime',
  },
  {
    label: t('Referral'),
    icon: 'GroupsIcon',
    href: '/referral',
  },
  {
    label: 'Charts',
    icon: 'InfoIcon',
    items: [
      {
        label: 'QuickChart',
        href: 'https://quickchart.app/token/0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E',
      },
      {
        label: 'DexGuru',
        href: 'https://dex.guru/token/0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E-polygon',
      },
      {
        label: 'PolyChart',
        href: 'https://app.polychart.io/explorer/polygon/0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E',
      },
      {
        label: 'Poocoin',
        href: 'https://polygon.poocoin.app/tokens/0x95E0150D37A2b2F0D44eA0a0A0120a3Aca69a41E',
      },
    ],
  },
  {
    label: 'Listings',
    icon: 'ListingIcon',
    items: [
      {
        label: 'Dappradar',
        href: 'https://dappradar.com/polygon/defi/polylime-finance',
      },
      {
        label: 'FarmScan',
        href: 'https://polygon.farmscan.io/address/0xfFFb1781422CC18Ab5786E3DBD55D7C91f9E5d9D/',
      },
      
      {
        label: 'Ape O Clock',
        href: 'https://www.apeoclock.com/launch/polylime-farm-launch/',
      },
     
    ],
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/polylime',
      },
      {
        label: t('Docs'),
        href: 'https://docs.polylime.finance',
      },
   
     
    ],
  },
  // {
  //   label:'Audited by Quillaudits',
  //   icon:'AuditIcon',
  //   href:'https://github.com/polylime/audits'
  // }

]

export default config

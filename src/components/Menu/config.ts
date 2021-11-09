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
        label: "Exchange",
        href: "https://quickswap.exchange/#/swap?outputCurrency=0x1345726e34e4e0Cd14Ea78f9563451d857A4b90d",
      },
      {
        label: "Liquidity",
        href:"https://quickswap.exchange/#/add/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/0x1345726e34e4e0Cd14Ea78f9563451d857A4b90d"
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
  // {
  //   label: t('Dividends'),
  //   icon: 'BondsIcon',
  //   href: '/dividends',
  // },
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
        href: 'https://quickchart.app/token/0x1345726e34e4e0Cd14Ea78f9563451d857A4b90d',
      },
      {
        label: 'DexGuru',
        href: 'https://dex.guru/token/0x1345726e34e4e0Cd14Ea78f9563451d857A4b90d-polygon',
      },
      {
        label: 'PolyChart',
        href: 'https://app.polychart.io/explorer/polygon/0x1345726e34e4e0Cd14Ea78f9563451d857A4b90d',
      },
      {
        label: 'Poocoin',
        href: 'https://polygon.poocoin.app/tokens/0x1345726e34e4e0Cd14Ea78f9563451d857A4b90d',
      },
    ],
  },
  {
    label: 'Listings',
    icon: 'ListingIcon',
    items: [
      {
        label: 'Dappradar',
        href: 'https://dappradar.com/polygon/defi/polylime',
      },
      {
        label: 'PolyPup UI',
        href: 'https://ui.polypup.finance/address/0x62ba727e2449ee3be0573b4b102d7090c5977bfb',
      },
      
      {
        label: 'VFAT',
        href: 'https://vfat.tools/polygon/polylime',
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

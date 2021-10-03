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
  //       label: 'Layer 2 - PolyCherry',
  //       href: 'https://polycherry.finance/',
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
        href: "https://quickswap.exchange/#/swap?outputCurrency=0xbD01698Ab485A7b8092A4e32B9c8B1939F6D2708",
      },
      {
        label: "Liquidity",
        href:"https://quickswap.exchange/#/add/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/0xbD01698Ab485A7b8092A4e32B9c8B1939F6D2708"
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
    label: t('Auto Cherry'),
    icon: 'IfoIcon',
    href: '/poolscherry',
  },
  {
    label: t('Dividends'),
    icon: 'BondsIcon',
    href: '/dividends',
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
        href: 'https://quickchart.app/token/0x64210822e0e260E76DBA23E89F1b0b5E0A37c2b2',
      },
      {
        label: 'DexGuru',
        href: 'https://dex.guru/token/0x64210822e0e260E76DBA23E89F1b0b5E0A37c2b2-polygon',
      },
      {
        label: 'PolyChart',
        href: 'https://app.polychart.io/explorer/polygon/0x64210822e0e260E76DBA23E89F1b0b5E0A37c2b2',
      },
      {
        label: 'Poocoin',
        href: 'https://polygon.poocoin.app/tokens/0x64210822e0e260E76DBA23E89F1b0b5E0A37c2b2',
      },
    ],
  },
  {
    label: 'Listings',
    icon: 'ListingIcon',
    items: [
      {
        label: 'Dappradar',
        href: 'https://dappradar.com/polygon/defi/polycherry',
      },
      {
        label: 'PolyPup UI',
        href: 'https://ui.polypup.finance/address/0x62ba727e2449ee3be0573b4b102d7090c5977bfb',
      },
      
      {
        label: 'VFAT',
        href: 'https://vfat.tools/polygon/polycherry',
      },
     
    ],
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/',
      },
      {
        label: t('Docs'),
        href: 'https://docs.polycherry.com',
      },
   
     
    ],
  },
  // {
  //   label:'Audited by Quillaudits',
  //   icon:'AuditIcon',
  //   href:'https://github.com/polycherry/audits'
  // }

]

export default config

import _ from 'lodash'
import { TestUser } from '../support/TestUser.js'

const deps = {}
const alice = new TestUser({}, deps)
const pages = [
  'https://www.binance.com/en/trade/BNB_BUSD',
  'https://ftx.com/trade/BTC-PERP', // all FTX perps, actually
]

beforeEach(async function () {

})

xtest.each(pages)('Alice doesn\'t see a sell button on a test page', async function (page) {
  // TODO: test using page snapshots
  /**
   * Alice doesn't see a "Sell" button
   * Alice sees a "Chat with friends" button (in blue color)
   * Alice sees "ShortLock saved you money? _Share it_." text
   */
})

xtest('Alice clicks "Chat with friends" button', async function (page) {
  /**
   * Alice sees a taplink.cc page with links to Reddit, Telegram, Twitter, other platforms
   */
})

xtest('Alice clicks "Share" link', async function (page) {
  /**
   * Alice sees multiple logos of social networks
   * Alice clicks on a social network logo to share the ShortLock extension
   */
})

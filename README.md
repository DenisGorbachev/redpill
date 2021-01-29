# Redpill

🛡 Redpill prevents you from accidentally shorting Crypto against USD 🛡

**The money is losing its meaning.** Federal Reserve is inflating US Dollar by printing extra supply every year. It's time to rise against the system and choose crypto instead of manipulated fiat.

However, crypto exchanges still have a "Sell" button, which makes it easy to trade away your chance to financial freedom. We don't blame them - it is their obligation to give the choice to the user. However, while the fiat-based financial system continues to deteriorate, it's necessary to **protect ourselves from our own emotions.**

Here, install this extension to replace the "Sell" button with "Chat with friends" button, which gives you access to a welcoming community of crypto enthusiasts.

Note that **you can still sell altcoins for BTC / ETH easily** - the extension doesn't remove the "Sell" buttons on crypto-to-crypto markets, only on crypto-to-fiat markets (including fiat-tethered stablecoins).

## Instructions

### Install

* Clone this repository.
* [Install Yarn](https://classic.yarnpkg.com/en/docs/install)
  * [Install Bash Completions for Yarn](https://github.com/dsifford/yarn-completion)
* Run `yarn install`

### Run

* Run `yarn start`
* Open [chrome://extensions](chrome://extensions)
* Enable **Developer mode**
* Click **Load unpacked extension**
* Select `/build` folder

NOTE: The extension code will auto-reload when you make changes in `/src`.

### Read the code

1. Read `src/pages/content.js`
  1. This code is executed when the user opens a new page.

### Debug

1. Use [rxjs-spy](https://github.com/cartant/rxjs-spy) (already installed)

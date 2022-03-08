# BattleZips Frontend

<div style="align-items: center; display: flex;">
  <img width="460" height="460" src="battlezips.png">
  <img width="200" height="200" style="margin-left: 24px" src="qr-code.png">
</div>

## Background

This is the frontend implementation of the BattleZips protocol which debuted at Eth Denver 2022. This is still a WIP and will have a hosted version soon that will be linked here.

### BattleZips Repos

Subgraph: https://github.com/Ian-Bright/battlezip-subgraph  
Contracts: https://github.com/jp4g/BattleZips

### Supported Networks

* Goerli
* Mumbai
* Polygon

## Video Walkthrough
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/FBux07B76SQ/0.jpg)](https://www.youtube.com/watch?v=FBux07B76SQ)

## Setup

1. Clone repo
```
git clone git@github.com:Ian-Bright/battlezip-frontend.git
```

2. Install dependenices with yarn or npm install
```
yarn
---
npm install
```

3. Add .env file and add the following lines:

 ```
 REACT_APP_BATTLESHIP_GAME_CONTRACT_GOERLI=0x75649E85EeA2b90fdcDF40DA18f38b3FCecB83A5
 REACT_APP_BATTLESHIP_GAME_CONTRACT_MUMBAI=0xfD38c8C8dC0d56230A19013B3b213E0f823d2Df7
 REACT_APP_BATTLESHIP_GAME_CONTRACT_POLYGON=0xfaf0eD1F58132C88279dBB24C33787eAFc365DfD
 ```
 
 4. Start app

```
yarn start
---
npm start
```


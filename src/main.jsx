import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store';
import { Provider } from "react-redux";
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { getDefaultProvider } from 'ethers';
import { mainnet, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected'

// QuickNode API：Provider
const quickNodeApiKey = 'YOUR_QUICKNODE_API_KEY';

// Configure Chain & Provider
const { chains, provider } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: quickNodeApiKey }),
    publicProvider()
  ]
)

// Create Wagmi Config
const config = createConfig({
  autoConnect: true,
  provider,
  connectors: [new InjectedConnector({ chains })],
  WebSocketProvider: getDefaultProvider(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={config} >
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
  </React.StrictMode>,
)

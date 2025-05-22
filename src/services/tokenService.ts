import { Token } from '../types';

import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo  
} from '@funkit/api-base'

const funApiKey = process.env.REACT_APP_FUN_API_KEY || '';

export const tokenList: Token[] = [
  { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin', chainId: '1' },
  { id: 'tether', symbol: 'USDT', name: 'Tether', chainId: '137' },  
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', chainId: '8453' },
  { id: 'wrapped-bitcoin', symbol: 'WBTC', name: 'Wrapped Bitcoin', chainId: '1' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', chainId: '1' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', chainId: '1' },    
];


// Get the price of a token from the funkit API
export const getTokenPrice = async (token: Token): Promise<number> => {
  try {
    // Get the token info
    const tokenInfo = await getAssetErc20ByChainAndSymbol({
        chainId: token.chainId,
        symbol: token.symbol,
        apiKey: funApiKey
    });
    
    // Get the price info
    const priceInfo = await getAssetPriceInfo({
        chainId: token.chainId,
        assetTokenAddress: tokenInfo.address,
        apiKey: funApiKey
    })

    // Return the price info
    return priceInfo.unitPrice;
  } catch (error) {
    console.error('Error fetching token info:', error);
    return 0;
  }
}
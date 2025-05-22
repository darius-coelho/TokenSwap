import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  SelectChangeEvent,
  ThemeProvider,
  createTheme,
  debounce,
  CircularProgress,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Token } from '../types';
import { tokenList, getTokenPrice } from '../services/tokenService';
import TokenSelector from './TokenSelector';
import UsdInput from './UsdInput';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#1a1a1a',
      default: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
});

const TokenSwap: React.FC = () => {
  const [usdAmount, setUsdAmount] = useState<string>('100');
  const [sourceToken, setSourceToken] = useState<Token>(tokenList[0]);
  const [targetToken, setTargetToken] = useState<Token>(tokenList[1]);
  const [sourceTokenPrice, setSourceTokenPrice] = useState<number>(0);
  const [targetTokenPrice, setTargetTokenPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Fetch prices from the server and update the state
  const fetchPrices = async () => {
    setLoading(true);
    const [sourcePrice, targetPrice] = await Promise.all([
      getTokenPrice(sourceToken),
      getTokenPrice(targetToken),
    ]);
    
    setSourceTokenPrice(sourcePrice);
    setTargetTokenPrice(targetPrice);
    
    setLoading(false);
  };

  // Fetch prices every 10 seconds and when the source or target token changes
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, [sourceToken, targetToken]);

  // Swap the source and target tokens
  const swapTokens = () => {
    const temp = sourceToken;
    setSourceToken(targetToken);
    setTargetToken(temp);
  }

  // Handle source token change
  const handleSourceTokenChange = (event: SelectChangeEvent<string>) => {
    const selected = tokenList.find(token => token.id === event.target.value);
    if(selected) {
      // If the selected token is the same as the target token, swap the tokens
      if (selected.id === targetToken.id) {
        swapTokens();
      }
      else {
        setSourceToken(selected);
      }
    }
  };

  // Handle target token change
  const handleTargetTokenChange = (event: SelectChangeEvent<string>) => {
    const selected = tokenList.find(token => token.id === event.target.value);
    if(selected){
      // If the selected token is the same as the source token, swap the tokens 
      if (selected.id === sourceToken.id) {
        swapTokens();
      }
      else {
        setTargetToken(selected);
      }
    }
  };

  // Handle USD amount change
  const handleUsdAmountChange = (value: string) => {    
    setUsdAmount(value);
  };

  // Only provide token amounts if the USD amount is valid
  const isUsdInvalid = !usdAmount || isNaN(Number(usdAmount)) || Number(usdAmount) < 0;
  const sourceAmount = isUsdInvalid ? '' : (parseFloat(usdAmount) / sourceTokenPrice).toFixed(6);
  const targetAmount = isUsdInvalid ? '' : (parseFloat(usdAmount) / targetTokenPrice).toFixed(6);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5,
            mt: 4,
            backgroundColor: 'background.paper',
            border: '1px solid #333',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mb: 6 }}>
            Token Swap
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
            <UsdInput
              value={usdAmount}
              onChange={handleUsdAmountChange}
            />

            <Box sx={{ borderBottom: '1px solid #333', mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0}}>
              <TokenSelector
                token={sourceToken}
                amount={sourceAmount}
                price={sourceTokenPrice}
                tokens={tokenList}
                readOnly={true}
                onTokenChange={handleSourceTokenChange}
                label={`From`}
              />

              <Box sx={{ display: 'flex', justifyContent: 'center', pt:1, pb: 2 }}>
                <SwapVertIcon sx={{ color: 'text.secondary', fontSize: 32 }} />
              </Box>

              <TokenSelector
                token={targetToken}
                amount={targetAmount}
                price={targetTokenPrice}
                tokens={tokenList}
                readOnly={true}
                onTokenChange={handleTargetTokenChange}
                label={`To`}
              />
            </Box>
          </Box>
          {loading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
              <CircularProgress color="primary" size={24} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Getting latest price
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default TokenSwap;
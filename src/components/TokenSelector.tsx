import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { Token } from '../types';

interface TokenSelectorProps {
  token: Token;
  amount: string;
  price: number;
  tokens: Token[];
  readOnly?: boolean;
  onTokenChange: (event: SelectChangeEvent<string>) => void;
  label: string;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  token,
  amount,
  price,
  tokens,
  readOnly = false,
  onTokenChange,
  label,
}) => {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, ml: 0.5 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <Select
          fullWidth
          value={token.id}
          onChange={onTokenChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#333',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#444',
            },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0,
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxWidth: 220,
              },
            },
          }}
        >
          {tokens.map((t) => (
            <MenuItem key={t.id} value={t.id} sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              minWidth: 0,
              maxWidth: 200,
            }}>
              {t.symbol} ({t.name})
            </MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          label={token.symbol}
          type="number"
          value={amount}
          InputProps={{
            readOnly,
            sx: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              minWidth: 0,
            }
          }}
          sx={{ 
            bgcolor: readOnly ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#333',
              },
            }           
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1, mt: 1 }}>
        Current price: ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
      </Typography>
    </Box>
  );
};

export default TokenSelector; 
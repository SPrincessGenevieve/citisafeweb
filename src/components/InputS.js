import React from 'react';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#486EF5',
            '--TextField-brandBorderHoverColor': '#486EF5',
            '--TextField-brandBorderFocusedColor': '#486EF5',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInputBase: { 
        styleOverrides: {
          input: {
            color: 'black', 
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&:before, &:after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });
  
function InputS({label, value, marginTop, width}) {
    const outerTheme = useTheme();



    return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr', // Single column by default
            gap: 2,
            marginTop: marginTop,
            '@media (min-width: 600px)': {
              // Adjust the breakpoint as needed
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Responsive grid with minimum 200px column width
            },
          }}
        >
          <ThemeProvider theme={customTheme(outerTheme)}>
              <TextField
                value={value}
                style={{ color: 'black', width: width }}
                focused
                label={label}
              />

          </ThemeProvider>
        </Box>
    );
  }
export default InputS;
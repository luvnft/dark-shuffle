import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { AnimatePresence } from "framer-motion"

import Box from '@mui/material/Box';
import { SnackbarProvider } from 'notistack';
import Header from "./components/header";
import { BattleProvider } from "./contexts/battleContext";
import { DojoProvider } from "./contexts/dojoContext";
import { DraftProvider } from "./contexts/draftContext";
import { GameProvider } from "./contexts/gameContext";
import { routes } from './helpers/routes';
import { mainTheme } from './helpers/themes';

import { StarknetProvider } from "./contexts/starknet";
import { AnimationHandler } from "./contexts/animationHandler";
import { useState } from 'react';
import { AccountProvider } from './contexts/accountContext';

function Main() {
  const [connectWallet, showConnectWallet] = useState(false)

  return (
    <BrowserRouter>
      <Box className='bgImage'>
        <Box className='background'>
          <StyledEngineProvider injectFirst>

            <ThemeProvider theme={mainTheme}>
              <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} preventDuplicate>
                <AnimationHandler>

                  <StarknetProvider>
                    <AccountProvider>
                      <DojoProvider showConnectWallet={showConnectWallet}>
                        <GameProvider>
                          <DraftProvider>
                            <BattleProvider>

                              <Box className='main'>
                                <Header connectWallet={connectWallet} showConnectWallet={showConnectWallet} />
                                
                                <AnimatePresence mode="wait">

                                  <Routes>
                                    {routes.map((route, index) => {
                                      return <Route key={index} path={route.path} element={route.content} />
                                    })}
                                  </Routes>

                                </AnimatePresence>
                              </Box>

                            </BattleProvider>
                          </DraftProvider>
                        </GameProvider>
                      </DojoProvider>
                    </AccountProvider>
                  </StarknetProvider>

                </AnimationHandler>
              </SnackbarProvider>
            </ThemeProvider>

          </StyledEngineProvider>
        </Box>
      </Box>
    </BrowserRouter >
  );
}

export default Main

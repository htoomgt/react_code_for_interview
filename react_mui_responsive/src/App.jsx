/* eslint-disable react/no-unescaped-entities */
import "./App.css";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";
import RightBar from "./components/RightBar";
import { Box, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import Add from "./components/Add";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
    const [mode, setMode] = useState("light");

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <NavBar />
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                >
                    <SideBar setMode={setMode} mode={mode} />
                    <Feed />
                    <RightBar />
                </Stack>
                <Add />
            </Box>
        </ThemeProvider>
    );
}

export default App;

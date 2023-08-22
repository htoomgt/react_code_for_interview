import { Box, Typography } from "@mui/material";

const RightBar = () => {
    return (
        <Box
            bgcolor="lightcoral"
            flex={2}
            p={2}
            sx={{ display: { xs: "none", sm: "block" } }}
        >
            <Box position="fixed">
                <Typography variants="h6" fontWeight={100}>
                    Online Friends
                </Typography>
            </Box>
        </Box>
    );
};

export default RightBar;

import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

function LoginPage() {
  const theme = useTheme();
  const isNoneMobleScreen = useMediaQuery("(min-width: 1000px");
  return (
    <Box>
      <Box
        width={"100%"}
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign={"center"}
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          FarmSocial
        </Typography>
      </Box>
      <Box
        width={isNoneMobleScreen ? "50%" : "95%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight={500} variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to FarmSocial, the social for farm path
        </Typography>
        <Form></Form>
      </Box>
    </Box>
  );
}

export default LoginPage;

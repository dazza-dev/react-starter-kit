import iconGoogle from "@/assets/images/icons/icon-google.svg";
import iconFacebook from "@/assets/images/icons/icon-facebook.svg";
import CustomSocialButton from "@/core/components/forms/CustomSocialButton";
import { Avatar, Box, Stack } from "@mui/material";
import type { signInType } from "@/modules/auth/types/auth";

const AuthSocialButtons = ({ title }: signInType) => (
  <>
    <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
      <CustomSocialButton>
        <Avatar
          src={iconGoogle}
          alt={iconGoogle}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            whiteSpace: "nowrap",
            mr: { sm: "3px" },
          }}
        >
          {title}{" "}
        </Box>{" "}
        Google
      </CustomSocialButton>
      <CustomSocialButton>
        <Avatar
          src={iconFacebook}
          alt={iconFacebook}
          sx={{
            width: 25,
            height: 25,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            whiteSpace: "nowrap",
            mr: { sm: "3px" },
          }}
        >
          {title}{" "}
        </Box>{" "}
        FB
      </CustomSocialButton>
    </Stack>
  </>
);

export default AuthSocialButtons;

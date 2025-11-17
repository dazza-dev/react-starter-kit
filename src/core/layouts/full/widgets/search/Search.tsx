import { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  Stack,
  Divider,
  TextField,
} from "@mui/material";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const Search = () => {
  const [showDrawer2, setShowDrawer2] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };

  return (
    <>
      <IconButton
        aria-label="search"
        color="inherit"
        aria-controls="search-menu"
        aria-haspopup="true"
        onClick={() => setShowDrawer2(true)}
        size="large"
      >
        <IconSearch size="16" />
      </IconButton>
      <Dialog
        open={showDrawer2}
        onClose={() => setShowDrawer2(false)}
        fullWidth
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { position: "fixed", top: 30, m: 0 } }}
      >
        <DialogContent className="search-dialog">
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              id="tb-search"
              placeholder={t("common:search.placeholder")}
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                htmlInput: { "aria-label": t("common:search.ariaLabel") },
              }}
            />
            <IconButton size="small" onClick={handleDrawerClose2}>
              <IconX size="18" />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 2 }} />
          {search && (
            <p className="search-results-for">
              {t("common:search.resultsFor")} {search}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Search;

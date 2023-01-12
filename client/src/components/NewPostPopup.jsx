import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  Button,
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import { NotInterested } from "@mui/icons-material";
import { setPosts } from "state";
import { Close } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const bgPalettes = [
  {
    id: "bg0",
    name: "bg0",
    style: "",
  },
  {
    id: "bg1",
    name: "bg1",
    style: "linear-gradient(to right, #ee9ca7, #ffdde1);",
  },
  {
    id: "bg2",
    name: "bg2",
    style: "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d); ",
  },
  {
    id: "bg3",
    name: "bg3",
    style: "linear-gradient(to right, #654ea3, #eaafc8); ",
  },
  {
    id: "bg4",
    name: "bg4",
    style: "linear-gradient(to right, #076585, #fff);",
  },
  {
    id: "bg5",
    name: "bg5",
    style: "linear-gradient(to right, #536976, #292e49);",
  },
  {
    id: "bg6",
    name: "bg6",
    style: "linear-gradient(to right, #1f1c2c, #928dab); ",
  },
  {
    id: "bg7",
    name: "bg7",
    style: "linear-gradient(to right, #1cd8d2, #93edc7); ",
  },
];

const NewPostPopup = ({ isOpen, close }) => {
  const [description, setDesctiption] = useState("");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const selectedPrimary = palette.primary.main;
  const [isShowBackgroundControl, setIsShowBackgroundcontrol] = useState(true);
  const [selectedBg, setSelectedBg] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef && isOpen) inputRef?.current?.focus();
  }, [selectedBg, isOpen]);
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", description);
    if (selectedBg?.style)
      formData.append("backgroundStyle", selectedBg?.style);
    const resp = await fetch(`http://localhost:3001/posts`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const posts = await resp.json();
    console.log("setPost", posts);
    dispatch(setPosts({ posts }));
    setSelectedBg(null);
    setDesctiption("");
    handleClose();
  };
  const handleClose = () => {
    setDesctiption("");
    setSelectedBg(null);
    close();
  };
  return (
    <Dialog
      open={isOpen}
      sx={{ ".MuiPaper-root": { width: "80%", borderRadius: "0.75rem" } }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        Create new post
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: "1rem 0.5rem" }}>
        <Box
          sx={{
            backgroundImage: selectedBg ? selectedBg.style : "unset",
            borderRadius: selectedBg ? "0.5rem" : "0",
            alignItems: selectedBg ? "center" : "flex-start",
            mb: "1rem",
            p: "1rem",
          }}
        >
          <Box
            sx={{
              zIndex: 1,
              position: "relative",
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
              minHeight: selectedBg ? "300px" : "unset",
            }}
          >
            <div
              style={{
                outline: "none",
                border: "none",
                wordBreak: "break-word",
                zIndex: 1,
                position: "relative",
                width: "100%",
                textAlign: selectedBg ? "center" : "left",
              }}
              contentEditable={true}
              ref={inputRef}
              onInput={(e) => {
                setDesctiption(e.target.innerText);
              }}
            ></div>
            {!description ? (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  fontSize: "1.5rem",
                  opacity: selectedBg ? "1" : "0.7",
                }}
              >
                {`${user.firstName} ơi, bạn đang nghĩ gì thế?`}
              </Box>
            ) : null}
          </Box>
        </Box>
        <FlexBetween>
          {isShowBackgroundControl ? (
            <Box
              sx={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                border: "2px solid #ccc",
                borderRadius: "0.75rem",
                backgroundImage:
                  "linear-gradient(to bottom right, #ff000043,purple,#dc930c)",
              }}
              onClick={() =>
                setIsShowBackgroundcontrol(!isShowBackgroundControl)
              }
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {bgPalettes.map((b, k) =>
                k === 0 ? (
                  <Box
                    sx={{
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                      border: "2px solid #ccc",
                      borderRadius: "0.75rem",
                      backgroundImage: b.style,
                      transition: "all 0.5s",
                      borderColor:
                        selectedBg && selectedBg.id === b.id
                          ? selectedPrimary
                          : "#ccc",
                    }}
                    key={b.id}
                    onClick={() => setSelectedBg(null)}
                  >
                    <IconButton>
                      <NotInterested />
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                      border: "2px solid #ccc",
                      borderRadius: "0.75rem",
                      backgroundImage: b.style,
                      transition: "all 0.5s",
                      borderColor:
                        selectedBg && selectedBg.id === b.id
                          ? selectedPrimary
                          : "#ccc",
                    }}
                    key={b.id}
                    onClick={() => setSelectedBg(b)}
                  />
                )
              )}
            </Box>
          )}
        </FlexBetween>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ width: "100%", color: "#fff" }}
          onClick={handlePost}
          disabled={!description}
          size="large"
        >
          Create post
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewPostPopup;

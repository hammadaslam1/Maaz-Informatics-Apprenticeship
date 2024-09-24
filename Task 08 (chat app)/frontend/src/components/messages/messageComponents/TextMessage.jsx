import { Box, Typography } from "@mui/material";
import { formatDate } from "../../../utils/CommonUtils";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';
import { useSelector } from "react-redux";
const TextMessage = ({ message }) => {
  const { selectedUser } = useSelector(state => state.conversation)
  const status = message?.status
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px 5px 2px 15px' }}>
      <Typography sx={{ fontSize: "14px" }}>
        {message?.text}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
        {selectedUser?._id !== message.senderId &&
          <>
            {status === 'sent' ? <DoneIcon fontSize="xs" color="disabled" />
              : status === 'delivered' ? <DoneAllIcon fontSize="xs" color="disabled" />
                : status === 'seen' ? <DoneAllIcon fontSize="xs" color="primary" />
                  : <ErrorIcon fontSize="xs" color="error" />}
          </>
        }
        <Typography
          sx={{
            fontSize: "10px",
            color: "#919191",
            marginTop: "6px",
            wordBreak: "keep-all",
            marginRight: '5px'
          }}
        >
          {formatDate(message?.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
};

export default TextMessage;

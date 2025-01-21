
import { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  Grid,
  Divider,
  TextField,
  InputBase
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {topUp} from 'src/actions/paymentAction';

function TopUp() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.setting.language);
  const [isOpen, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAmount(0);
  };

  const ButtonContent = (lang) => {
    switch (lang) {
      case "en":
        return (
          <>
            <span style={{ color: '#EA0004' }}>$0.10</span>&nbsp;
            <span>left <br /> Please Top up</span>
          </>
        )
      case "cn":
        return (
          <>
            <span>剩余</span>&nbsp;
            <span style={{ color: '#EA0004' }}>$0.10</span><br />
            <span>请充值</span>
          </>
        )
      case "hk":
        return (
          <>
            <span>剩餘</span>&nbsp;
            <span style={{ color: '#EA0004' }}>$0.10</span><br />
            <span>請充值</span>
          </>
        )
      case "ja":
        return (
          <>
            <span>残高</span>&nbsp;
            <span style={{ color: '#EA0004' }}>$0.10</span><br />
            <span>チャージ</span>
          </>
        )
      default:
        return (
          <>
            <span style={{ color: '#EA0004' }}>$0.10</span>&nbsp;
            <span>left <br /> Please Top up</span>
          </>
        )

    }
  };

  const amountHandle = (event) => {
    setAmount(event.target.value);
  }

  const handlePayment = async () => {
    console.log(parseFloat(amount).toFixed(2).toString()); // "10.00"
    if(amount > 0){
      dispatch(topUp((parseFloat(amount)).toString()));
    }
  };

  return (
    <>
      <Button
        sx={{
          display: 'block',
          color: '#265A9E',
          lineHeight: '18px',
          fontSize: {
            xs: 12,
            md: 14,
          },
          ml: {
            xs: '0px',
            md: '20px',
          },
          padding: {
            xs: '0px 0px 0px 0px !important',
            md: '7px 10px !important',
          },
          borderRadius: '20px',
          border: {
            xs: 'none',
            md: '2px solid #378DFD',
          }
        }}
        ref={ref}
        onClick={handleOpen}
      >
        {ButtonContent(currentLang)}
      </Button>

      <Dialog
        maxWidth='xs'
        sx={{
          borderRadius: '0px !important',
        }}
        onClose={handleClose} open={isOpen}>
        <DialogContent
          sx={{
            background: 'white',
            padding: 3,
            color: 'black',
          }}>
          <Typography color="black" fontSize={18} fontWeight={700} variant="subtitle1" mb={1}>
            {t('pamentOptions')}
          </Typography>
          <Box sx={{
            display: "flex",
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
            <Box sx={{ width: "50%" }}>
              <Typography>
                <b>{t('spend')}:</b> &nbsp;$2
              </Typography>
            </Box>
            <Box sx={{ width: "50%", display: 'flex', alignItems: 'center' }}>
              <Typography>
                <b>{t('get')}:</b> &nbsp;$
              </Typography>
              <InputBase
                sx={{
                  flex: 1,
                  ml: "3px",
                  color: 'black',
                  border: "1px solid black",
                  width: 50,
                  padding: "0px 10px",
                  '& input[type=number]': {
                    MozAppearance: "textfield", // For Firefox
                    WebkitAppearance: "none", // For Chrome, Safari, and Edge
                    appearance: "none", // Standard
                  },
                }}
                inputProps={{
                  min: 0,
                }}
                type="number"
                value={amount}
                onChange={amountHandle}
              />
            </Box>
          </Box>

          {/* Top Up Button */}
          <Button
            variant="outlined"
            sx={{
              marginY: 1,
              borderRadius: 20,
              padding: '2px 20px',
              border: '1px solid black',
              fontSize: 14,
              textTransform: "none"
            }}
            onClick={handlePayment}
          >
            {t('topUp')}
          </Button>

          {/* Discount Credits Section */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography>
              <b>{t('discountCredits')}:</b> 2
            </Typography>
            <Button
              variant="outlined"
              sx={{
                ml: 4,
                borderRadius: 20,
                padding: '2px 20px',
                border: '1px solid #F79E1B',
                fontSize: 14,
                color: '#F79E1B',
                textTransform: "none"
              }}
            >
              {t('use60Off')}
            </Button>
          </Box>

          <Divider sx={{ marginY: 1 }} />

          <Typography fontWeight={700} fontSize={14} sx={{ mb: 1, color: '#265A9E' }} >
            {t('inviteFriendOff')}
          </Typography>
          <Box
            component="img"
            src="/static/images/payment.png" // Replace with your image URL
            alt="payment"
            sx={{
              width: "100%", // Adjust as needed
              maxWidth: "300px",
              height: "auto", // Maintain aspect ratio
              borderRadius: "8px", // Add rounded corners
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TopUp;

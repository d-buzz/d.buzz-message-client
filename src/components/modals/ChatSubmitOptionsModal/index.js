import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    useMediaQuery
} from "@material-ui/core";
import {
    TextFieldWithIcon,
    HiveIcon,
    DialogTitle,
    SelectTextField,
    ContainedButton
} from "./../../elements";
import { useTheme } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import config from "./../../../config";
import { sendMessageRequest } from "./../../../store/chat/actions";
import moment from "moment";

const assets = [
    {
        value: 'HIVE',
        label: 'HIVE',
    },
    {
        value: 'HBD',
        label: 'HBD',
    },
];

const minAmount = parseFloat(config.MIN_AMOUNT);
const defaultAsset = config.DEFAULT_ASSET;

const ChatSubmitOptionsModal = (props) => {
    const {
        open,
        user,
        selectedContact,
        handleClose,
        message,
        handleChangeMessage,
        sendMessageRequest,
        clearChatBox
    } = props
    const [isEncrypted, setIsEncrypted] = useState(true)
    const [currency, setCurrency] = useState(defaultAsset);
    const [amount, setAmount] = useState(minAmount)
    const [isAmountTouched, setIsAmountTouched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { username } = user
    const { username: main_user } = selectedContact

    const handleChangeAsset = (e) => {
        setCurrency(e.target.value);
    };

    const handleClickCheckbox = (e) => {
        const { target } = e
        const { name, checked } = target
        if (name === 'encrypt') {
            setIsEncrypted(checked)
        }
    }
    const handleInputChange = (e) => {
        const { target } = e;
        const { id, value } = target;
        if (id === "amount") {
            setAmount(value)
            if (!value) {
                setIsAmountTouched(true)
            } else {
                if (parseFloat(value) >= minAmount) {
                    setDisabled(false)
                } else {
                    setDisabled(true)
                }
            }
        }
    }

    const FormSpacer = () => {
        return (
            <div style={{ height: 15, width: '100%' }}></div>
        )
    }

    const handleClickClose = () => {
        handleClearInput()
        handleClose()
        clearChatBox()
    }

    const handleClearInput = () => {
        setCurrency(defaultAsset)
        setAmount(minAmount)
        setIsEncrypted(true)
        setIsAmountTouched(false)
    }

    const handleSubmitMessage = () => {
        setLoading(true)
        const trimmedMsg = message.trim()
        let date = moment().utc().format()
        date = `${date}`.replace('Z', '')
        const params = {
            message: trimmedMsg,
            decoded: isEncrypted ? `# ${trimmedMsg}` : trimmedMsg,
            from: username,
            to: main_user,
            use_encrypt: isEncrypted ? 1 : 0,
            amount,
            asset: currency,
            trx_id: `temp__${Math.random()}`,
            time: date,
            number: 0
        }
        sendMessageRequest(params).then((res) => {
            setLoading(false)
            if (res) {
                handleClickClose()
            }
        })
    }

    return (
        <React.Fragment>
            <Dialog fullScreen={fullScreen} maxWidth={"xs"} open={open}>
                <DialogTitle id="form-dialog-title" onClose={handleClickClose}>Chat Message Options</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To proceed, please fill up the following.
                    </DialogContentText>
                    <TextFieldWithIcon
                        id="message"
                        label="Message"
                        placeholder="Please enter message"
                        value={message}
                        icon={<MailOutlineIcon />}
                        onChange={handleChangeMessage}
                        required
                        multiline
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isEncrypted}
                                name="encrypt"
                                onChange={handleClickCheckbox}
                            />}
                        label="Encrypt message?"
                    />
                    <TextFieldWithIcon
                        id="amount"
                        label="Amount"
                        placeholder="Please enter amount"
                        value={amount}
                        icon={<HiveIcon />}
                        type="number"
                        onChange={handleInputChange}
                        otherInputProps={{
                            endAdornment: (
                                <InputAdornment position="end">{currency}</InputAdornment>
                            ),
                        }}
                        required
                        fullWidth
                        autoFocus
                        error={isAmountTouched && !amount}
                        helperText={isAmountTouched && !amount ? "Amount is required" : "Minimum amount is 0.001 HIVE/HBD"}

                    />
                    <FormSpacer />
                    <SelectTextField
                        value={currency}
                        label="Asset"
                        options={assets}
                        handleChange={handleChangeAsset}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose} color="primary">
                        Cancel
                    </Button>
                    <ContainedButton
                        type="button"
                        color="secondary"
                        label="Proceed"
                        onClick={handleSubmitMessage}
                        fullWidth
                        disabled={disabled}
                        loading={loading}
                        loadType="circular"
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.get('user'),
    selectedContact: state.chat.get('selectedContact')
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {
            sendMessageRequest
        },
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatSubmitOptionsModal);

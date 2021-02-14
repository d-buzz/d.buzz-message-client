import React, { Fragment, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { useHistory } from 'react-router-dom'
import { Icon, IconButton, withStyles, TextField, CircularProgress } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { searchAccountRequest, updateChatsData, clearSearchResult } from "./../../../store/chat/actions";
import { broadcastNotification, setSearchBoxStatus } from "./../../../store/interfaces/actions";
import { pending } from 'redux-saga-thunk'
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.main
    }
});

const SearchBox = (props) => {
    const {
        classes,
        searchResults = [],
        searchAccountRequest,
        broadcastNotification,
        loading,
        chatUsersList,
        updateChatsData,
        user,
        clearSearchResult,
        searchBoxStatus,
        setSearchBoxStatus
    } = props
    const { username } = user
    const [searchkey, setSearchkey] = useState("")
    const [openOptions, setOpenOptions] = useState(false)
    const history = useHistory()

    const handleChangeInput = (e) => {
        const { target } = e;
        const { id, value } = target;
        if (id === "searchkey") {
            setSearchkey(value)
        }
    }

    const toggle = () => {
        setSearchBoxStatus(!searchBoxStatus)
    }

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.charCode === 13) {
            e.preventDefault()
            const { target } = e
            if (target.value) {
                const newValue = target.value.trim()
                const len = newValue.length
                setSearchkey(newValue)
                if (len >= 5) {
                    if (!checkValidAccount(newValue)) {
                        handleSearch()
                    } else {
                        updateChatList(newValue)
                    }
                } else {
                    broadcastNotification("warning", "Type atleast 5 characters...")
                }
            }
        }
    }

    const checkValidAccount = (account) => {
        return (searchResults.indexOf(account) !== -1);
    }

    const handleSearch = () => {
        searchAccountRequest(searchkey).then((response) => {
            setOpenOptions(true)
            if (response.length > 0 && response.indexOf(searchkey) !== -1) {
                updateChatList(searchkey)
            }
        })
    }

    const handleOptionSelect = (e, newValue) => {
        setSearchkey(newValue)
        updateChatList(newValue)
    }

    const updateChatList = (chatUser) => {
        if (checkValidAccount(chatUser) && chatUser !== username) {
            const index = chatUsersList.findIndex((obj) => obj.username === chatUser);
            if (index === -1) {
                addNewContact(chatUsersList, chatUser)
            }

            clearSearch()
            history.push(`/chats/@${chatUser}`)
        }
    }

    const addNewContact = (contacts, newChatUser) => {
        const newContacts = [...contacts];
        const chatInterface = {
            username: newChatUser,
            messages: [],
            online: 0,
        }
        newContacts.splice(0, 0, chatInterface);
        updateChatsData(newContacts)
    }

    const clearSearch = () => {
        setSearchkey("")
        clearSearchResult()
        setSearchBoxStatus(false)
    }

    const renderOption = (option, { inputValue }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);

        return (
            <div>
                {parts.map((part, index) => (
                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <Fragment>
            {!searchBoxStatus && (
                <IconButton onClick={toggle}>
                    <Icon>search</Icon>
                </IconButton>
            )}
            {searchBoxStatus && (
                <div
                    className={`flex flex-middle matx-search-box ${classes.root}`}
                >
                    <IconButton className="text-middle mx-4">
                        <SearchIcon />
                    </IconButton>
                    <Autocomplete
                        id="searchkey"
                        value={searchkey}
                        freeSolo
                        options={searchResults}
                        style={{ width: "100%" }}
                        getOptionLabel={(option) => option}
                        renderOption={renderOption}
                        loading={loading}
                        open={openOptions}
                        onOpen={() => {
                            setOpenOptions(true);
                        }}
                        onClose={() => {
                            setOpenOptions(false);
                        }}
                        onChange={handleOptionSelect}
                        defaultValue={searchkey}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                value={searchkey}
                                type="text"
                                className={`search-box w-100 ${classes.root}`}
                                placeholder="Search users"
                                onChange={handleChangeInput}
                                onKeyPress={handleKeypress}
                                autoFocus
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <IconButton onClick={toggle} className="text-middle mx-4">
                        <Icon>close</Icon>
                    </IconButton>
                </div>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    searchResults: state.chat.get('searchResults'),
    loading: pending(state, 'SEARCH_ACCOUNT_REQUEST'),
    chatUsersList: state.chat.get('chatUsersList'),
    user: state.auth.get('user'),
    searchBoxStatus: state.interfaces.get('searchBoxStatus')
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        searchAccountRequest,
        broadcastNotification,
        updateChatsData,
        clearSearchResult,
        setSearchBoxStatus
    }, dispatch),
})

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps
    )(SearchBox)
)

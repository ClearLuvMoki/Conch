const IpcChannels = {
    user: {
        add_user: "add:user_account",
        find_all_user: "get:all_user_account",
        delete_user: "delete:user_account"
    },
    debug: {
        send_logger_to_render: "notice:sendLoggerToRender"
    },
    os: {
        get_system_info: "get:system_info",
        wifi: "handle:wifi"
    },
    wiki: {
        get_all_wiki_user: "get:all_wiki_user"
    }
}

export default IpcChannels;

const IpcChannels = {
    user: {
        add_user: "add:user_account",
        find_all_user: "get:all_user_account"
    },
    debug: {
        send_logger_to_render: "notice:sendLoggerToRender"
    },
    os: {
        get_system_info: "get:system_info",
        wifi: "handle:wifi"
    }
}

export default IpcChannels;

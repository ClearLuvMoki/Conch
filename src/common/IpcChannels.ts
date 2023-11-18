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
        wifi: "handle:wifi",
        is_need_ignore_mouse_events: "handle:is_need_ignore_mouse_events"
    },
    wiki: {
        get_all_wiki_user: "get:all_wiki_user",
        add_wiki_user: "get:add_wiki_user",
    }
}

export default IpcChannels;

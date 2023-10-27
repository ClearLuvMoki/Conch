const IpcChannels = {
    debug: {
      send_logger_to_render: "notice:sendLoggerToRender"
    },
    os: {
        get_system_info: "get:system_info",
        wifi: "handle:wifi"
    }
}

export default IpcChannels;

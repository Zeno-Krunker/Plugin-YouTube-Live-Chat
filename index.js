exports.init = ({ store }) => {
    const YouTube = require('youtube-live-chat');
    let channel = store.get("YTChannelId");
    
    if(!channel) { 
        document.getElementById('chatList').insertAdjacentHTML('beforeend', `<div id="chatMsg_0"><div class="chatItem chatTextOutline twitch" style="background-color: rgba(255, 0, 0, 1) !important">&lrm;Zeno&lrm;: <span class="chatMsg">&lrm;Channel not set!&lrm;</span></div><br></div>`)
        return;
    }

    const YT = new YouTube(channel, 'AIzaSyAOTwQOKUlia_lVUaCABoAmb5Eh6xNjPKg');
    YT.listen(5000);

    YT.on("error", e => {
        console.log(e);
    })

    YT.on('message', (data) => {
        let author = data.authorDetails.displayName;
        let message = data.snippet.displayMessage;
        document.getElementById('chatList').insertAdjacentHTML('beforeend', `<div id="chatMsg_0"><div class="chatItem chatTextOutline twitch" style="background-color: rgba(0, 0, 0, 1)">&lrm;${author}&lrm;: <span class="chatMsg">&lrm;${message}&lrm;</span></div><br></div>`)
    });
}

exports.settings = [
    {
        label: "YouTube Live Chat",
        id: "ytChat",
        items: [
            {
                type: "TEXT",
                label: "Channel ID",
                inputLabel: "Channel ID",
                inputId: "yt_channelid",
                buttonLabel: "Set",
                buttonId: "yt_channelid_btn",
                cb: (value, store) => store.set("YTChannelId", value),
                requireRestart: true
            }, {
                type: "BUTTON",
                label: "Remove Channel",
                buttonId: "yt_removechannel_btn",
                buttonLabel: "Remove",
                cb: (store) => store.delete("YTChannelId"),
                requireRestart: true
            }
        ]
    }
]

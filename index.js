exports.init = ({ store }) => {
    const YouTube = require('youtube-live-chat');
    let channel = store.get("YTChannelId");
    
    genChatBox(store);

    if(!channel) return document.getElementById('streamChatContainer').insertAdjacentHTML('beforeend', `<center style="position: relative; top: 50%; transform: translateY(-50%);"><span class="material-icons" style="font-size: 100px; color: rgba(255, 0, 0, 0.3);">report_problem</span></br>Channel not set!</center>`);

    const YT = new YouTube(channel, 'AIzaSyAOTwQOKUlia_lVUaCABoAmb5Eh6xNjPKg');
    YT.listen(5000);
 
    YT.on("error", e => {
        console.log(e);
        document.getElementById('streamChatContainer').insertAdjacentHTML('beforeend', `<center style="position: relative; top: 50%; transform: translateY(-50%);"><span class="material-icons" style="font-size: 100px; color: rgba(255, 0, 0, 0.3);">report_problem</span></br>Couldn't resolve to a chat!</center>`)
        YT.stop();
    });

    YT.on('message', (data) => {
        let author = data.authorDetails.displayName;
        let message = data.snippet.displayMessage;
        document.getElementById('streamChatContainer').insertAdjacentHTML('afterbegin', `<div class="streamChatMsg">${author} : <span style="color: white">${message}</span></div>`)
    });
}

function genChatBox(store) {
    let height = store.get("YTHeight") || "70%";
    let width = store.get("YTWidth") || "20%";
    let top = store.get("YTTop") || "50%";
    let left = store.get("YTLeft") || "0";
    let background = store.get("YTBackground") || "rgba(100, 100, 100, 0.5)";
    let opacity = store.get("YTOpacity") || "0.3";
    document.getElementById("chatUI").insertAdjacentHTML(`beforeend`, `<div id="streamChatContainer" style="position: absolute;height:${height};width:${width};z-index: 9;background-color:${background};top:${top};left:${left};transform: translateY(-50%);opacity: ${opacity}; overflow: hidden;"></div>`);
}

exports.settings = [
    {
        label: "Channel",
        id: "ytChannel",
        items: [
            {
                type: "TEXT",
                label: "Channel ID",
                inputLabel: "Channel ID",
                inputId: "yt_channelid",
                buttonLabel: "Set",
                buttonId: "yt_channelid_btn",
                storeKey: "YTChannelId",
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
    }, {
        label: "Chat",
        id: "ytChat",
        items: [
            {
                type: "TEXT",
                label: "Height",
                inputLabel: "CSS Based Height",
                inputId: "yt_chatHeight",
                buttonLabel: "Set",
                buttonId: "yt_chatHeightBtn",
                storeKey: "YTHeight",
                cb: (value, store) => {
                    store.set("YTHeight", value);
                    document.getElementById("streamChatContainer").style.height = value || "70%";
                }
            }, {
                type: "TEXT",
                label: "Width",
                inputLabel: "CSS Based Width",
                inputId: "yt_chatWidth",
                buttonLabel: "Set",
                buttonId: "yt_chatWidthBtn",
                storeKey: "YTWidth",
                cb: (value, store) => {
                    store.set("YTWidth", value);
                    document.getElementById("streamChatContainer").style.width = value || "20%";
                }
            }, {
                type: "TEXT",
                label: "Top",
                inputLabel: "CSS Based Top",
                inputId: "yt_chatTop",
                buttonLabel: "Set",
                buttonId: "yt_chatTopBtn",
                storeKey: "YTTop",
                cb: (value, store) => {
                    store.set("YTTop", value);
                    document.getElementById("streamChatContainer").style.top = value || "50%";
                }
            }, {
                type: "TEXT",
                label: "Left",
                inputLabel: "CSS Based Left",
                inputId: "yt_chatLeft",
                buttonLabel: "Set",
                buttonId: "yt_chatLeftBtn",
                storeKey: "YTLeft",
                cb: (value, store) => {
                    store.set("YTLeft", value);
                    document.getElementById("streamChatContainer").style.left = value || "0";
                }
            }, {
                type: "TEXT",
                label: "Background",
                inputLabel: "CSS Based Background",
                inputId: "yt_chatBackground",
                buttonLabel: "Set",
                buttonId: "yt_chatBackgroundBtn",
                storeKey: "YTBackground",
                cb: (value, store) => {
                    store.set("YTBackground", value);
                    document.getElementById("streamChatContainer").style.background = value || "rgba(100, 100, 100, 0.5)";
                }
            }, {
                type: "RANGE",
                label: "Opacity",
                id: "yt_Opacity",
                min: 0,
                max: 1,
                step: 0.1,
                storeKey: "YTOpacity",
                value: 0.3,
                cb: (value, store) => {
                    store.set("YTOpacity", value);
                    document.getElementById("streamChatContainer").style.opacity = value || "0.3";
                }
            }
        ]
    }
]
const mediaConstraints = {
    audio: true,
    video: false
};

const argObj = { localPeerId: PARENT, mediaConstraints };

function gUMAsync(argObj) {
    return new Promise((resolve, reject) => {
        const mediaConstraints = argObj.mediaConstraints;
        navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(localStream => {
                argObj.localStream = localStream;
                resolve(argObj);
            })
            .catch(error => {
                reject(error);
            })
    });
}

gUMAsync(argObj)
    .then(newPeerAsync)
    .then(joinRoomAsync)
    .then(() => {
        html.classList.remove('waitingLocalStream');
        html.classList.add('shooting');
    })
    .catch(error => {
        console.error(error);
        alert('Error has occurred. (' + error + ')');
        location.href = './';
    });

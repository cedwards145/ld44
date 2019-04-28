const resources = {};

function loadResource(paths, callback) {
    var loaded = 0;

    for (var i = 0; i < paths.length; i++) {
        var image = new Image();
        resources[paths[i]] = image;

        image.onload = function() {
            loaded++;
            if (loaded == paths.length) {
                callback();
            }
        };
        image.src = paths[i];
    }
}
function getResource(name) {
    return resources[name];
}

export { loadResource, getResource };
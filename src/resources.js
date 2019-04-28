const resources = {};

function loadResource(path, callback) {
    var image = new Image();
    image.onload = function() {
        resources[path] = this;
        console.log(resources);
        callback();
    };
    image.src = path;
}
function getResource(name) {
    return resources[name];
}

export { loadResource, getResource };
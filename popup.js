function set_text(id, value) {
    document.getElementById(id).innerHTML = value
}

function synchronize() {
    set_text("results", "Synchronized")
}

function dumpBookmarks() {
    chrome.bookmarks.getTree(
        function(nodes) {
            set_text("results", JSON.stringify(nodes, null, 2))
        }
    )
}

function download() {
    set_text("results", "Downloaded!");
}

function upload() {
    set_text("results", "Uploaded!");
}

function save_key() {
    chrome.storage.local.set({'key': document.getElementById("key").value}, function(){
        set_text("results", "Key Saved");
    })
}

chrome.storage.local.get('key', function(data) {
    if (data.key) {
        document.getElementById("key").value = data.key;
    }
})

document.getElementById("key").addEventListener("change", save_key);
document.getElementById("sync").addEventListener("click", dumpBookmarks);
document.getElementById("download").addEventListener("click", download);
document.getElementById("upload").addEventListener("click", upload);


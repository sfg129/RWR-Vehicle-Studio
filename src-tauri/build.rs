fn main() {
    // Icon-only edits must also rebuild Windows executable resources.
    for icon in [
        "icons/icon.ico", "icons/icon.png", "icons/32x32.png",
        "icons/128x128.png", "icons/128x128@2x.png",
    ] {
        println!("cargo:rerun-if-changed={icon}");
    }
    tauri_build::build()
}

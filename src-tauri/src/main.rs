// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::generate_handler;

pub mod models;
mod usecases;

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![
            usecases::fs::exists::exists,
            usecases::fs::read_file::read_file,
            usecases::fs::read_file::read_as_base64,
            usecases::fs::write_file::write_file,
            usecases::fs::write_file::write_from_base64,
            usecases::fs::get_all_files_in_directory::get_all_files_in_directory,
            usecases::utils::base64::base64_encode,
            usecases::utils::base64::base64_decode,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

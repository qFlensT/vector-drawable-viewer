// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::generate_handler;

pub mod models;
mod usecases;
pub mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![
            usecases::fs::exists::exists,
            usecases::fs::read_to_base64::read_to_base64,
            usecases::fs::write_from_base64::write_from_base64,
            usecases::fs::get_all_files_in_directory::get_all_files_in_directory,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

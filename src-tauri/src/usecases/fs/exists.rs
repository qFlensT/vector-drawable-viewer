use std::path::Path;

#[tauri::command]
pub fn exists(path: String) -> bool {
    Path::new(&path).exists()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_exists() {
        // Путь, который существует
        let existing_path = "."; // Текущая директория, которая должна существовать
        assert!(exists(existing_path.to_string()));

        // Путь, который не существует
        let non_existing_path = "some_non_existing_file_or_directory";
        assert!(!exists(non_existing_path.to_string()));
    }
}

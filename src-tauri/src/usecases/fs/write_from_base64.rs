use std::path::Path;

use crate::utils::{base64::decode, write_file::write_file};

#[tauri::command]
pub fn write_from_base64(path: String, base64_string: String) -> Result<(), String> {
    write_file(Path::new(&path), decode(base64_string)?)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::utils::base64::encode;
    use std::error::Error;
    use std::fs::File;
    use std::io::Read;
    use tempfile::tempdir; // Импортируйте функцию encode, если она доступна

    #[test]
    fn test_write_from_base64() -> Result<(), Box<dyn Error>> {
        // Создаем данные и кодируем их в base64
        let data = "Hello, world!";
        let base64_data = encode(data.as_bytes());

        // Создаем временный файл
        let temp_dir = tempdir()?;
        let file_path = temp_dir.path().join("test.txt");

        // Вызываем функцию write_from_base64
        write_from_base64(file_path.to_string_lossy().to_string(), base64_data)?;

        // Читаем и проверяем содержимое файла
        let mut file = File::open(&file_path)?;
        let mut contents = String::new();
        file.read_to_string(&mut contents)?;
        assert_eq!(contents, data);

        Ok(())
    }
}

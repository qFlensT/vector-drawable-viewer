use std::path::Path;

use crate::utils::{base64::encode, read_file::read_file};

#[tauri::command]
pub fn read_to_base64(path: String) -> Result<String, String> {
    let path = Path::new(&path);

    Ok(encode(read_file(path)?))
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::error::Error;
    use std::fs::File;
    use std::io::Write;
    use tempfile::tempdir;

    #[test]
    fn test_read_to_base64() -> Result<(), Box<dyn Error>> {
        // Создаем временный файл
        let temp_dir = tempdir()?;
        let file_path = temp_dir.path().join("test.txt");
        let mut file = File::create(&file_path)?;

        // Записываем известные данные в файл
        let data = "Hello, world!";
        file.write_all(data.as_bytes())?;

        // Проверяем результат функции
        let encoded = read_to_base64(file_path.to_string_lossy().to_string())?;
        let expected_base64 = encode(data);
        assert_eq!(encoded, expected_base64);

        Ok(())
    }
}

use std::{fs::File, io::Write, path::Path};

use crate::usecases::utils::base64::base64_decode;

#[tauri::command]
pub fn write_file(path: &Path, bytes: Vec<u8>) -> Result<(), String> {
    let mut file = File::create(path).map_err(|err| err.to_string())?;

    file.write_all(bytes.as_ref())
        .map_err(|err| err.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn write_from_base64(path: &Path, base64: String) -> Result<(), String> {
    let bytes = base64_decode(base64).map_err(|err| err.to_string())?;
    write_file(path, bytes)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::{error::Error, fs::read_to_string};
    use tempfile::tempdir;

    #[test]
    fn test_write_file() -> Result<(), Box<dyn Error>> {
        // Создаем временный каталог
        let temp_dir = tempdir()?;
        let file_path = temp_dir.path().join("test.txt");

        // Данные для записи
        let data = b"Hello, world!".to_vec();

        // Вызываем функцию write_file
        write_file(&file_path, data.clone())?;

        // Читаем содержимое файла и сравниваем с исходными данными
        let read_data = read_to_string(&file_path)?;
        assert_eq!(read_data.as_bytes(), data);

        Ok(())
    }
}

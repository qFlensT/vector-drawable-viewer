use std::{fs::File, io::Write, path::Path};

pub fn write_file<T: AsRef<[u8]>>(path: &Path, bytes: T) -> Result<(), String> {
    let mut file = File::create(path).map_err(|err| err.to_string())?;

    file.write_all(bytes.as_ref())
        .map_err(|err| err.to_string())?;

    Ok(())
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
        let data = b"Hello, world!";

        // Вызываем функцию write_file
        write_file(&file_path, data)?;

        // Читаем содержимое файла и сравниваем с исходными данными
        let read_data = read_to_string(&file_path)?;
        assert_eq!(read_data.as_bytes(), data);

        Ok(())
    }
}

use std::{fs::File, io::Read, path::Path};

pub fn read_file(path: &Path) -> Result<Vec<u8>, String> {
    let mut buffer: Vec<u8> = Vec::with_capacity(0);
    let mut file = File::open(path).map_err(|err| err.to_string())?;

    file.read_to_end(&mut buffer)
        .map_err(|err| err.to_string())?;

    Ok(buffer)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::error::Error;
    use std::fs::File;
    use std::io::Write;
    use tempfile::tempdir;

    #[test]
    fn test_read_file() -> Result<(), Box<dyn Error>> {
        // Создаем временный каталог и файл
        let temp_dir = tempdir()?;
        let file_path = temp_dir.path().join("test.txt");
        let mut file = File::create(&file_path)?;

        // Записываем данные в файл
        let data = b"Hello, world!";
        file.write_all(data)?;

        // Читаем файл
        let read_data = read_file(&file_path)?;

        // Сравниваем прочитанные данные с исходными
        assert_eq!(read_data, data);
        Ok(())
    }
}

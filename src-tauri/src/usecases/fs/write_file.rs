use std::path::Path;

use tokio::{fs::File, io::AsyncWriteExt};

use crate::usecases::utils::base64::base64_decode;

#[tauri::command]
pub async fn write_file(path: &Path, bytes: Vec<u8>) -> Result<(), String> {
    let mut file = File::create(path).await.map_err(|err| err.to_string())?;

    file.write_all(bytes.as_ref())
        .await
        .map_err(|err| err.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn write_from_base64(path: &Path, base64: String) -> Result<(), String> {
    let bytes = base64_decode(base64).await.map_err(|err| err.to_string())?;
    write_file(path, bytes).await
}

#[cfg(test)]
mod tests {
    use crate::usecases::utils::base64::base64_encode;

    use super::*;
    use tempfile::tempdir;
    use tokio::fs::read;

    #[tokio::test]
    async fn test_write_file() -> Result<(), Box<dyn std::error::Error>> {
        let temp_dir = tempdir()?;
        let file_path = temp_dir.path().join("test.txt");

        let test_data = b"Hello, world!";
        write_file(&file_path, test_data.to_vec()).await?;

        let read_data = read(&file_path).await?;
        assert_eq!(read_data, test_data);

        Ok(())
    }

    #[tokio::test]
    async fn test_write_from_base64() -> Result<(), Box<dyn std::error::Error>> {
        let temp_dir = tempdir()?;
        let file_path = temp_dir.path().join("test.txt");

        let test_data = b"Hello, world!";
        let base64_data = base64_encode(test_data.to_vec()).await;
        write_from_base64(&file_path, base64_data).await?;

        let read_data = read(&file_path).await?;
        assert_eq!(read_data, test_data);

        Ok(())
    }
}

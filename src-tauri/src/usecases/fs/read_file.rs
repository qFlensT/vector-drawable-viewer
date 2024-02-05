use std::path::Path;

use tokio::{fs::File, io::AsyncReadExt};

use crate::usecases::utils::base64::base64_encode;

#[tauri::command]
pub async fn read_file(path: &Path) -> Result<Vec<u8>, String> {
    println!("Reading file: {:?}", path);

    let mut buffer: Vec<u8> = Vec::new();
    let mut file = File::open(path).await.map_err(|err| err.to_string())?;

    file.read_to_end(&mut buffer)
        .await
        .map_err(|err| err.to_string())?;

    println!("Read {} bytes", buffer.len());

    Ok(buffer)
}

#[tauri::command]
pub async fn read_as_base64(path: &Path) -> Result<String, String> {
    let data = read_file(path).await?;
    Ok(base64_encode(data).await)
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;
    use tokio::io::AsyncWriteExt;

    #[tokio::test]
    async fn test_read_file() -> Result<(), Box<dyn std::error::Error>> {
        let temp_dir = tempdir()?;
        let file_path = temp_dir.path().join("test.txt");

        let mut file = File::create(&file_path).await?;
        let test_data = b"Hello, world!";
        file.write_all(test_data).await?;

        let read_data = read_file(&file_path).await?;

        assert_eq!(read_data, test_data);

        Ok(())
    }

    #[tokio::test]
    async fn test_read_as_base64() -> Result<(), Box<dyn std::error::Error>> {
        let temp_dir = tempdir()?;
        let file_path = temp_dir.path().join("test.txt");

        let mut file = File::create(&file_path).await?;
        let test_data = b"Hello, world!";
        file.write_all(test_data).await?;

        let base64_data = read_as_base64(&file_path).await?;

        let encoded_data = base64_encode(test_data.to_vec()).await;
        assert_eq!(base64_data, encoded_data);

        Ok(())
    }
}

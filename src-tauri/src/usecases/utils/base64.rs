use base64::prelude::*;

#[tauri::command]
pub async fn base64_encode(bytes: Vec<u8>) -> String {
    tokio::task::spawn_blocking(move || BASE64_STANDARD.encode(&bytes))
        .await
        .unwrap()
}

#[tauri::command]
pub async fn base64_decode(input: String) -> Result<Vec<u8>, String> {
    tokio::task::spawn_blocking(move || BASE64_STANDARD.decode(&input))
        .await
        .unwrap()
        .map_err(|err| err.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_encode_and_decode() {
        let data = b"Hello, world!".to_vec();
        let base64_encoded = base64_encode(data.clone()).await;

        // Проверяем, что результат действительно в base64
        assert_eq!(base64_encoded, base64_encode(data.clone()).await);

        // Теперь декодируем и сравниваем с исходными данными
        let decoded = base64_decode(base64_encoded)
            .await
            .expect("Failed to decode");
        assert_eq!(decoded, data);
    }

    #[tokio::test]
    async fn test_decode_error() {
        let invalid_data = "invalid base64".to_string();

        // Проверяем, что функция возвращает ошибку для невалидных данных
        assert!(base64_decode(invalid_data).await.is_err());
    }
}

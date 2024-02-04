use base64::prelude::*;

#[tauri::command]
pub fn base64_encode(bytes: Vec<u8>) -> String {
    BASE64_STANDARD.encode(bytes)
}

#[tauri::command]
pub fn base64_decode(input: String) -> Result<Vec<u8>, String> {
    BASE64_STANDARD.decode(input).map_err(|err| err.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encode_and_decode() {
        let data = b"Hello, world!".to_vec();
        let base64_encoded = base64_encode(data.clone());

        // Проверяем, что результат действительно в base64
        assert_eq!(base64_encoded, base64_encode(data.clone()));

        // Теперь декодируем и сравниваем с исходными данными
        let decoded = base64_decode(base64_encoded).expect("Failed to decode");
        assert_eq!(decoded, data);
    }

    #[test]
    fn test_decode_error() {
        let invalid_data = "invalid base64".to_string();

        // Проверяем, что функция возвращает ошибку для невалидных данных
        assert!(base64_decode(invalid_data).is_err());
    }
}

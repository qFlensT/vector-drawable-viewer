use base64::prelude::*;

pub fn encode<T: AsRef<[u8]>>(bytes: T) -> String {
    BASE64_STANDARD.encode(bytes)
}

pub fn decode(base64_string: String) -> Result<Vec<u8>, String> {
    BASE64_STANDARD
        .decode(base64_string)
        .map_err(|err| err.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encode_and_decode() {
        let data = b"Hello, world!";
        let base64_encoded = encode(data.as_ref());

        // Проверяем, что результат действительно в base64
        assert_eq!(base64_encoded, encode(data));

        // Теперь декодируем и сравниваем с исходными данными
        let decoded = decode(base64_encoded).expect("Failed to decode");
        assert_eq!(decoded, data);
    }

    #[test]
    fn test_decode_error() {
        let invalid_data = "invalid base64".to_string();

        // Проверяем, что функция возвращает ошибку для невалидных данных
        assert!(decode(invalid_data).is_err());
    }
}

use async_recursion::async_recursion;
use std::{ffi::OsStr, path::Path};
use tokio::fs::read_dir;

#[tauri::command]
pub async fn get_all_files_in_directory(
    path: String,
    extensions_filter: Option<Vec<String>>,
) -> Result<Vec<String>, String> {
    let path = Path::new(&path);
    let extensions_filter = extensions_filter.map(|filters| {
        filters
            .into_iter()
            .map(|f| f.to_lowercase())
            .collect::<Vec<_>>()
    });
    collect_files(&path, extensions_filter.as_ref()).await
}

#[async_recursion]
async fn collect_files<'a: 'async_recursion>(
    path: &Path,
    extensions_filter: Option<&'a Vec<String>>,
) -> Result<Vec<String>, String> {
    let mut files = Vec::new();

    let mut dirs = read_dir(path).await.map_err(|err| err.to_string())?;

    while let Some(entry) = dirs.next_entry().await.map_err(|err| err.to_string())? {
        let path = entry.path();

        if path.is_dir() {
            files.extend(collect_files(&path, extensions_filter).await?);
        } else if let Some(filters) = extensions_filter {
            if let Some(ext) = path.extension().and_then(OsStr::to_str) {
                if filters
                    .iter()
                    .any(|filter| ext.eq_ignore_ascii_case(filter))
                {
                    files.push(path.to_string_lossy().into_owned());
                }
            }
        } else {
            files.push(path.to_string_lossy().into_owned());
        }
    }

    Ok(files)
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;
    use tokio::fs::File;
    use tokio::io::AsyncWriteExt;

    #[tokio::test]
    async fn test_get_all_files_in_directory_no_filter() -> Result<(), Box<dyn std::error::Error>> {
        let temp_dir = tempdir()?;
        let file_path_1 = temp_dir.path().join("file1.txt");
        let file_path_2 = temp_dir.path().join("file2.rs");

        File::create(&file_path_1)
            .await?
            .write_all(b"Hello, world!")
            .await?;
        File::create(&file_path_2)
            .await?
            .write_all(b"fn main() {}")
            .await?;

        let files =
            get_all_files_in_directory(temp_dir.path().to_string_lossy().into_owned(), None)
                .await?;

        assert_eq!(files.len(), 2);
        assert!(files.contains(&file_path_1.to_string_lossy().into_owned()));
        assert!(files.contains(&file_path_2.to_string_lossy().into_owned()));

        Ok(())
    }

    #[tokio::test]
    async fn test_get_all_files_in_directory_with_filter() -> Result<(), Box<dyn std::error::Error>>
    {
        let temp_dir = tempdir()?;
        let file_path_1 = temp_dir.path().join("file1.txt");
        let file_path_2 = temp_dir.path().join("file2.rs");

        File::create(&file_path_1)
            .await?
            .write_all(b"Hello, world!")
            .await?;
        File::create(&file_path_2)
            .await?
            .write_all(b"fn main() {}")
            .await?;

        let files = get_all_files_in_directory(
            temp_dir.path().to_string_lossy().into_owned(),
            Some(vec!["txt".to_string()]),
        )
        .await?;

        assert_eq!(files.len(), 1);
        assert!(files.contains(&file_path_1.to_string_lossy().into_owned()));

        Ok(())
    }
}

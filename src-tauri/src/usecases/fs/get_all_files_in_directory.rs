use std::{ffi::OsStr, fs::read_dir, path::Path};

#[tauri::command]
pub fn get_all_files_in_directory(
    path: String,
    extensions_filter: Option<Vec<String>>,
) -> Result<Vec<String>, String> {
    let path = Path::new(&path);
    collect_files(path, &extensions_filter)
}

fn collect_files(
    path: &Path,
    extensions_filter: &Option<Vec<String>>,
) -> Result<Vec<String>, String> {
    let mut files = Vec::new();

    for entry in read_dir(path).map_err(|err| err.to_string())? {
        let path = entry.map_err(|err| err.to_string())?.path();

        if path.is_dir() {
            files.extend(collect_files(&path, extensions_filter)?);
        } else if let Some(filters) = extensions_filter {
            if let Some(ext) = path.extension().and_then(OsStr::to_str) {
                if filters
                    .iter()
                    .any(|filter| ext.to_lowercase() == filter.to_lowercase())
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
    use crate::usecases::fs::get_all_files_in_directory::get_all_files_in_directory;

    use std::error::Error;
    use std::fs::File;
    use std::io::Write;
    use tempfile::tempdir;

    #[test]
    fn test_get_all_files_in_directory_no_filter() -> Result<(), Box<dyn Error>> {
        let temp_dir = tempdir()?;
        let file_path_1 = temp_dir.path().join("file1.txt");
        let file_path_2 = temp_dir.path().join("file2.rs");

        File::create(&file_path_1)?.write_all(b"Hello, world!")?;
        File::create(&file_path_2)?.write_all(b"fn main() {}")?;

        let files =
            get_all_files_in_directory(temp_dir.path().to_string_lossy().into_owned(), None)?;

        assert_eq!(files.len(), 2);
        assert!(files.contains(&file_path_1.to_string_lossy().into_owned()));
        assert!(files.contains(&file_path_2.to_string_lossy().into_owned()));

        Ok(())
    }
}

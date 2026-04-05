package vn.tuan_dao.springrestfulAPI.feature.file;

import org.springframework.web.multipart.MultipartFile;

import vn.tuan_dao.springrestfulAPI.feature.file.dto.FileUploadResponse;

public interface FileService {

    FileUploadResponse upload(MultipartFile file, String folder);
}


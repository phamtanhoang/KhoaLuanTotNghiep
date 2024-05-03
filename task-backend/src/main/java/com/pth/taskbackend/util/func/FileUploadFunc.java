package com.pth.taskbackend.util.func;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
public class FileUploadFunc {

    private final String STORAGE_BUCKET_NAME = "jobapp-c9389.appspot.com";
    private final String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media";

    public String uploadCV(MultipartFile multipartFile) {
        try {
            String fileName = UUID.randomUUID().toString();

            File file = convertToFile(multipartFile, fileName);
            String uploadedFileName = uploadFile(file, fileName);
            System.out.println(uploadedFileName);
            file.delete();

            return uploadedFileName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public String uploadImage(MultipartFile multipartFile) {
        try {
            String fileName = UUID.randomUUID().toString();

            File file = convertToFile(multipartFile, fileName);
            String uploadedFileName = uploadFile(file, fileName);
            file.delete();
            return uploadedFileName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String getFullImagePath(String fileName) {
        return String.format(DOWNLOAD_URL, STORAGE_BUCKET_NAME, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private String uploadFile(File file, String fileName) throws IOException {
        String fileExtension = getFileExtension(file.getName());
        String contentType;
        if (fileExtension.equalsIgnoreCase(".pdf")) {

            contentType = "application/pdf";
        } else if (Arrays.asList(".jpg", ".jpeg").contains(fileExtension.toLowerCase())) {
            contentType = "image/jpeg";
        } else if (fileExtension.equalsIgnoreCase(".png")) {
            contentType = "image/png";
        } else if (fileExtension.equalsIgnoreCase(".gif")) {
            contentType = "image/gif";
        } else {
            contentType = "application/octet-stream";
        }
        Resource resource = new ClassPathResource("/serviceAccountKey.json");
        FileInputStream serviceAccount = new FileInputStream(resource.getFile());
        Credentials credentials = GoogleCredentials.fromStream(serviceAccount);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();

        BlobId blobId = BlobId.of(STORAGE_BUCKET_NAME, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        System.out.println(fileName+"is that true?");
        return fileName;
    }


    public byte[] download(String fileName) {
        try {
            Resource resource = new ClassPathResource("/serviceAccountKey.json");

            FileInputStream serviceAccount = new FileInputStream(resource.getFile());
            Credentials credentials = GoogleCredentials.fromStream(serviceAccount);
            Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
            Blob blob = storage.get(BlobId.of("jobapp-c9389.appspot.com", fileName));

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            blob.downloadTo(outputStream);

            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        String originalFileName = multipartFile.getOriginalFilename();
        String fileExtension = getFileExtension(originalFileName);
        File tempFile = File.createTempFile(fileName, fileExtension);
        multipartFile.transferTo(tempFile);

        return tempFile;
    }


    private String getFileExtension(String fileName) {
        System.out.println(fileName + "hello");
        int dotIndex = fileName.lastIndexOf('.');
        System.out.println(fileName.substring(dotIndex));
        return dotIndex == -1 ? "" : fileName.substring(dotIndex);
    }
}

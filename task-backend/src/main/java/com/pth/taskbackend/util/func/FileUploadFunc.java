package com.pth.taskbackend.util.func;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ClassPathResource;
import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Map;
import java.util.UUID;

@Component
public class FileUploadFunc {

    private final String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/%s?alt=media";



    public String upload(MultipartFile multipartFile) {

        try {
            String fileName = multipartFile.getOriginalFilename();
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));

            File file = this.convertToFile(multipartFile, fileName);
            String TEMP_URL = this.uploadFile(file, fileName);
            file.delete();
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
            return "ll";
        }

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


    private String uploadFile(File file, String fileName) throws IOException {
        BlobId blobId = BlobId.of("jobapp-c9389.appspot.com", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        Resource resource = new ClassPathResource("/serviceAccountKey.json");
        FileInputStream serviceAccount = new FileInputStream(resource.getFile());
        Credentials credentials = GoogleCredentials.fromStream(serviceAccount);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    private String getPublicIdFromUrl(String imageUrl) {
        int lastIndex = imageUrl.lastIndexOf("/");
        if (lastIndex != -1) {
            return imageUrl.substring(lastIndex + 1, imageUrl.lastIndexOf("."));
        }
        return null;
    }
}
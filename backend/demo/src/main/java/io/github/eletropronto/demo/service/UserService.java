package io.github.eletropronto.demo.service;
import io.github.eletropronto.demo.model.User;
import io.github.eletropronto.demo.repository.UserRepository;
import io.github.eletropronto.demo.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    @Value("${file.upload-pfp-dir}")
    private String uploadDir;

    private final UserRepository repository;
    private final UserValidator validator;
    private final PasswordEncoder encoder;

    public Optional<User> findById(Long id){
        return repository.findById(id);
    }

    public Optional<User> getUserByUsername(String username){
        return repository.findByUsername(username);
    }

    public User save(User user){
        validator.validate(user);
        user.setPassword(encoder.encode(user.getPassword()));
        return repository.save(user);
    }
    public User updateUser(User user){
        if(user.getId() == null){
            throw new IllegalArgumentException("No User found.");
        }
        validator.validate(user);
        return repository.save(user);
    }
    public void deleteUser(User user){
        repository.delete(user);
    }

    public String uploadProfileImage(MultipartFile file, Long userId) throws IOException {
        String pfpDir = String.valueOf(userId);
        Path uploadPath = Paths.get(uploadDir, pfpDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName = originalFileName != null && originalFileName.contains(".") ?
                originalFileName.substring(originalFileName.lastIndexOf(".")) : "";
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
        Path filePath = uploadPath.resolve(uniqueFileName);

        try {
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return pfpDir + "/pfps" + uniqueFileName;
        } catch (IOException e) {
            throw new IOException("Could not upload Profile Image " + uniqueFileName + " Please try again later. ", e);
        }
    }
}

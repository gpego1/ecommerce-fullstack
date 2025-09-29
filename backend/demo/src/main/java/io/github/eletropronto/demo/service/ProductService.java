package io.github.eletropronto.demo.service;
import io.github.eletropronto.demo.model.Product;
import io.github.eletropronto.demo.repository.ProductRepository;
import io.github.eletropronto.demo.validator.ProductValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    @Value("${file.upload-products-dir}")
    private String uploadDir;

    private final ProductRepository repository;
    private final ProductValidator validator;

    public Optional<Product> findById(Long id){
        return repository.findById(id);
    }

    public Product save(Product product){
        validator.validate(product);
        return repository.save(product);
    }

    public Product update(Product product){
        if(product.getId() == null) {
            throw new IllegalArgumentException("The product doesnt exists");
        }
        validator.validate(product);
        return repository.save(product);
    }
    public void delete(Product product){
        repository.delete(product);
    }

    public String uploadProductImg(MultipartFile file, Long idProduct) throws IOException {

        String productDir = String.valueOf(idProduct);
        Path uploadPath = Paths.get(uploadDir, productDir);

        if(!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName != null && originalFileName.contains(".") ?
                originalFileName.substring(originalFileName.lastIndexOf(".")) : "";
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;
        Path filePath = uploadPath.resolve(uniqueFileName);

        try {
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return productDir + "/products/" + uniqueFileName;
        } catch(IOException e) {
            throw new IOException("Could not upload Product image " + uniqueFileName + " Please try again ", e);
        }
    }

}

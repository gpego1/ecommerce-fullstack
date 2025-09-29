package io.github.eletropronto.demo.controller;
import io.github.eletropronto.demo.controller.dto.ProductDTO;
import io.github.eletropronto.demo.controller.mapper.ProductMapper;
import io.github.eletropronto.demo.model.Product;
import io.github.eletropronto.demo.repository.ProductRepository;
import io.github.eletropronto.demo.service.ProductService;
import org.springframework.core.io.Resource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    @Value("${file.upload-products-dir}")
    private String uploadDir;

    private final ProductService service;
    private final ProductRepository repository;
    private final ProductMapper mapper;

    //Métodos para GET'S
    @GetMapping
    public List<Product> listAll(){
        return repository.findAll();
    }

    @GetMapping("image/{productId}/{fileName}")
    public ResponseEntity<Resource> getProductImage(@PathVariable Long productId, @PathVariable String fileName) throws IOException {

        String subPath = productId + "/" + fileName;
        Path filePath = Paths.get(uploadDir).toAbsolutePath().resolve(subPath).normalize();

        //System.out.println("Caminho do Arquivo sendo procurado: " + filePath.toString());

        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
        } catch(IOException e) {
            return ResponseEntity.notFound().build();
        }
        if(!resource.exists() || !resource.isReadable()){
            return ResponseEntity.notFound().build();
        }
        String contentType = "application/octet-stream";
        if(fileName.toLowerCase().endsWith(".png")) {
            contentType = MediaType.IMAGE_PNG_VALUE;
        } else if (fileName.toLowerCase().endsWith(".jpg")){
            contentType = MediaType.IMAGE_JPEG_VALUE;
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inliene; filename")
                .body(resource);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> findDetails(@PathVariable Long id){
        return service.findById(id)
                .map(product -> {
                    ProductDTO dto = mapper.toDTO(product);;
                    return ResponseEntity.ok(dto);
                }).orElseGet( () -> ResponseEntity.notFound().build());

    }
    //
    //  Métodos de POST'S
    //
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid ProductDTO dto){
        Product objProduct = mapper.toEntity(dto);
        service.save(objProduct);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(objProduct.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PostMapping("/upload/{idProduct}")
    public ResponseEntity<String> productFileUpload(@PathVariable Long idProduct, @RequestParam("file")MultipartFile file){

        if(file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please send a product picture");
        }
        if(idProduct == null || idProduct <= 0){
            return ResponseEntity.badRequest().body("The product doesn't exists");
        }
        try {
            String subPath = service.uploadProductImg(file, idProduct);
            return ResponseEntity.ok().body("File upload successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Fail to upload product file");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto){
        Optional<Product> foundedProduct = service.findById(id);

        if(foundedProduct.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Product product = foundedProduct.get();
        product.setNameProduct(dto.nameProduct());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        service.update(product);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProdcut(@PathVariable Long id){
        Optional<Product> foundedProduct = service.findById(id);

        if(foundedProduct.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        service.delete(foundedProduct.get());
        return ResponseEntity.noContent().build();
    }


}
